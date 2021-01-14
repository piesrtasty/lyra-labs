import React, { useState, useRef, useContext } from "react";
import styled from "@emotion/native";
import { View, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LottieView from "lottie-react-native";
import { ThemeManagerContext } from "@shared/enhancers/theme-manager";
import { MediumHeading, Paragraph, CenterContainer } from "@components/shared";

const ITEMS = [
  {
    title: "Save content from everywhere.",
    description:
      "Save articles, videos and stories from any publication, page or app.",
    subTitle: null,
    animationLight: require("@assets/animations/jar-of-stars-black.json"),
    animationDark: require("@assets/animations/jar-of-stars-white.json"),
  },
  {
    title: "Discover what you love.",
    description:
      "Find more of what you already like or discover your next favorite.",
    subTitle: null,
    animationLight: require("@assets/animations/heart-globe-black.json"),
    animationDark: require("@assets/animations/heart-globe-white.json"),
  },
  {
    title: "Earn LYRA and NFT awards.",
    description:
      "Earn tokens and awards for curating content and participating in the community.",
    subTitle: "(coming soon)",
    animationLight: require("@assets/animations/wallet-black.json"),
    animationDark: require("@assets/animations/wallet-white.json"),
  },
];

const { width: viewportWidth } = Dimensions.get("window");

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(80);
const itemWidth = slideWidth;

const ItemHeading = styled(MediumHeading)`
  margin-top: 35px;
  text-align: center;
`;

const ItemParagraph = styled(Paragraph)`
  margin-top: 12px;
  text-align: center;
`;

const Item = ({ title, subTitle, description, animation }) => (
  <ItemContainer>
    <LottieContainer>
      <LottieView source={animation} autoPlay loop />
    </LottieContainer>
    <CenterContainer>
      <ItemHeading>{title}</ItemHeading>
      <ItemParagraph>{description}</ItemParagraph>
    </CenterContainer>
  </ItemContainer>
);

const Container = styled.View`
  margin-top: 100px;
  ${"" /* border: 1px solid red; */}
`;

const ItemContainer = styled.View`
  height: 300px;
  ${"" /* border: 1px solid blue; */}
  display: flex;
`;

const LottieContainer = styled.View`
  height: 175px;
  ${"" /* border: 1px solid green; */}
`;

const Slider = () => {
  const { isDark, setIsDark } = useContext(ThemeManagerContext);
  const animationKey = `animation${isDark ? "Dark" : "Light"}`;
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      subTitle={item.subTitle}
      animation={item[animationKey]}
    />
  );
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const DOT_SIZE = 10;

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        renderItem={renderItem}
        sliderWidth={slideWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        data={ITEMS}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={ITEMS.length}
        activeDotIndex={activeSlide}
        carouselRef={carouselRef}
        dotColor={"rgba(255, 255, 255, 1)"}
        inactiveDotColor={"rgba(255, 255, 255, .4)"}
        dotStyle={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={!!carouselRef}
      />
    </Container>
  );
};

export default Slider;
