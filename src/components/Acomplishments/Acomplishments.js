import React from "react";

import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { Box, Boxes, BoxNum, BoxText } from "./AcomplishmentsStyles";
import styles from "../../styles/hero.module.scss";

const data = [
  { number: 20, text: "Open Source Projects" },
  { number: 1000, text: "Students" },
  { number: 1900, text: "Github Followers" },
  { number: 5000, text: "Github Stars" },
];

const Acomplishments = () => (
  <Section id="contact">
    <div align="center">
      <SectionTitle>Contact</SectionTitle>
    </div>
    <div className={styles.contactDiv}>
      <Boxes>
        <Box>
          <BoxText>Email</BoxText>
          <BoxNum>akram78787@gmail.com</BoxNum>
        </Box>
        <Box>
          <BoxText>Phone</BoxText>
          <BoxNum>
            {" "}
            <a className={styles.newLink} href="tel:+971561798031">
              {" "}
              +971561798031
            </a>
          </BoxNum>
          <BoxNum>
            {" "}
            <a className={styles.newLink} href="tel:+201001509722">
              +201001509722
            </a>
          </BoxNum>
        </Box>
        {/* {data.map((card, index) => (
        <Box key={index}>
          <BoxNum>{`${card.number}+`}</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))} */}
      </Boxes>
    </div>
  </Section>
);

export default Acomplishments;
