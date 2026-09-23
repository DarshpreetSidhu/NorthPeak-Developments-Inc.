/**
 * ArchitecturalPlate — bespoke, generative line-art illustrations standing
 * in for photography that does not yet exist.
 *
 * These are original vector compositions in the NorthPeak palette, not
 * photographs and not renderings of real completed work. They are used
 * everywhere the brief calls for imagery so the site never implies
 * documentation of actual projects. Replace with real, rights-cleared
 * photography per docs/ASSET_INVENTORY.md — every call site of this
 * component is a placeholder to swap out.
 */

type Layout =
  | "entertainment-wall"
  | "kitchen"
  | "bath"
  | "bedroom"
  | "suite-entry"
  | "texture";

type Palette = "warm" | "graphite" | "soft" | "neutral";

type PaletteTokens = {
  bgFrom: string;
  bgTo: string;
  line: string;
  lineSoft: string;
  accent: string;
  accent2: string;
  glow: string;
};

const palettes: Record<Palette, PaletteTokens> = {
  warm: {
    bgFrom: "#20180F",
    bgTo: "#0E1011",
    line: "#8A6A47",
    lineSoft: "#4A3B2D",
    accent: "#C9A07A",
    accent2: "#EDE7DC",
    glow: "#A77951",
  },
  graphite: {
    bgFrom: "#26282A",
    bgTo: "#0E1011",
    line: "#4B4E51",
    lineSoft: "#2A2C2E",
    accent: "#C8C0B5",
    accent2: "#8F959A",
    glow: "#6B7075",
  },
  soft: {
    bgFrom: "#2A241C",
    bgTo: "#141210",
    line: "#D9CFBE",
    lineSoft: "#8A6A47",
    accent: "#F4F0E9",
    accent2: "#C9A07A",
    glow: "#D9CFBE",
  },
  neutral: {
    bgFrom: "#1F2224",
    bgTo: "#0E1011",
    line: "#3A3D3F",
    lineSoft: "#26282A",
    accent: "#A77951",
    accent2: "#C8C0B5",
    glow: "#A77951",
  },
};

function EntertainmentWallScene({ t, id }: { t: PaletteTokens; id: string }) {
  return (
    <g>
      {/* wall paneling */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x={40 + i * 40} y={90} width={6} height={340} fill={t.lineSoft} opacity={0.5} />
      ))}
      {/* floating cabinet */}
      <rect x={140} y={360} width={520} height={70} rx={2} fill={t.lineSoft} stroke={t.line} strokeWidth={1.5} />
      {/* TV */}
      <rect x={280} y={150} width={240} height={140} rx={2} fill="#050606" stroke={t.line} strokeWidth={2} />
      <rect x={292} y={162} width={216} height={116} fill={`url(#${id}-screen)`} />
      {/* shelving */}
      <rect x={150} y={230} width={90} height={4} fill={t.accent} />
      <rect x={150} y={280} width={90} height={4} fill={t.accent} />
      <rect x={560} y={230} width={90} height={4} fill={t.accent} />
      <rect x={560} y={280} width={90} height={4} fill={t.accent} />
      {/* pendant lights */}
      <line x1={210} y1={40} x2={210} y2={140} stroke={t.line} strokeWidth={1.5} />
      <circle cx={210} cy={150} r={14} fill={t.accent} opacity={0.9} />
      <line x1={590} y1={40} x2={590} y2={140} stroke={t.line} strokeWidth={1.5} />
      <circle cx={590} cy={150} r={14} fill={t.accent} opacity={0.9} />
      {/* sofa silhouette */}
      <rect x={230} y={470} width={340} height={60} rx={10} fill={t.lineSoft} opacity={0.8} />
      <rect x={210} y={430} width={40} height={100} rx={10} fill={t.lineSoft} opacity={0.8} />
      <rect x={550} y={430} width={40} height={100} rx={10} fill={t.lineSoft} opacity={0.8} />
    </g>
  );
}

function KitchenScene({ t, id }: { t: PaletteTokens; id: string }) {
  return (
    <g>
      <rect x={0} y={380} width={800} height={220} fill={t.lineSoft} opacity={0.4} />
      {/* upper cabinets */}
      <rect x={60} y={90} width={680} height={90} fill={t.lineSoft} stroke={t.line} strokeWidth={1.5} />
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={60 + i * 97} y1={90} x2={60 + i * 97} y2={180} stroke={t.line} strokeWidth={1} />
      ))}
      {/* island */}
      <rect x={200} y={380} width={400} height={90} fill="#050606" stroke={t.line} strokeWidth={2} />
      <rect x={200} y={380} width={400} height={12} fill={t.accent} />
      {/* pendants */}
      {[300, 400, 500].map((x) => (
        <g key={x}>
          <line x1={x} y1={40} x2={x} y2={220} stroke={t.line} strokeWidth={1.5} />
          <ellipse cx={x} cy={232} rx={16} ry={10} fill={t.accent} />
        </g>
      ))}
      <rect x={0} y={0} width={800} height={90} fill={`url(#${id}-window)`} opacity={0.5} />
    </g>
  );
}

