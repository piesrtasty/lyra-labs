import React, { useContext } from "react";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTE_READING_LIST } from "@shared/routes";

import BookmarkLight from "@assets/images/bookmark-light.svg";
import BookmarkDark from "@assets/images/bookmark-dark.svg";

const BookmarkIcon = ({ height = 20, width = 16, style = {} }) => {
  const { isDark } = useContext(ThemeManagerContext);
  const Bookmark = isDark ? BookmarkDark : BookmarkLight;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate({
      name: ROUTE_READING_LIST,
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Bookmark width={width} height={height} style={style} />
    </TouchableOpacity>
  );
};

export default BookmarkIcon;
