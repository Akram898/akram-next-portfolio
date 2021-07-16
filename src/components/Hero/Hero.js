import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";
// import "./hero.scss";
import styles from "../../styles/hero.module.scss";
import { useEffect, useRef } from "react";
import { init } from "ityped";

const Hero = (props) => {
  const textRef = useRef();
  useEffect(() => {
    //  console.log(textRef)
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      strings: ["Web Developer", "Software Enginner", "Programmer"],
    });
  }, []);
  return (
    <Section row nopadding>
      <LeftSection className={styles.leftSec}>
        <SectionTitle>
          Hi There, My name is <br />
          Akram <br />
          I'm A <span ref={textRef}> &nbsp;</span>
        </SectionTitle>
        <div style={{ display: "flex;", justifyContent: "space-between" }}>
          <Button onClick={() => (window.location = "#projects")}>
            Check My Work
          </Button>
          <Button onClick={() => (window.location = "#projects")}>
            Get CV
          </Button>
        </div>
      </LeftSection>
    </Section>
  );
};
export default Hero;
