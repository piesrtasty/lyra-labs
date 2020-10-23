import React from "react";
import {
  FlatList,
  View,
  Dimensions,
  Platform,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { DM_SANS_REGULAR, DM_SANS_MEDIUM, DM_SANS_BOLD } from "@shared/fonts";

import SaveIllustration from "../../../assets/images/save-illustration.svg";
import DiscoverIllustration from "../../../assets/images/discover-illustration.svg";
// import EarnIllustration from "../../../assets/images/earn-illustration.svg";
import RewardsIllustration from "../../../assets/images/rewards-illustration.svg";

var styles = StyleSheet.create({
  container: {
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
  },
  itemWrapper: {
    // marginVertical: 8,
    // marginHorizontal: 16,
    // height: 200,
  },
  title: {
    fontSize: 32,
  },
  illustration: {
    height: 200,
    width: "100%",
  },
});

const itemStyles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 40,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },
  text: {},
  title: {
    fontSize: 17,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "OpenSauceSans-Bold",
  },
  description: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 14,
    color: "rgba(255, 255, 255, .8)",
    fontFamily: DM_SANS_MEDIUM,
  },
  subTitle: {
    color: "rgba(255, 255, 255, .8)",
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

const IS_IOS = Platform.OS === "ios";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const wp = (percentage) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

const slideHeight = viewportHeight * 0.36;
const itemHorizontalMargin = wp(2);

// const slideWidth = wp(75);
const slideWidth = wp(100);
// const itemWidth = slideWidth + itemHorizontalMargin * 2;
const itemWidth = slideWidth;

const entryBorderRadius = 8;

const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#B721FF",
  background2: "#21D4FD",
};

const sliderStyles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white",
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  titleEven: {
    color: "white",
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: "italic",
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});

const ILLUSTRATION_HEIGHT = 200;

const Item = ({
  title,
  subTitle,
  description,
  illustration: IllustrationComponent,
}) => {
  // console.log("item", item);
  return (
    <View style={itemStyles.container}>
      {/* <SaveIllustration height={ILLUSTRATION_HEIGHT} width={"100%"} /> */}
      <IllustrationComponent height={ILLUSTRATION_HEIGHT} width={"100%"} />
      <View style={itemStyles.content}>
        {/* <View style={itemStyles.titleContainer}> */}
        <Text style={{ ...itemStyles.text, ...itemStyles.title }}>{title}</Text>
        {subTitle && <Text style={itemStyles.subTitle}>{subTitle}</Text>}
        {/* </View> */}

        <Text style={{ ...itemStyles.text, ...itemStyles.description }}>
          {description}
        </Text>
      </View>
      {/* <Text style={styles.title}>{title}</Text> */}
    </View>
  );
};

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
  return (
    <View style={styles.container}>
      <Carousel
        renderItem={renderItem}
        // sliderWidth={slideWidth}
        sliderWidth={slideWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        // containerCustomStyle={sliderStyles.slider}
        // contentContainerCustomStyle={sliderStyles.sliderContentContainer}
        // ref={c => this._slider1Ref = c}
        data={ITEMS}
      />
    </View>
  );
};

export default Slider;
