import SheetIndex from "@/components/SheetIndex";
import Hero from "@/components/sheets/Hero";
import CaseFiles from "@/components/sheets/CaseFiles";
import Lab from "@/components/sheets/Lab";
import Capabilities from "@/components/sheets/Capabilities";
import About from "@/components/sheets/About";
import Contact from "@/components/sheets/Contact";

export default function Home() {
  return (
    <>
      <SheetIndex />
      <main>
        <Hero />
        <CaseFiles />
        <Lab />
        <Capabilities />
        <About />
        <Contact />
      </main>
    </>
  );
}
