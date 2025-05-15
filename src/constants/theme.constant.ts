import { createTheme } from "@shopify/restyle";
import { FontSize, Radius, Space } from "./sizes.constant";
import { mhs, mvs } from "helpers/system.helper";

export const COLORS = {
  light: {
    background: "#f5f5f5",
    primaryLightest: "#eff4fd",
    primaryLight: "#c7d9f9",
    primary: "#8cb0f3",
    primaryDark: "#578cee",
    primaryDarkest: "#1d61e0",
    reverse: "#05122a",
  },
  dark: {
    background: "#1b1b1b",
    primaryDarkest: "#031b3c",
    primaryDark: "#08459a",
    primary: "#4290ff",
    primaryLight: "#a0c8ff",
    primaryLightest: "#dfedff",
    reverse: "#ffffff",
  },
};

export const LIGHT_THEME = createTheme({
  colors: {
    ...COLORS.light,
    text: COLORS.light.reverse,

    error: "rgb(186 49 34)",
    errorLightest: "rgb(246 219 216)",
    success: "rgb(53 176 74), 215, 105)",
    successLightest: "rgb(218 241 199)",
    warning: "rgb(248, 189, 42)",
    warningLightest: "rgb(245 231 206)",
    info: "rgb(32 109 181)",
    infoLightest: "rgb(205 226 247)",
    backdrop: "rgba(54 54 54 / 0.7)",
    secondary: "#6B6B6B",
    transparent: "#00000000",
    outline: "#f5f5f5",
    ground: "#D8D8D8",
    white: "#ffffff",
    black: "#000000",

    //shadow
    shadowLight: "rgba(0, 0, 0)",
    shadow: "rgba(0, 0, 0)",
    shadowDark: "rgba(0, 0, 0)",
  },
  spacing: {
    ...Space,
  },
  borderRadii: {
    ...Radius,
  },
  textVariants: {
    xxxxs: {
      fontSize: FontSize.xxxxs,
      letterSpacing: mhs(0.4, 0.3),
      lineHeight: mvs(5, 0.1),
    },
    xxxs: {
      fontSize: FontSize.xxxs,
      letterSpacing: mhs(0.4, 0.3),
      lineHeight: mvs(10, 0.1),
    },
    xxs: {
      fontSize: FontSize.xxs,
      letterSpacing: mhs(0.4, 0.3),
      lineHeight: mvs(13, 0.1),
    },
    xs: {
      fontSize: FontSize.xs,
      letterSpacing: mhs(0.4, 0.3),
      lineHeight: mvs(16, 0.1),
    },
    sm: {
      fontSize: FontSize.sm,
      letterSpacing: mhs(0.25, 0.3),
      lineHeight: mvs(20, 0.1),
    },
    md: {
      fontSize: FontSize.md,
      letterSpacing: mhs(0.15, 0.3),
      lineHeight: mvs(24, 0.1),
    },
    lg: {
      fontSize: FontSize.lg,
      letterSpacing: mhs(0.15, 0.3),
      lineHeight: mvs(25, 0.1),
    },
    xl: {
      fontSize: FontSize.xl,
      letterSpacing: mhs(0.07, 0.3),
      lineHeight: mvs(26, 0.1),
    },
    xxl: {
      fontSize: FontSize.xxl,
      letterSpacing: mhs(0, 0.3),
      lineHeight: mvs(32, 0.1),
    },
    xxxl: {
      fontSize: FontSize.xxxl,
      letterSpacing: mhs(0, 0.3),
      lineHeight: mvs(38, 0.1),
    },
    xxxxl: {
      fontSize: FontSize.xxxxl,
      letterSpacing: mhs(0, 0.3),
      lineHeight: mvs(51, 0.1),
    },
    defaults: {
      color: "reverse",
    },
  },
  breakpoints: {},
  shadowVariants: {
    defaults: {
      shadowColor: "shadowLight",
      shadowOffset: {
        width: 0,
        height: mhs(1),
      },
      shadowOpacity: 0.2,
      shadowRadius: mhs(0.7),
      elevation: 1,
    },
    xs: {
      shadowColor: "shadowLight",
      shadowOffset: {
        width: 0,
        height: mhs(1),
      },
      shadowOpacity: 0.2,
      shadowRadius: mhs(0.7),
      elevation: 1,
    },
    sm: {
      shadowColor: "shadowLight",
      shadowOffset: {
        width: 0,
        height: mhs(2),
      },
      shadowOpacity: 0.25,
      shadowRadius: mhs(1.41),
      elevation: 2,
    },
    md: {
      shadowColor: "shadow",
      shadowOffset: {
        width: 0,
        height: mhs(2),
      },
      shadowOpacity: 0.3,
      shadowRadius: mhs(2.22),

      elevation: 3,
    },
    lg: {
      shadowColor: "shadowDark",
      shadowOffset: {
        width: 0,
        height: mhs(3),
      },
      shadowOpacity: 0.35,
      shadowRadius: mhs(3.65),

      elevation: 5,
    },
    xl: {
      shadowColor: "shadowDark",
      shadowOffset: {
        width: 0,
        height: mhs(4),
      },
      shadowOpacity: 0.4,
      shadowRadius: mhs(4.65),
      elevation: 7,
    },
  },
});

export const DARK_THEME = createTheme({
  ...LIGHT_THEME,
  colors: {
    ...COLORS.dark,
    text: COLORS.dark.reverse,

    error: "rgb(194 20 29)",
    errorLightest: "rgb(54 7 10)",
    success: "rgb(74,175,87)",
    successLightest: "rgb(27 46 2)",
    warning: "rgb(185 136 0)",
    warningLightest: "rgb(41 28 2)",
    info: "rgb(36,107,253)",
    infoLightest: "rgb(0, 29, 50)",
    backdrop: "rgba(49 49 49 / 0.4)",
    secondary: "#9B9B9B",
    transparent: "#00000000",
    outline: "#1B1C1E",
    ground: "#202225",
    white: "#ffffff",
    black: "#000000",

    //shadow
    shadowLight: "rgba(0, 0, 0)",
    shadow: "rgba(0, 0, 0)",
    shadowDark: "rgba(0, 0, 0)",
  },
});

export type Theme = typeof LIGHT_THEME;
export type ColorKey = keyof Theme["colors"];
