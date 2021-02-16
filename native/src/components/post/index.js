import React, { useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import styled from "@emotion/native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

const Text = styled.Text`
  color: white;
`;

const SourceLogo = styled.Image`
  height: 25;
  width: 25;
`;

const SourceLogoContainer = styled.View`
  height: 25;
  width: 25;
`;

const postData = {
  logo: "https://logo.clearbit.com/ycombinator.com",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 240,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  image: {
    resizeMode: "contain",
    height: 36,
  },
  titleContainer: {
    width: 300,
    padding: 20,
    justifyContent: "flex-start",
    flex: 2,
  },
  descContainer: {
    width: 300,
    padding: 20,
    flex: 1,
  },
  top: {
    width: 300,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  normalText: {
    fontSize: 18,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  card: {
    height: 400,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  nested: {
    flexDirection: "column",
    marginRight: 20,
  },
});

const Container = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
  border-color: green;
  border-width: 1px;
  ${"" /* width: 100%; */}
  ${"" /* height: 300px; */}
  margin: 25px;
`;

const Logo = styled.View`
  height: 25px;
  border-color: red;
  border-width: 1px;
  width: 25px;
`;

const LeftCol = styled(View)`
  background-color: blue;
  flex-grow: 1;
  ${"" /* width: 200px; */}
`;

const RightCol = styled(View)`
  background-color: red;
  ${"" /* width: 200px; */}
`;

const Post = ({ isLoading = true }) => {
  return (
    <>
      <Container>
        <LeftCol>
          <SkeletonContent
            isLoading={isLoading}
            containerStyle={{}}
            layout={[
              {
                key: "someId",
                // flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                children: [
                  {
                    width: 25,
                    height: 25,
                  },
                  {
                    width: 75,
                    height: 15,
                    marginLeft: 8,
                  },
                ],
              },
              { key: "someOtherId", width: 200, height: 18, marginBottom: 4 },
              { key: "someOtherId", width: 175, height: 18, marginBottom: 10 },
              {
                key: "someId",
                flexDirection: "row",
                alignItems: "center",
                width: 110,
                height: 15,
              },
            ]}
          />
        </LeftCol>
        <RightCol>
          <SkeletonContent
            isLoading={isLoading}
            containerStyle={{ flex: 1 }}
            layout={[
              {
                key: "someId",
                flexGrow: 1,
                justifyContent: "center",
                children: [
                  {
                    key: "someOtherId",
                    width: 90,
                    height: 60,
                  },
                ],
              },
              {
                key: "someId",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                width: 34,
                height: 13,
              },
            ]}
          />
        </RightCol>
        {/* <SkeletonContent
          isLoading={isLoading}
          containerStyle={{ flex: 1, flexGrow: 1, backgroundColor: "red" }}
          layout={[
            { key: "someId", width: 25, height: 25, marginBottom: 6 },
            { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
            { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
          ]}
        ></SkeletonContent>
        <SkeletonContent
          isLoading={isLoading}
          containerStyle={{ backgroundColor: "green" }}
          layout={[
            { key: "someId", width: 25, height: 25, marginBottom: 6 },
            { key: "someOtherId", width: 100, height: 20, marginBottom: 6 },
          ]}
        ></SkeletonContent> */}
      </Container>
    </>
  );
};

const firstLayout = [
  {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  {
    flexDirection: "column",
    marginRight: 10,
    children: [
      {
        width: "100%",
        height: "50%",
        marginBottom: 10,
      },
      {
        width: "50%",
        height: "20%",
        marginBottom: 10,
      },
      {
        width: 100,
        height: 20,
      },
    ],
  },
];
const secondLayout = [
  {
    width: 240,
    height: "20%",
    marginBottom: 20,
  },
  {
    width: "100%",
    height: 60,
  },
];
const thirdLayout = [
  {
    width: 220,
    height: 20,
    marginBottom: 8,
  },
  {
    width: 180,
    height: 20,
  },
];

export default Post;
