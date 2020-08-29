import Head from "next/head";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

const THEME = {
  COLORS: {
    ALABASTER: "#f9fafa",
    RICE_CAKE: "#f3f3f3",
    LILAC: "#e8e8e8",
    WHITE: "#fff",
    BLACK: "#000",
  },
};

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={THEME}>
      <Head>
        <title>Lyra Labs 🥰</title>
      </Head>
      <Global
        styles={css`
          body {
            font-size: 18px;
            background-color: ${THEME.COLORS.ALABASTER};
            margin: 0;
          }
        `}
      />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
