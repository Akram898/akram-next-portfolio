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
      strings: ["Web Developer", "Software Engineer", "Programmer"],
    });
  }, []);
  return (
    <>
      <div className={styles.myImg2}>
        <img loading="lazy" src="/images/new-photo.jpg" alt="my-photo" style={{"border: solid 1px": "1px solid green"}} />
      </div>
      <Section row nopadding className={styles.main}>
        <LeftSection className={styles.leftSec}>
          <div className={styles.title}>
            <SectionTitle>
              Hi There, My name is <br />
              Ahmed Akram <br />
              I'm A <span ref={textRef}> &nbsp;</span>
            </SectionTitle>
          </div>
          <div className={styles.btnsDiv}>
            <Button onClick={() => (window.location = "#projects")}>
              Check My Work
            </Button>

            <Button onClick={() => (window.location = "#contact")}>
              Contact
            </Button>
          </div>
          <div className={styles.myImg}>
            <img loading="lazy" src="/images/my-photo.jpg" alt="my-photo" />
          </div>
        </LeftSection>
      </Section>
    </>
  );
};
export default Hero;
