import Dispatch from "../Dispatch";
import Reveal from "../Reveal";
import TitleBlock from "../TitleBlock";

export default function Hero() {
  return (
    <section id="control-plane" aria-label="Introduction">
      <div className="mx-auto flex min-h-svh max-w-sheet flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <Reveal>
          <p className="label !text-trace">
            Ahmed Akram · AI Solutions Engineer &amp; Architect · Dubai
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            Applied AI,
            <br />
            drawn to spec.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-dim sm:text-xl">
            Multi-agent systems, MLOps pipelines, and the enterprise identity
            and API platforms underneath them — serving millions of users.
          </p>
        </Reveal>
        <Reveal delay={0.26} className="mt-14">
          <Dispatch />
        </Reveal>
        <Reveal delay={0.32}>
          <TitleBlock sheet="control-plane" meta="DXB · GST UTC+4">
            <a href="#case-files" className="label transition-colors duration-150 hover:!text-trace">
              Scroll ↓
            </a>
          </TitleBlock>
        </Reveal>
      </div>
    </section>
  );
}
