import React, { useState, useRef } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { DM_SANS_MEDIUM } from "@shared/fonts";

import SaveIllustration from "../../../assets/images/save-illustration.svg";
import DiscoverIllustration from "../../../assets/images/discover-illustration.svg";
import RewardsIllustration from "../../../assets/images/rewards-illustration.svg";

var styles = StyleSheet.create({
  container: {
    // height: 380,
    // marginTop: 100
    // backgroundColor: "red",
  },

  title: {
    fontSize: 32,
  },
  illustration: {
    height: 150,
    width: "100%",
  },
});

const itemStyles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 50,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "rgba(245, 246, 247, .9)",
    // fontFamily: "OpenSauceSans-Bold",
  },
  description: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 13,
    color: "rgba(245, 246, 247, .7)",
    // fontFamily: "OpenSauceSans-Medium",
  },
  subTitle: {
    color: "rgba(245, 246, 247, .9)",
    fontSize: 11,
    marginTop: 3,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

const ITEMS = [
  {
    title: "Save content from everywhere.",
    description:
      "Save articles, videos and stories from any publication, page or app.",
    illustration: SaveIllustration,
    subTitle: null,
  },
  {
    title: "Discover what you love.",
    description:
      "Find more of what you already like or discover your next favorite.",
    illustration: DiscoverIllustration,
    subTitle: null,
  },
  {
    title: "Earn LYRA and NFT awards.",
    description:
      "Earn tokens and awards for curating content and participating in the community.",
    illustration: RewardsIllustration,
    subTitle: "(coming soon)",
  },
];

const { width: viewportWidth } = Dimensions.get("window");

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideWidth = wp(100);
const itemWidth = slideWidth;

const ILLUSTRATION_HEIGHT = 150;

const Item = ({
  title,
  subTitle,
  description,
  illustration: IllustrationComponent,
}) => (
  <View style={itemStyles.container}>
    <IllustrationComponent height={ILLUSTRATION_HEIGHT} width={"100%"} />
    <View style={itemStyles.content}>
      <Text style={{ ...itemStyles.text, ...itemStyles.title }}>{title}</Text>
      {subTitle && <Text style={itemStyles.subTitle}>{subTitle}</Text>}
      <Text style={{ ...itemStyles.text, ...itemStyles.description }}>
        {description}
      </Text>
    </View>
  </View>
);

const SIZE = 90;

const Slider = () => {
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      illustration={item.illustration}
      description={item.description}
      subTitle={item.subTitle}
    />
  );
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Slider;
