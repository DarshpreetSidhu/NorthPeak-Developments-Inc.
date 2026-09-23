// PM2 process definition for the Next.js standalone server on the
// Hostinger VPS. Deliberately holds no secrets — RESEND_API_KEY,
// CONTACT_NOTIFICATION_EMAIL, CONTACT_WEBHOOK_URL, and the real
// NEXT_PUBLIC_SITE_URL live only in the server's untracked
// .next/standalone/.env.production.local (see docs/DEPLOYMENT.md), which
// Next's generated server.js loads automatically at startup. NODE_ENV/PORT
// below are deployment topology, not secrets, so they're fine to commit.
module.exports = {
  apps: [
    {
      name: "northpeak-web",
      script: "server.js",
      cwd: "./.next/standalone",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
