import React from "react";
import axios from "axios";
import moment from "moment";
import {getFilteredStocksUrl} from '../../utils/request';
import { Alert } from 'react-native';
import { FlatList, View, Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, AppState } from 'native-base';

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      notification: {},
      seconds: 5,
    };

  }

  

  componentDidMount() {
    this.canslimFilter();
  }


  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    console.log(64)
    const message = {
      to: AsyncStorage.getItem("PUSH_TOKEN"),
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes1 here' },
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

  canslimFilter() {
    let today_capitalization_min = 5000000000;
    let percentage_change_in_price_min = 0.01;
    let Date;
    if (moment().format("ddd") === "Sat") {
      Date = moment().subtract(1, "days");
    } else if (moment().format("ddd") === "Sun") {
      Date = moment().subtract(2, "days");
    } else {
      Date = moment();
    }
    const hour = moment().format("HH");
    if (hour >= "00" && hour <= "16") {
      Date = Date.subtract(1, "days");
    }
    Date = Date.format("YYYY-MM-DD");
    axios
      .post(getFilteredStocksUrl(), {
        today_capitalization_min,
        percentage_change_in_price_min,
        Date
      })
      .then(response => {
        // console.log(response);
        // this.gridApi.setRowData(response.data.stocks);
        if (response.data && response.data.stocks) {
            this.setState({
                stockData: response.data.stocks
            })
        }
      
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { stockData } = this.state;
    return (
        <Container>
            <View>
                <Text>Stock</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Origin: {this.state.notification.origin}</Text>
                <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
              </View>
             
              <Button
              primary
              onPress={() => this.sendPushNotification()}
              >
                <Text> Press to Send Notification </Text>
              </Button>

             
            </View>
            <Header />
            <Content>
          <List>
            {
                stockData.map(item => {
                    return (
                        <ListItem thumbnail key={item.Symbol}>
                            <Left>
                                <Thumbnail square source={{ uri: 'Image URL' }} />
                            </Left>
                            <Body>
                                <Text>Sankhadeep</Text>
                                <Text note numberOfLines={1}>{item.Symbol}</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    )
                })
            }
            
          </List>
        </Content>
        </Container>
    );
  }
}
