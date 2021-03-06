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
  ProjectSection,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { projects } from "../../constants/constants";
import { AiFillGithub } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import styles from "../../styles/hero.module.scss";

const Projects = () => (
  <ProjectSection
    nopadding
    id="projects"
    style={{ maxWidth: "100% !important;" }}
  >
    <SectionDivider />
    <div align="center">
      <SectionTitle main>Projects</SectionTitle>
      <p>Some of the projects that I've done</p>
    </div>

    <GridContainer className={styles.projSec}>
      {projects.map((p, i) => {
        return (
          <BlogCard
            key={i}
            href={p.visit}
            target="_blank"
            className={styles.blogCard}
          >
            <Img src={p.image} className={styles.cardImg} />
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
  </ProjectSection>
);

export default Projects;
