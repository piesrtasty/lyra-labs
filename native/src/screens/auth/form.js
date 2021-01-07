import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  // TextInput,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AuthLayout from "@components/auth/layout";
import Actions from "@components/auth/actions";
import { SafeAreaContainer, SpaceContainer } from "@components/shared";
import { MagicAuthContext } from "@shared/enhancers/magic-auth";
import { LinearGradient } from "@shared/enhancers/linear-gradient";
import TextInput from "@components/shared/text-input";
import { wp } from "@shared/utils";

var styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    display: "flex",
    // justifyContent: "space-between",
  },
  title: {
    marginTop: 40,
    color: "#FFF",
    fontSize: 34,
    // fontFamily: "RobotoSlab-Medium",
    marginBottom: 20,
    textAlign: "center",
  },
  column: {
    width: wp(70),
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    // width: ,
  },
});

const AuthFormScreen = ({ route }) => {
  const { signIn, signOut, isLoggedIn, isLoading } = useContext(
    MagicAuthContext
  );

  const { isSignUp } = route.params;

  const title = `Sign ${isSignUp ? "up" : "in"} with email.`;
  // console.log("params isSignUp", isSignUp);

  const handleOnChange = (text) => {
    // console.log("handleOnChange - text", text);
  };

  const buttonText = isSignUp ? "Sign up" : "Sign in";

  const handlePress = () => {
    // signIn();
    const email = "lukehamiltonmail@gmail.com";
    signIn({ email });
  };

  return (
    <SafeAreaContainer>
      <AuthLayout>
        <Text style={{ color: "#FFFFFF" }}>{buttonText}</Text>
      </AuthLayout>
    </SafeAreaContainer>
  );
};

export default AuthFormScreen;

/* <LinearGradient>
      <SafeAreaView style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.title}>{title}</Text>
          <TextInput />
        </View>
        <Pressable onPress={handlePress}>
          <Text>{buttonText}</Text>
        </Pressable>

        {/* <View style={styles.inputContainer}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => handleOnChange(text)}
            value={"COOL"}
          />
        </View> */
// </SafeAreaView>
// </LinearGradient> */}
