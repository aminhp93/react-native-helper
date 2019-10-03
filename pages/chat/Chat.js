import React from "react";
import { FlatList, View, Text } from "react-native";
import axios from "axios";
import ChatService from '../../services/Chat';

export default class Chat extends React.Component {
    state = {

    }

    componentDidMount() {
        Auth.signIn('minh@insightdatascience.com', 'Miamikki521')
            .then(() => {
                console.log('success')
                ChatService.subscribeToDataChannel(35)
                ChatService.getChatObserver().subscribe(this.onMessage)
            })
            .catch(error => console.log(error))
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