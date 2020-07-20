import { vars } from "./variables";
import { createMuiTheme } from "@material-ui/core";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Exo 2:300,400,600", "sans-serif"],
  },
});

function getTheme(theme) {
  return createMuiTheme({
    typography: {
      fontFamily: '"Exo 2"',
      fontSize: 14,
      h1: {
        fontSize: 50,
        fontWeight: 400,
        marginTop: 30,
        marginBottom: 30,
      },
      h3: {
        fontSize: 26,
        fontWeight: 300,
        marginTop: 20,
        marginBottom: 20,
      },
    },
    palette: {
      type: theme.paletteType,
      primary: {
        main: "#6C00D0",
      },
      background: {
        paper: theme.paletteType === "light" ? "inherit" : vars.pageBg,
      },
    },
    overrides: {
      MuiPaper: {
        root: {
          display: "flex",
        },
      },
      MuiFormControl: {
        root: {
          marginBottom: "20px",
        },
      },
      MuiInputLabel: {
        root: {
          color: "#fff",
          "&$focused": {
            color: "#fff",
          },
        },
      },
      MuiButton: {
        root: {
          marginBottom: "20px",
        },
      },
      MuiCard: {
        root: {
          width: "100%",
          // padding: '20px',
          borderRadius: "4px",
          backgroundColor: vars.contentBg,
        },
      },
    },
  });
}

const theme = getTheme({
  paletteType: "dark",
});

export default theme;
