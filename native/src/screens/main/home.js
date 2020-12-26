import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import LoadingIndicator from "@components/loading-indicator";
import { useQuery, gql } from "@apollo/client";
import { View, Text, StyleSheet, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { getRouteName } from "@shared/utils";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   title: {
//     fontSize: 20,
//     textAlign: "center",
//   },
//   gradient: {
//     flex: 1,
//     // width: 200,
//     // height: 200,
//     // margin: 20,
//   },
// });

// Within your render function

const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

const HomeScreen = () => {
  const { data, error, loading } = useQuery(POSTS_QUERY);
  const [seconds, setSeconds] = useState(0);
  const handleBtnPress = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* <LinearGradient
        start={{ x: START, y: START }}
        end={{ x: END, y: END }}
        colors={colors}
        style={styles.linearGradient}
      >
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </LinearGradient> */}
      {/* <Text>The test component</Text>
      {error && <Text>{JSON.stringify(error)}</Text>}
      {loading && <LoadingIndicator />}
      {!loading && data && (
        <View>
          {data.posts.map((p) => (
            <Text style={{ color: "white" }}>{p.id}</Text>
          ))}
        </View>
      )} */}
    </Layout>
  );
};

export default HomeScreen;
