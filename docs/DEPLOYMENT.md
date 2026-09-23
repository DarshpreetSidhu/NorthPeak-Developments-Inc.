# NorthPeak Developments — Hostinger VPS deployment

Zero-downtime CI/CD for the Next.js `standalone` build: GitHub Actions builds
and syncs the app to a Hostinger VPS on every push to `main`; PM2 keeps it
running; Nginx terminates TLS and reverse-proxies to it.

**Before you start:** this repo isn't a git repository yet, and the domain
used below (`your-domain.com`) is a placeholder — substitute your actual,
verified domain everywhere it appears. Earlier in this project, a specific
domain was assumed to belong to this business and turned out to belong to an
unrelated company, so nothing here hardcodes a real domain name; confirm you
control DNS for whatever domain you use before running the Nginx/certbot
steps against it.

## 0. Prerequisites

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a GitHub repository and push this repo to it (`git remote add origin <your-repo-url>`,
`git push -u origin main`). The workflow below only runs once this exists —
`.github/workflows/deploy.yml` triggers on push to `main` on GitHub, not on
any local commit.

## 1. Initial server provisioning (Ubuntu)

Stock Ubuntu's `apt` repos usually ship an outdated Node.js version — this
project requires Node 20+, so install it from NodeSource rather than
`apt install nodejs`:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2
node -v   # confirm v20.x before continuing

mkdir -p /var/www/northpeak
chown -R $USER:$USER /var/www/northpeak
```

**Let PM2 survive a server reboot** (a one-time step — `pm2 save` in the
deploy workflow only persists the process *list*, not the boot hook):

```bash
pm2 startup
# run the sudo command it prints, then later, once the app is running:
pm2 save
```

**Firewall:** only expose 80/443 publicly; keep port 3000 internal-only since
Nginx is the only thing that should reach it.

```bash
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw enable
```

## 2. Server-side environment file (secrets never touch git or CI)

`NEXT_PUBLIC_*` variables get compiled into the client bundle at *build*
time (handled by GitHub Actions, see step 4) — but `RESEND_API_KEY`,
`CONTACT_NOTIFICATION_EMAIL`, and `CONTACT_WEBHOOK_URL` are read at
*runtime*, server-side only, and should never be committed. Create this file
once, directly on the VPS:

```bash
nano /var/www/northpeak/.env.production.local
```

```bash
# Only fill in what you've actually confirmed — see docs/OWNER_INPUTS.md
# before setting CONTACT_NOTIFICATION_EMAIL to any @northpeakdevelopments.ca
# address specifically.
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=
CONTACT_WEBHOOK_URL=
```

This file lives outside the git-tracked tree and outside the SCP sync path,
so every deploy leaves it untouched — the workflow re-copies it into the
freshly-synced `.next/standalone/` on each run (Next's standalone
`server.js` loads `.env.production.local` from its own directory
automatically, the same loader `next start` uses). Leaving all three blank
is safe: the site falls back to its existing honest "not_configured"
messaging instead of a false success message — see the README's "Contact
form behavior" section.

## 3. GitHub configuration

**Settings → Secrets and variables → Actions → Secrets** (sensitive):

- `HOSTINGER_IP` — the VPS's public IPv4 address
- `HOSTINGER_USER` — SSH username
- `HOSTINGER_SSH_KEY` — **a dedicated deploy key's private key**, not your
  personal one. Generate one specifically for this: `ssh-keygen -t ed25519
  -f deploy_key -N ""`, add `deploy_key.pub` to the VPS's
  `~/.ssh/authorized_keys`, and paste the contents of `deploy_key` (the
  private half) as this secret. That way revoking CI access later doesn't
  mean rotating your own login key.

**Settings → Secrets and variables → Actions → Variables** (not sensitive —
just configuration):

- `NEXT_PUBLIC_SITE_URL` — your real, verified production domain, e.g.
  `https://www.your-domain.com`

## 4. Nginx reverse proxy

```bash
sudo nano /etc/nginx/sites-available/northpeak
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/northpeak /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. SSL certificate

Only run this once DNS for your domain actually points at this server —
certbot's HTTP challenge will fail otherwise:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 6. First deploy

Once steps 0–5 are done, push to `main`. GitHub Actions will build with the
real `NEXT_PUBLIC_SITE_URL`/`NEXT_PUBLIC_SITE_ENV=production`, sync
`.next/standalone/`, `.next/static/`, `public/`, and `ecosystem.config.js` to
`/var/www/northpeak`, re-apply the server's `.env.production.local`, and
reload PM2 with zero downtime.

**Verify after the first deploy:**

```bash
pm2 status               # northpeak-web should be "online"
curl -I https://your-domain.com/robots.txt   # should show "Allow: /"
```

If `robots.txt` still shows `Disallow: /`, `NEXT_PUBLIC_SITE_ENV` wasn't
actually `production` at build time — double-check the GitHub Actions run's
build step, not the server.
