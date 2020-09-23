import HomeScreen from "@screens/main/home";
import ReadingListScreen from "@screens/main/reading-list";
import CreatePostScreen from "@screens/main/create-post";
import ActivityScreen from "@screens/main/activity";
import ProfileScreen from "@screens/main/profile";

import {
  faHomeAlt,
  faBookmark,
  faPlus,
  faBell,
  faUserAstronaut,
} from "@fortawesome/pro-regular-svg-icons";

export const ROUTE_HOME = "home";
const ROUTE_READING_LIST = "reading-list";
const ROUTE_CREATE_POST = "create-post";
const ROUTE_ACTIVITY = "activity";
const ROUTE_PROFILE = "profile";

const HOME = {
  route: ROUTE_HOME,
  component: HomeScreen,
  icon: faHomeAlt,
  label: "Home",
};

const READING_LIST = {
  route: ROUTE_READING_LIST,
  component: ReadingListScreen,
  icon: faBookmark,
  label: "Reading List",
};

const CREATE_POST = {
  route: ROUTE_CREATE_POST,
  component: CreatePostScreen,
  icon: faPlus,
  label: "Create Post",
};

const ACTIVITY = {
  route: ROUTE_ACTIVITY,
  component: ActivityScreen,
  icon: faBell,
  label: "Activity",
};

const PROFILE = {
  route: ROUTE_PROFILE,
  component: ProfileScreen,
  icon: faUserAstronaut,
  label: "Profile",
};

export const ROUTES = {
  [ROUTE_HOME]: HOME,
  [ROUTE_READING_LIST]: READING_LIST,
  [ROUTE_CREATE_POST]: CREATE_POST,
  [ROUTE_ACTIVITY]: ACTIVITY,
  [ROUTE_PROFILE]: PROFILE,
};

export const MAIN_TABS = [HOME, READING_LIST, CREATE_POST, ACTIVITY, PROFILE];
