import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stock from "./pages/stock/Stock";
import Post from "./pages/post/Post";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Helper changed</Text>
      {/* <Stock /> */}
      <Post />
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
