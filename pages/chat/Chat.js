import React from "react";
import { FlatList, View, Text } from "react-native";
import axios from "axios";
import ChatService from '../../services/Chat';

export default class Chat extends React.Component {
    state = {

    }

    componentDidMount() {
        ChatService.subscribeToDataChannel(35)
        ChatService.getChatObserver().subscribe(this.onMessage)
    }

    onMessage = (data, type) => {
        console.log(data, type)
    }

    render() {
        return (
            <View>
                <Text>Chat</Text>
            </View>
        )
    }
}