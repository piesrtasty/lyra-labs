import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import {
  BLACK,
  RICE_CAKE,
  SCOPRION,
  FOCUS_LAVENDER
} from "../../shared/style/colors";
import CommentForm from "../comment-form";
import { buildInitialCommentReply } from "../../shared/utils";

const Container = styled("div")({
  width: "100%",
  marginBottom: 20
});

const UserDetails = styled("div")({});

const User = styled("div")({
  display: "flex",
  alignItems: "center"
});

const Avatar = styled("img")({
  height: 30,
  width: 30,
  borderRadius: "50%"
});

const AvatarLink = styled("a")({
  marginRight: 10
});

const DisplayName = styled("a")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  color: BLACK,
  textDecoration: "none"
});

const CommentContainer = styled("div")(
  {
    marginLeft: 13,
    paddingLeft: 24,

    marginTop: 10
  },
  ({ hasReplies = false }) => ({
    borderLeft: `3px solid ${hasReplies ? `${RICE_CAKE}` : "transparent"}`
  })
);

const CommentBody = styled("div")({
  ...BASE_TEXT,
  lineHeight: "20px",
  marginBottom: 10,
  " > a": {
    textDecoration: "none",
    color: FOCUS_LAVENDER,
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const CommentMeta = styled("div")({
  display: "flex",
  " > div": {
    marginRight: 20
  }
});

const ActionButton = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  fontSize: 11,
  fontWeight: WEIGHT.BOLD,
  cursor: "pointer"
});

const Comment = ({
  isReply = false,
  parentCommentId = null,
  comment: {
    id,
    text,
    votesCount,
    replies = [],
    author,
    author: { avatar, username, name }
  }
}) => {
  const renderBody = body => {
    return {
      __html: body.replace(
        /@\[(.+?)\]\((.+?)\)/g,
        `<a href="/@$1" target="_blank" rel="nofollow noopener noreferrer">@$1</a>`
      )
    };
  };
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <Container>
      <UserDetails>
        <User>
          <AvatarLink href={`/@${username}`}>
            <Avatar src={avatar} />
          </AvatarLink>
          <DisplayName href={`/@${username}`}>{name}</DisplayName>
        </User>
      </UserDetails>
      <CommentContainer hasReplies={!isReply && replies.length > 0}>
        <CommentBody dangerouslySetInnerHTML={renderBody(text)} />
        <CommentMeta>
          <ActionButton onClick={() => console.log("clicked upvote")}>
            Upvote{votesCount > 1 && ` (${votesCount})`}
          </ActionButton>
          <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
            {replies.length > 0
              ? `${replies.length} ${
                  replies.length === 1 ? "Reply" : "Replies"
                }`
              : "Reply"}
          </ActionButton>
        </CommentMeta>
        {showReplyForm && (
          <CommentForm
            parentId={parentCommentId ? parentCommentId : id}
            isReply={true}
            initialValue={buildInitialCommentReply(text, author)}
          />
        )}
      </CommentContainer>
    </Container>
  );
};

export default Comment;
