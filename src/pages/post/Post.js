// import React from "react";
// import { FlatList, View, Text } from "react-native";
// import axios from "axios";

// export default class Post extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       postData: []
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("http://api-2019.herokuapp.com/api/posts/")
//       .then(response => {
//         if (response.data && response.data.results) {
//           response.data.results.map(item => {
//             item.id = String(item.id);
//             item.key = item.id;
//           });
//           const postData = response.data.results;
//           console.log(postData);
//           this.setState({
//             postData
//           });
//         }
//       })
//       .catch(error => console.log(error));
//   }

//   render() {
//     const { postData } = this.state;
//     return (
//       <View>
//         <Text>Stock</Text>
//         <FlatList
//           data={postData}
//           renderItem={item => {
//             if (item && item.item) {
//               return (
//                 <Text>
//                   {item.item.id} - {item.item.content}
//                 </Text>
//               );
//             }
//           }}
//         />
//       </View>
//     );
//   }
// }
