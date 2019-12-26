import React from "react";
import styled from "@emotion/styled";
import { withPortal } from "./base/portal";
import BaseModal from "./base";

const TestModal = ({ post, progress, onDismiss }) => {
  return <BaseModal onDismiss={onDismiss}>Cool</BaseModal>;
};

export default withPortal(TestModal);
