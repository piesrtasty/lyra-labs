import React, { useState, useRef } from "react";
import styled from "@emotion/native";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LottieView from "lottie-react-native";

const ITEMS = [
  {
    title: "Save content from everywhere.",
    description:
      "Save articles, videos and stories from any publication, page or app.",
    subTitle: null,
  },
  {
    title: "Discover what you love.",
    description:
      "Find more of what you already like or discover your next favorite.",
    subTitle: null,
  },
  {
    title: "Earn LYRA and NFT awards.",
    description:
      "Earn tokens and awards for curating content and participating in the community.",
    subTitle: "(coming soon)",
  },
];

const { width: viewportWidth } = Dimensions.get("window");

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(80);
const itemWidth = slideWidth;

const ILLUSTRATION_HEIGHT = 150;

const Item = ({ title, subTitle, description }) => (
  <ItemContainer>
    <LottieContainer>
      <LottieView
        source={require("@assets/animations/jar-of-stars-white.json")}
        autoPlay
        loop
      />
    </LottieContainer>
    <Text style={{ color: "#FFF" }}>{title}</Text>
  </ItemContainer>
);

const Container = styled.View`
  margin-top: 100px;
  border: 1px solid red;
`;

const ItemContainer = styled.View`
  height: 250px;
  border: 1px solid blue;
`;

const LottieContainer = styled.View`
  height: 200px;
  border: 1px solid green;
`;

const Slider = () => {
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      subTitle={item.subTitle}
    />
  );
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

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
        dotColor={"rgba(255, 255, 255, 0.92)"}
        inactiveDotColor={"#1a1917"}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={!!carouselRef}
      />
    </Container>
  );
};

export default Slider;
