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
  Animated,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  Item,
  Input
} from 'native-base';

import ChatService from "../../services/Chat";
import Axios from "axios";

export default class HomeScreen extends React.Component {
  state = {
    nextMessage: 'No message'
  }

  componentDidMount() {
    Axios.get('https://api-2019.herokuapp.com/')
    .then()
    .catch()
    Auth.signIn("minh@insightdatascience.com", "Miamikki521")
      .then(() => {
        console.log("success");
        ChatService.subscribeToDataChannel(46);
        ChatService.getChatObserver().subscribe(this.onMessage);
      })
      .catch(error => console.log(error));
  }

  onChangeText = (key, value) => {
    console.log(key, value)
    this.message = value
    console.log('---------', this.message)
  }

  onMessage = (data, type) => {
    console.log(data, type);
    if (type === "SEND_MESSAGE") {
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
          console.log(res.data);
        }
      })
      .catch(error => console.log(error))
    this.refs.MessageInput._root.clear()
    this.message = ''
  }

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
