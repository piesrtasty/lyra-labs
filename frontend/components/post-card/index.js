import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import Router, { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import TagList from "../tag-list";
import { MobileContext } from "../../shared/enhancers/mobile-enhancer";
import PostModal from "../post-modal";
import LoginModal from "../../shared/library/components/modals/login";
import { TOP } from "../../shared/library/components/modals/base/portal";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import {
  BLACK,
  GUNSMOKE,
  LILAC,
  WHITE,
  RUBY,
  BLUSH,
  ALABASTER
} from "../../shared/style/colors";

const ACCENT = BLUSH;

export const Container = styled("li")(
  {
    position: "relative",
    listStyleType: "none"
  },
  ({ visible }) => ({
    display: visible ? "block" : "none"
  })
);

export const Body = styled("div")({
  backgroundColor: WHITE,
  "&:hover": {
    backgroundColor: ALABASTER
  },
  padding: 20,
  display: "flex",
  flexDirection: "row",
  borderTop: `1px solid ${LILAC}`,
  cursor: "pointer"
});

const Wrapper = styled("div")({});

const Link = styled("a")({
  textDecoration: "none"
});

export const Thumbnail = styled("img")({
  width: 80,
  height: 80,
  marginRight: 10
});

export const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: WEIGHT.BOLD,
  color: BLACK
});

export const Tagline = styled("div")({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: "20px",
  marginBottom: 12
});

const Footer = styled("div")({
  display: "flex"
});

const VotesWrapper = styled("div")(
  {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: "translateY(-50%)",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ALABASTER
    },
    border: `1px solid ${LILAC}`,
    borderRadius: 3
  },
  ({ upvoted }) => ({
    borderColor: upvoted ? RUBY : LILAC
  })
);

const Votes = styled("div")(
  {
    ...BASE_TEXT,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 74,
    width: 64,
    fontWeight: WEIGHT.BOLD
  },
  ({ upvoted }) => ({
    color: upvoted ? ACCENT : BLACK,
    " > svg": {
      width: 16,
      height: 11,
      marginBottom: 3,
      " > path": {
        fill: upvoted ? ACCENT : BLACK
      }
    }
  })
);

const PostCard = ({
  id,
  slug,
  name,
  tagline,
  description,
  thumbnail,
  tags,
  visible,
  votesCount,
  upvoted
}) => {
  const isMobile = useContext(MobileContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const href = `/posts/${slug}`;

  const tagListRef = useRef();

  useEffect(() => {
    Router.beforePopState(({ url, as, options }) => {
      if (url === "/" && as === "/") {
        setIsOpen(false);
      } else {
        router.push(as, as, { shallow: true });
        return false;
      }
      return true;
    });
  }, [isOpen]);

  const handleClick = e => {
    console.log("target", e.target);
    e.preventDefault();
    const containsClick =
      tagListRef.current && tagListRef.current.contains(e.target);
    console.log("containsClick", containsClick);
    if (!containsClick) {
      router.push(Router.pathname, href, { shallow: true });
      setIsOpen(true);
    }
  };

  const handleDismiss = () => {
    router.push("/", "/", { shallow: true });
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Container visible={visible}>
        <Wrapper>
          <Link href={href} onClick={handleClick}>
            <Body>
              <Thumbnail src={thumbnail} />
              <Content>
                <Name>{name}</Name>
                <Tagline>{tagline}</Tagline>
                <Footer>
                  {tags.length > 0 && (
                    <TagList
                      containerRef={tagListRef}
                      tags={tags}
                      showLogin={() => setShowLoginModal(true)}
                    />
                  )}
                </Footer>
              </Content>
            </Body>
          </Link>
        </Wrapper>
      </Container>
      {isOpen && (
        <PostModal onDismiss={handleDismiss} position={TOP} width={"100%"} />
      )}
      {showLoginModal && (
        <LoginModal onDismiss={() => setShowLoginModal(false)} />
      )}
    </Fragment>
  );
};

PostCard.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  votesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.array,
  visible: PropTypes.bool,
  upvoted: PropTypes.bool
};

export default PostCard;
