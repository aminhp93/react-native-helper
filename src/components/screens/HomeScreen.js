import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

import {
  Container,
  Item,
  Input,
  Button,
} from 'native-base';

import ChatService from "../../services/Chat";

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class HomeScreen extends React.Component {
  state = {
    nextMessage: 'No message'
  }
  

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    Auth.signIn("minh@insightdatascience.com", "Miamikki521")
      .then(() => {
        console.log("success");
        ChatService.subscribeToDataChannel(46);
        ChatService.getChatObserver().subscribe(this.onMessage);
      })
      .catch(error => console.log(error));

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    console.log(59, '----------')
  };


  onChangeText = (key, value) => {
    this.message = value
  }

  onMessage = (data, type) => {
    // console.log(data, type);
    if (type === "SEND_MESSAGE") {
      this.sendPushNotification()
      this.setState({
        nextMessage: data.content
      });
    }
  };

  sendMessage = async () => {
    console.log('sendMessage')
    const message = this.message
    const conversationId = 46
    await ChatService.createMessage(conversationId, message)
      .then(res => {
        if (res.data) {
          console.log('sent');
          
        }
      })
      .catch(error => console.log(error))
    this.refs.MessageInput._root.clear()
    this.message = ''
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      AsyncStorage.setItem("PUSH_TOKEN", token)
      console.log('3888888888', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };
  

  sendPushNotification = async () => {
    const token = await AsyncStorage.getItem("PUSH_TOKEN")
    console.log(64, token);
    const message = {
      to: token,
      sound: 'default',
      title: 'New nOtI',
      body: 'You have new message',
      data: { data: 'New Message' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };

  render() {
    const {nextMessage} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <View>
              <Text>{nextMessage}</Text>
            </View>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
           
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item style={styles.itemStyle} rounded>
                    <Input
                      style={styles.input}
                      placeholder='Message Erik'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      ref='MessageInput'
                      // onSubmitEditing={e => {this.refs.MessageInput._root.clear()}}
                      onChangeText={value => this.onChangeText('username', value)}
                    />
                  </Item>
                  
                  <TouchableOpacity onPress={this.sendMessage} style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Send Message</Text>
                  </TouchableOpacity>
                  <Button
              primary
              onPress={() => this.sendPushNotification()}
              >
                <Text> Press to Send Notification </Text>
              </Button>
                </View>
                
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa73b7",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    padding: 20
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
});
