import React from "react";
import axios from "axios";
import moment from "moment";
import {getFilteredStocksUrl} from '../../utils/request';
import { FlatList, View, Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    };
  }

  componentDidMount() {
    this.canslimFilter();
  }

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
        console.log(response);
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
