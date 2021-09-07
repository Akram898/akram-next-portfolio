import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import styled, { keyframes } from "styled-components";
const blink = keyframes`
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
}

@-webkit-keyframes blink {
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
}

@-moz-keyframes blink {
50% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;
const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    overflow-x:hidden;

  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${(props) => props.theme.colors.background1};
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
    overflow-x:hidden;

  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
 background: linear-gradient(90deg, rgba(144,46,132,.7) 0%, rgba(44,11,77,.7) 50%, rgba(30,10,68,.7) 100%);

}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:linear-gradient(
    270deg
    ,#13ADC7 0%,#945DD6 100%);
    border-radius: 5px;
  }
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    270deg
    ,#F46737 0%,#945DD6 100%) !important; 
}


// .ityped-cursor {
//   -webkit-animation: ${blink} 1s infinite;
//   -moz-animation: ${blink} 1s infinite;
//   animation: ${blink} 1s infinite;
//   animation-direction: alternate;
//   position: relative;
//   top: 0;
//   animation: ${blink};
//   animation-duration: 3s;
//   animation-fill-mode: infinite;
// }






`;

export default GlobalStyles;
