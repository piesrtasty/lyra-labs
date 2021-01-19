import React, { useContext } from "react";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";

import WordMarkDark from "@assets/images/wordmark-dark.svg";
import WordMarkLight from "@assets/images/wordmark-light.svg";

const WordMark = ({ height = 100, width = 320, style = {} }) => {
  const { isDark } = useContext(ThemeManagerContext);
  const WM = isDark ? WordMarkDark : WordMarkLight;
  return <WM width={width} height={height} style={style} />;
};

export default WordMark;
