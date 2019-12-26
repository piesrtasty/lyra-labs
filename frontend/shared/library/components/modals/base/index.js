import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { MOBILE } from "../../../../style/breakpoints";

const Close = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  zIndex: 1
});

// const Container = styled("div")(
//   {
//     minWidth: 200,
//     borderRadius: 8,
//     boxShadow: "0 3px 25px rgba(0, 0, 0, 0.16)",
//     boxSizing: "border-box",
//     [MOBILE]: {
//       width: "80vw"
//     }
//   },
//   ({
//     theme: {
//       color: { backgroundColor }
//     },
//     width
//   }) => ({
//     width,
//     backgroundColor
//   })
// );

const Container = styled("div")(
  {
    minWidth: 200,
    borderRadius: 8,
    boxShadow: "0 3px 25px rgba(0, 0, 0, 0.16)",
    boxSizing: "border-box",
    position: "relative"
  },
  ({ width }) => ({
    width
  })
);

const BaseModal = ({ children, width, onDismiss }) => {
  return (
    <Container width={width}>
      <Close onClick={onDismiss}>X</Close>
      {children}
    </Container>
  );
};

BaseModal.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
  onDismiss: PropTypes.func
};

export default BaseModal;
