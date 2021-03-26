import HomeScreen from "@screens/main/home";
import ReadingListScreen from "@screens/reading-list";
import ProfileScreen from "@screens/main/profile";
import OnboardingScreen from "@screens/onboarding";

import {
  faHomeAlt,
  faBookmark,
  faUserAstronaut,
} from "@fortawesome/pro-regular-svg-icons";

import {
  faHomeAlt as faHomeAltSolid,
  faBookmark as faBookmarkSolid,
  faUserAstronaut as faUserAstronautSolid,
} from "@fortawesome/pro-solid-svg-icons";

export const ROUTE_HOME = "home";
export const ROUTE_READING_LIST = "reading-list";
export const ROUTE_ONBOARDING = "onboarding";
export const ROUTE_PROFILE = "profile";
export const ROUTE_AUTH = "auth";
export const ROUTE_MAIN = "main";
export const ROUTE_AUTH_SELECT = "auth-select";
export const ROUTE_AUTH_FORM = "auth-form";

const HOME = {
  route: ROUTE_HOME,
  component: HomeScreen,
  icon: faHomeAlt,
  iconSolid: faHomeAltSolid,
  label: "Home",
};

const READING_LIST = {
  route: ROUTE_READING_LIST,
  component: ReadingListScreen,
  icon: faBookmark,
  iconSolid: faBookmarkSolid,
  label: "Reading List",
};

const ONBOARDING = {
  route: ROUTE_ONBOARDING,
  component: ONBOARDING,
  icon: faBookmark,
  iconSolid: faBookmarkSolid,
  label: "Reading List",
};

const PROFILE = {
  route: ROUTE_PROFILE,
  component: ProfileScreen,
  icon: faUserAstronaut,
  iconSolid: faUserAstronautSolid,
  label: "Profile",
};

export const ROUTES = {
  [ROUTE_HOME]: HOME,
  [ROUTE_READING_LIST]: READING_LIST,
  [ROUTE_PROFILE]: PROFILE,
  [ROUTE_ONBOARDING]: ONBOARDING,
};

export const MAIN_TABS = [HOME, PROFILE];
