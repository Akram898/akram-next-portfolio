import React from "react";

import {
  BlogCard,
  CardInfo,
  ExternalLinks,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  TitleContent,
  UtilityList,
  Img,
} from "./ProjectsStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { projects } from "../../constants/constants";
import { AiFillGithub } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import styles from "../../styles/hero.module.scss";

const Projects = () => (
  <Section nopadding id="projects">
    <SectionDivider />
    <div align="center">
      <SectionTitle main>Projects</SectionTitle>
    </div>

    <GridContainer className={styles.projSec}>
      {projects.map((p, i) => {
        return (
          <BlogCard key={i}>
            <Img src={p.image} />
            <div style={{ height: "20rem" }}>
              <TitleContent>
                <HeaderThree title>{p.title}</HeaderThree>
                <Hr />
              </TitleContent>

              <CardInfo className="card-info">{p.description}</CardInfo>
              <br />
              <div>
                <TitleContent>Stack</TitleContent>
                <TagList>
                  {p.tags.map((t, i) => {
                    return <Tag key={i}>{t}</Tag>;
                  })}
                </TagList>
              </div>
            </div>
            <UtilityList>
              <ExternalLinks href={p.visit} target="_blank">
                Visit <BsBoxArrowUpRight />
              </ExternalLinks>
              <ExternalLinks href={p.source} target="_blank">
                See Code <AiFillGithub />
              </ExternalLinks>
            </UtilityList>
          </BlogCard>
        );
      })}
    </GridContainer>
  </Section>
);

export default Projects;
