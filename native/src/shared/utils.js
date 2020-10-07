import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ROUTES, ROUTE_HOME, GRADIENT_ROUTES } from "@shared/routes";

import { LogoTitle, LabelTitle } from "@components/logo-title";

export const getRouteName = (route) =>
  getFocusedRouteNameFromRoute(route) ?? ROUTE_HOME;

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getRouteName(route);
  return routeName === ROUTE_HOME ? (
    <LogoTitle />
  ) : (
    <LabelTitle label={ROUTES[routeName].label} />
  );
};

export const getHeaderStyles = (route, theme) => {
  const routeName = getRouteName(route);
  return GRADIENT_ROUTES.includes(routeName)
    ? { backgroundColor: "transparent" }
    : {
        backgroundColor: theme.headerBackground,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: theme.gridLine,
        shadowColor: theme.gridLine,
      };
};

export const getTabBarStyles = (route, theme) => {
  const routeName = getRouteName(route);
  const routeSpecificStyles = GRADIENT_ROUTES.includes(routeName)
    ? { backgroundColor: "transparent", borderTopWidth: 0 }
    : { backgroundColor: theme.tabNavigatorBackground };
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
  const routeSpecificStyles = {
    backgroundColor: transparentBg ? "transparent" : theme.primaryBackground,
  };
  return { flex: 1, ...routeSpecificStyles };
};
