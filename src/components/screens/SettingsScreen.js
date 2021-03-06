import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  Item,
  Input
} from 'native-base';
export default class SettingsScreen extends React.Component {

  state = {
    password1: '',
    password2: '',
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('AuthLoading');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/*Infos*/}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <View 
                    style={
                      [styles.buttonStyle, {borderRadius: 4, marginBottom: 20}]
                    }>
                    <Text style={styles.buttonText}>Change password</Text>              
                  </View>
                  {/* Old password */}
                  <Item rounded style={styles.itemStyle}>
                    <Ionicons
                      active
                      name='ios-lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Old password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus()}}
                      onChangeText={value => this.onChangeText('password1', value)}
                    />
                  </Item>    
                  {/* New password */}              
                  <Item rounded style={styles.itemStyle}>
                    <Ionicons
                      active
                      name='ios-lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='New password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('password2', value)}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <View 
                    style={
                      {
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        paddingBottom: 100
                      }
                    }
                   />
                  <TouchableOpacity
                    style={
                      [styles.buttonStyle, 
                        {
                          flexDirection: 'row', 
                          justifyContent: 'center'
                        }
                      ]
                    }
                    onPress={() => this.signOut()}>
                    <Ionicons name='md-power' style={{color: '#fff', paddingRight: 10}}/>
                    <Text style={styles.buttonText}>
                      Sign out
                    </Text>
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
    backgroundColor: '#5059ae',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 600,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginTop: 20,
  },
  iconStyle: {
    color: '#fff',
    fontSize: 28,
    marginRight: 15,
    marginLeft: 30,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginTop: 20,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
})
