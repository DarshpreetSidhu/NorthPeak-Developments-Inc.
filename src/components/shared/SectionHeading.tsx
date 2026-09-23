type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase ${
            isDark ? "text-bronze-dark" : "text-bronze-light"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={`font-display text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl ${
          isDark ? "text-near-black" : "text-warm-white"
        }`}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
            isDark ? "text-stone-muted" : "text-stone"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
