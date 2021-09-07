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
          <BoxNum>(+971)561-798-031</BoxNum>
          <BoxNum>(+20)100-1509-722</BoxNum>
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