function BathScene({ t, id }: { t: PaletteTokens; id: string }) {
  return (
    <g>
      <rect x={120} y={340} width={560} height={90} fill={t.lineSoft} stroke={t.line} strokeWidth={1.5} />
      <rect x={140} y={160} width={220} height={160} rx={2} fill={`url(#${id}-screen)`} stroke={t.line} strokeWidth={1.5} />
      <circle cx={560} cy={260} r={70} fill="none" stroke={t.accent} strokeWidth={2} />
      <line x1={200} y1={100} x2={200} y2={160} stroke={t.line} strokeWidth={1.5} />
      <circle cx={200} cy={172} r={10} fill={t.accent} />
      <rect x={420} y={430} width={260} height={110} rx={4} fill={t.lineSoft} opacity={0.7} />
    </g>
  );
}

function BedroomScene({ t, id }: { t: PaletteTokens; id: string }) {
  return (
    <g>
      <rect x={140} y={330} width={420} height={140} rx={6} fill={t.lineSoft} stroke={t.line} strokeWidth={1.5} />
      <rect x={140} y={330} width={420} height={26} fill={t.accent} opacity={0.6} />
      <rect x={580} y={360} width={90} height={70} fill={t.lineSoft} opacity={0.7} />
      <rect x={600} y={90} width={200} height={220} fill={`url(#${id}-window)`} opacity={0.45} />
      <line x1={190} y1={200} x2={190} y2={330} stroke={t.line} strokeWidth={1.5} />
      <circle cx={190} cy={214} r={12} fill={t.accent} />
    </g>
  );
}

function SuiteEntryScene({ t }: { t: PaletteTokens; id: string }) {
  return (
    <g>
      <rect x={280} y={140} width={180} height={340} rx={2} fill={t.lineSoft} stroke={t.line} strokeWidth={2} />
      <circle cx={430} cy={310} r={6} fill={t.accent} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={80 + i * 20} y={420 + i * 8} width={140 - i * 18} height={10} fill={t.lineSoft} opacity={0.7} />
      ))}
      <line x1={370} y1={40} x2={370} y2={140} stroke={t.line} strokeWidth={1.5} />
      <circle cx={370} cy={152} r={12} fill={t.accent} />
    </g>
  );
}

function TextureScene({ t }: { t: PaletteTokens; id: string }) {
  return (
    <g opacity={0.6}>
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={0} y1={60 + i * 46} x2={800} y2={60 + i * 46} stroke={t.lineSoft} strokeWidth={1} />
      ))}
      <circle cx={400} cy={300} r={220} fill="none" stroke={t.accent} strokeWidth={1} opacity={0.5} />
      <circle cx={400} cy={300} r={140} fill="none" stroke={t.accent} strokeWidth={1} opacity={0.35} />
    </g>
  );
}

const scenes: Record<Layout, typeof EntertainmentWallScene> = {
  "entertainment-wall": EntertainmentWallScene,
  kitchen: KitchenScene,
  bath: BathScene,
  bedroom: BedroomScene,
  "suite-entry": SuiteEntryScene,
  texture: TextureScene,
};

export function ArchitecturalPlate({
  layout,
  palette = "neutral",
  className = "",
  title,
}: {
  layout: Layout;
  palette?: Palette;
  className?: string;
  title: string;
}) {
  const t = palettes[palette];
  const id = `${layout}-${palette}`;
  const Scene = scenes[layout];

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.bgFrom} />
          <stop offset="100%" stopColor={t.bgTo} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor={t.glow} stopOpacity={0.35} />
          <stop offset="100%" stopColor={t.glow} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.lineSoft} />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>
        <linearGradient id={`${id}-window`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.accent2} stopOpacity={0.4} />
          <stop offset="100%" stopColor={t.accent2} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-glow)`} />
      <Scene t={t} id={id} />
      <rect width="800" height="600" fill="transparent" stroke={t.lineSoft} strokeWidth="1" />
    </svg>
  );
}
