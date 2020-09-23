import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ROUTES, ROUTE_HOME } from "@shared/routes";

import { LogoTitle, LabelTitle } from "@components/logo-title";

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTE_HOME;
  return routeName === ROUTE_HOME ? (
    <LogoTitle />
  ) : (
    <LabelTitle label={ROUTES[routeName].label} />
  );
};
