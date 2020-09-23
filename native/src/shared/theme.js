const BLACK = "#000000";
const MINE_SHAFT = "#262626"; // RGB 38 38 38
const WHITE = "#FFFFFF";
const BOULDER = "#747474"; // RGB 117 117 117

const ALABASTER = "#f0f0f0"; // RGB 240 240 240

const CHALICE = "#AAAAAA"; // RGB 170 170 170

const BLACKOUT = "#121212"; // RGB 18 18 18
const CHARCOAL = "#191919"; // RGB 25 25 25
const BLACKJACK = "#202020"; // RGB 33 33 33

export const VAPOR_PINK = "#ff71ce"; // (255,113,206)
export const VAPOR_BLUE = "#01cdfe"; // (1,205,254)
const VAPOR_GREEN = "#05ffa1"; // (5,255,161)
const VAPOR_PURPLE = "#b967ff"; // (185,103,255)
const VAPOR_YELLOW = "#fffb96"; // (255,251,150)

const PRIMARY_BG_DARK = BLACKOUT;
const PRIMARY_GRIDLINE_DARK = BLACKJACK;

// #191919 = RGB  25, 25, 25 NERO

// 333333

// #3636765
// #10D7AE

export const ThemeColors = {
  primaryText: {
    light: "black",
    dark: "white",
  },
  primaryBackground: {
    light: WHITE,
    dark: PRIMARY_BG_DARK,
  },
  gridLine: {
    light: ALABASTER,
    dark: BLACKJACK,
  },
  tabNavigatorBackground: {
    light: BLACK,
    dark: MINE_SHAFT,
  },
  headerBackground: {
    light: WHITE,
    dark: BLACK,
  },
  headerTextColor: {
    light: MINE_SHAFT,
    dark: WHITE,
  },
  tabBarIconActive: {
    light: WHITE,
    dark: WHITE,
  },
  tabBarIcon: {
    light: BOULDER,
    dark: BOULDER,
  },
  topTabBackgroundColor: {
    light: WHITE,
    dark: PRIMARY_BG_DARK,
  },
  topTabTextColor: {
    light: BOULDER,
    dark: CHALICE,
  },
  topTabTextColorActive: {
    light: CHARCOAL,
    dark: WHITE,
  },
  topTabBorderActive: {
    light: CHARCOAL,
    dark: WHITE,
  },
};

export const getTheme = (mode) => {
  let Theme = {};
  for (let key in ThemeColors) {
    Theme[key] = ThemeColors[key][mode];
  }
  return Theme;
};
