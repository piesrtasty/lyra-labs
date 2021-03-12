import React, { useContext } from "react";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";

import WordMarkLogoDark from "@assets/images/wordmark-logo-dark.svg";
import WordMarkLogoLight from "@assets/images/wordmark-logo-light.svg";

const WordMarkLogo = ({ height = 100, width = 320, style = {} }) => {
  const { isDark } = useContext(ThemeManagerContext);
  const WMLogo = isDark ? WordMarkLogoDark : WordMarkLogoLight;
  return <WMLogo width={width} height={height} style={style} />;
};

export default WordMarkLogo;
