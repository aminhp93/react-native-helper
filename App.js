import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stock from "./pages/stock/Stock";
import Post from "./pages/post/Post";
import Chat from "./pages/chat/Chat";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

global.Buffer = global.Buffer || require("buffer").Buffer;

const cognito = {
  region: "us-west-2",
  userPoolId: "us-west-2_ADCN3Ekv5",
  userPoolWebClientId: "dgrepsn2bmu4oe4qb7t83u8le",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  identityPoolId: "us-west-2:23167bc9-5299-4d43-bb04-5d3cd42f4dab"
};

Amplify.configure(cognito);

function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Helper changed</Text> */}
      {/* <Stock /> */}
      {/* <Post /> */}
      <Chat />
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

export default App;
