// import React from "react";
// import { FlatList, View, Text } from "react-native";
// import axios from "axios";

// export default class Stock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stockData: []
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("http://localhost:8001/api/stocks/")
//       .then(response => {
//         if (response.data && response.data.results) {
//           response.data.results.map(item => {
//             item.id = String(item.id);
//             item.key = item.id;
//           });
//           const stockData = response.data.results;
//           console.log(stockData);
//           this.setState({
//             stockData
//           });
//         }
//       })
//       .catch(error => console.log(error));
//   }

//   render() {
//     const { stockData } = this.state;
//     return (
//       <View>
//         <Text>Stock</Text>
//         <FlatList
//           data={stockData}
//           renderItem={item => {
//             if (item && item.item) {
//               return <Text>{item.item.Symbol}</Text>;
//             }
//           }}
//         />
//       </View>
//     );
//   }
// }
