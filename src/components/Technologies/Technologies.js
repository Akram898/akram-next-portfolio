import React from "react";
import { DiFirebase, DiReact, DiZend } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";
import styles from "../../styles/hero.module.scss";

const Technologies = () => (
  <Section>
    <SectionDivider divider id="about" />
    <div className={styles.row}>
      <div className={styles.left}>
        <SectionTitle>About</SectionTitle>
        <SectionText>
          I'm A Technology lover, always trying to be a better
          Developer/Programmer/Human.
        </SectionText>
      </div>
      <div className={styles.right}>
        <img
          src="images/develop.svg"
          alt="about"
          loading="lazy"
          className={styles.img}
        />
      </div>
    </div>

    <div className={styles.techDiv} id="tech">
      <SectionTitle>Technologies</SectionTitle>

      <List>
        <ListItem>
          <picture>
            <DiReact size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Front-End</ListTitle>
            <ListParagraph>
              Experiece with <br />
              React.js
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <picture>
            <DiFirebase size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Back-End</ListTitle>
            <ListParagraph>
              Experience with <br />
              Node and Databases
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <picture>
            <DiZend size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>UI/UX</ListTitle>
            <ListParagraph>
              Experience with <br />
              tools like Figma
            </ListParagraph>
          </ListContainer>
        </ListItem>
      </List>
    </div>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
