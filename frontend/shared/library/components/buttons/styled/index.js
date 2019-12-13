import styled from "@emotion/styled";
import SimpleButton from "../simple";
import { WEIGHT } from "../../../../style/typography";
import { WHITE, LAVENDER, FOCUS_LAVENDER } from "../../../../style/colors";

export default styled(SimpleButton)({
  marginTop: 10,
  borderColor: LAVENDER,
  backgroundColor: LAVENDER,
  color: WHITE,
  fontWeight: WEIGHT.BOLD,
  "&:hover": {
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER,
    "&:disabled": {
      borderColor: LAVENDER,
      backgroundColor: LAVENDER
    }
  }
});
