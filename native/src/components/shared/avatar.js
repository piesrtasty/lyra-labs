import styled from "@emotion/native";

export const AVATAR_SIZE_SMALL = "small";
export const AVATAR_SIZE_LARGE = "large";

const SIZES = {
  [AVATAR_SIZE_SMALL]: 24,
  [AVATAR_SIZE_LARGE]: 85,
};

export const Avatar = styled.Image`
  width: ${(props) => `${SIZES[props.size]}px`};
  height: ${(props) => `${SIZES[props.size]}px`};
  border-radius: 100px;
`;
