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
export default class ForgetPasswordScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior='padding' 
          enabled 
          keyboardVerticalOffset={23}>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {/* Infos */}
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* Username */}
                  <Item rounded style={styles.itemStyle}>
                    <Ionicons
                      active
                      name='ios-person'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Username'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={value => this.onChangeText('username', value)}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Send Code
                    </Text>
                  </TouchableOpacity>
                  {/* the New password section  */}
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
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus()}}
                      onChangeText={value => this.onChangeText('newPassword', value)}
                    />
                  </Item>
                  {/* Code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Ionicons
                      active
                      name='ios-md-apps'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Confirmation code'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'numeric'}
                      returnKeyType='done'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('authCode', value)}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Confirm the new password
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
    height: 200,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginBottom: 20,
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
    marginBottom: 20,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 600,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
