import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import Stock from "./pages/stock/Stock";
// import Post from "./pages/post/Post";
// import Chat from "./src/pages/chat/Chat";
import Amplify from "aws-amplify";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";
import WelcomeScreen from "./src/components/screens/WelcomeScreen";
import SignInScreen from "./src/components/screens/SignInScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import ForgetPasswordScreen from "./src/components/screens/ForgetPasswordScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import Stock from "./src/pages/stock/Stock";
import { Ionicons } from "@expo/vector-icons";

const cognito = {
  region: "us-west-2",
  userPoolId: "us-west-2_ADCN3Ekv5",
  userPoolWebClientId: "dgrepsn2bmu4oe4qb7t83u8le",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  identityPoolId: "us-west-2:23167bc9-5299-4d43-bb04-5d3cd42f4dab"
};

Amplify.configure(cognito);

// function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Helper changed</Text>
//       {/* <Stock /> */}
//       {/* <Post /> */}
//       {/* <Chat /> */}
//       {/* <Text>Helper changed123</Text> */}
//     </View>
//   );
// }

// export default App;

const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: "Welcome"
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: "SignUp"
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: "SignIn"
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: "ForgetPassword"
    })
  }
});

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Settings: {
    screen: SettingsScreen
  }
});

const AppStackNavigator = createStackNavigator({
  Header: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorrizontal: 10 }}>
            <Ionicons size={24} name="md-menu" />
          </View>
        </TouchableOpacity>
      )
    })
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator,
  Home: HomeScreen,
  Stock: Stock,
  Profile: ProfileScreen,
  Settings: SettingsScreen
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
