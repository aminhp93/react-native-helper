import React from "react";
import { FlatList, View, Text } from "react-native";
import axios from "axios";
import ChatService from "../../services/Chat";

export default class Chat extends React.Component {
  state = {
    chatText: "No message"
  };

  componentDidMount() {
    Auth.signIn("minh@insightdatascience.com", "Miamikki521")
      .then(() => {
        console.log("success");
        ChatService.subscribeToDataChannel(103);
        ChatService.getChatObserver().subscribe(this.onMessage);
      })
      .catch(error => console.log(error));
  }

  onMessage = (data, type) => {
    console.log(data, type);
    if (type === "SEND_MESSAGE") {
      this.setState({
        chatText: data.content
      });
    }
  };

  render() {
    return (
      <View>
        <Text>{this.state.chatText}</Text>
      </View>
    );
  }
}
