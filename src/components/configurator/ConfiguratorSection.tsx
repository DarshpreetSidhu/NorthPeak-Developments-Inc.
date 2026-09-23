import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectConfigurator } from "@/components/configurator/ProjectConfigurator";

export function ConfiguratorSection() {
  return (
    <section id="build-your-space" className="scroll-mt-24 border-y border-line-dark bg-graphite py-24 sm:py-28 lg:py-32">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Build Your Space"
          title="Tell us what you're picturing — we'll take it from there."
          description="Four quick steps: project type, size, a starting finish direction, and where to reach you. No pressure, no obligation — just a faster start to your consultation."
        />
      </Container>
      <Container className="mt-14 max-w-3xl">
        <ProjectConfigurator />
      </Container>
    </section>
  );
}
