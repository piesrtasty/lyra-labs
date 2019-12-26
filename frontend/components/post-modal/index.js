import React from "react";
import styled from "@emotion/styled";
import Post, { TOP } from "../post";

import BaseModal from "../../shared/library/components/modals/base";
import { withPortal } from "../../shared/library/components/modals/base/portal";

const PostModal = ({ post, onDismiss }) => {
  return (
    <BaseModal onDismiss={onDismiss} width={"100%"}>
      <Post />
    </BaseModal>
  );
};

export default withPortal(PostModal);
