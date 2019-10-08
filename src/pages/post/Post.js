import React from "react";
import { FlatList, View, Text } from "react-native";
import axios from "axios";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: []
    };
  }

    registerForPushNotificationsAsync = async () =>  {
        const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
        return;
        }
    
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
    
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
            value: token,
            },
            user: {
            username: 'Brent',
            },
        }),
        });
    }

  render() {
    const { postData } = this.state;
    return (
      <View>
        <Text>Stock</Text>
        
      </View>
    );
  }
}
