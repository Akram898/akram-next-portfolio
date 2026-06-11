import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Ahmed Akram, Akram, Web Developer, Programmer, Full-Stack Developer, Front End Developer, Back End Developer, Software Engineer, Portfolio, Showcase projects and technoligies, React, Next JS, HTML, CSS, SASS, Firebae, Bootstrap, Javascript, JS, Docker, Web Developer, Programmer, Full-Stack Developer, Front End Developer, Back End Developer, Software Engineer"
          />
          <meta
            name="keywords"
            content="Ahmed Akram,Web Developer, Akram, Programmer, Full-Stack Developer, Front End Developer, Back End Developer, Software Engineer, Portfolio, Showcase projects and technoligies, React, Next JS, HTML, CSS, SASS, Firebae, Bootstrap, Javascript, JS, Docker, Web Developer, Programmer, Full-Stack Developer, Front End Developer, Back End Developer, Software Engineer"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
