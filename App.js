import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stock from "./pages/stock/Stock";
import Post from "./pages/post/Post";
import Chat from "./pages/chat/Chat";
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

global.Buffer = global.Buffer || require('buffer').Buffer

const cognito = {
  region: "us-west-2",
  userPoolId: "us-west-2_aQzbMt6o7",
  userPoolWebClientId: "7e0f994qine7cq4m0su2e578ne",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  identityPoolId: "us-west-2:d2a3041b-8851-40f1-b8a2-efb7db16c6fb",
};

Amplify.configure(cognito);

function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Helper changed</Text> */}
      {/* <Stock /> */}
      {/* <Post /> */}
      <Chat/>
      {/* <Text>Helper changed123</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});


export default (App);
