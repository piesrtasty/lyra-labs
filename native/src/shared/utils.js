import React from "react";
import { Dimensions } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ROUTES, ROUTE_HOME, GRADIENT_ROUTES } from "@shared/routes";

// import { LogoTitle, LabelTitle } from "@components/logo-title";

export const getRouteName = (route) =>
  getFocusedRouteNameFromRoute(route) ?? ROUTE_HOME;

// export const getHeaderTitle = (route) => {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getRouteName(route);
//   // const test = getFocusedRouteNameFromRoute(route);
//   console.log("---------------");
//   console.log("routeName", routeName);
//   console.log("---------------");
//   // if (routeName === "auth") {
//   //   return null;
//   // }

//   return routeName === ROUTE_HOME ? (
//     <LogoTitle />
//   ) : (
//     <LabelTitle label={ROUTES[routeName].label} />
//   );
// };

export const getHeaderStyles = (route, theme) => {
  const routeName = getRouteName(route);
  return GRADIENT_ROUTES.includes(routeName)
    ? { backgroundColor: "transparent" }
    : {
        // backgroundColor: theme.headerBackground,
        borderStyle: "solid",
        borderBottomWidth: 1,
        // borderBottomColor: theme.gridLine,
        // shadowColor: theme.gridLine,
      };
};

export const getTabBarStyles = (route, theme) => {
  const routeName = getRouteName(route);
  // const routeSpecificStyles = GRADIENT_ROUTES.includes(routeName)
  //   ? { backgroundColor: "transparent", borderTopWidth: 0 }
  //   : { backgroundColor: theme.tabNavigatorBackground };

  const routeSpecificStyles = GRADIENT_ROUTES.includes(routeName)
    ? { backgroundColor: "transparent", borderTopWidth: 0 }
    : { backgroundColor: "#00000" };
  // const padding = 50;
  const padding = 0;
  return {
    paddingRight: padding,
    paddingLeft: padding,
    ...routeSpecificStyles,
  };
};

export const getLayoutStyles = (transparentBg, theme) => {
  // const routeName = getRouteName(route);
  // const r = getFocusedRouteNameFromRoute(route);
  // console.log("r", r);
  // const routeSpecificStyles = {
  //   backgroundColor: transparentBg ? "transparent" : theme.primaryBackground,
  // };
  const routeSpecificStyles = {
    backgroundColor: transparentBg ? "transparent" : "#000000",
  };
  return { flex: 1, ...routeSpecificStyles };
};

const { width: viewportWidth } = Dimensions.get("window");

export const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

// RE from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const validateEmail = (email) => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
