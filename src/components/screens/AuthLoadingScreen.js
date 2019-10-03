import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

import Auth from "@aws-amplify/auth";
import { AsyncStorage } from "react-native";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.loadApp();
  }

  loadApp = async () => {
    // Auth.currentAuthenticatedUser()
    //     .then(user => {
    //         this.setState({
    //             userToken: user.signInUserSession.accessToken.jwtToken
    //         })
    //     })
    //     .catch(err => console.log(err))
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text>AuthLoadingScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b44666",
    alignItems: "center",
    justifyContent: "center"
  }
});
