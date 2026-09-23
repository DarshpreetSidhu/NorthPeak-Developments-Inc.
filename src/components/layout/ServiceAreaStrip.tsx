import { siteConfig } from "@/content/site.config";

export function ServiceAreaStrip() {
  return (
    <div className="border-b border-line-dark bg-near-black">
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-6 py-2.5 text-center sm:justify-between sm:px-8 lg:px-12">
        <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-stone uppercase sm:shrink-0">
          Serving Calgary &amp; Area
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {siteConfig.serviceAreas.map((area) => (
            <li key={area} className="text-[0.6875rem] tracking-wide text-stone/80">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
