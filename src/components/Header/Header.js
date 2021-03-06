import Link from "next/link";
import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
} from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";

import {
  Container,
  Span,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
} from "./HeaderStyles";
// import styles from "../../styles/topBar.module.scss";

const Header = () => (
  <Container>
    <Div1>
      <Link href="/">
        <a
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            // marginBottom: "20px",
          }}
        >
          {/* <DiCssdeck size="3rem" /> <Span>Portfolio</Span> */}
          <img
            style={{ width: "21rem;", padding: ".5rem 0 0 4rem" }}
            src="/images/akram-white-logo.png"
          />
        </a>
      </Link>
    </Div1>
    <Div2>
      <li>
        <Link href="#projects">
          <NavLink>Projects</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#about">
          <NavLink>About</NavLink>
        </Link>
      </li>
      <li>
        <Link href="#tech">
          <NavLink>Technologies</NavLink>
        </Link>
      </li>

     

      <li>
        <Link href="#contact">
          <NavLink>Contact</NavLink>
        </Link>
      </li>
    </Div2>
    <Div3>
      <SocialIcons href="https://github.com/Akram898" target="_blank">
        <AiFillGithub size="3rem" />
      </SocialIcons>
      <SocialIcons
        href="https://www.linkedin.com/in/ahmedakram/"
        target="_blank"
      >
        <AiFillLinkedin size="3rem" />
      </SocialIcons>
      <SocialIcons href="#contact">
        <AiFillMail size="3rem" />
      </SocialIcons>
      <SocialIcons href="tel:00971561798031">
        <AiFillPhone size="3rem" />
      </SocialIcons>
      {/* <div className={styles.right}>
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.line1}></span>
          <span className={styles.line2}></span>
          <span className={styles.line3}></span>
        </div>
      </div> */}
    </Div3>
  </Container>
);

export default Header;
