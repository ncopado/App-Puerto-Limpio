import React, { Component } from "react";
import { TextInput, View, Image, StyleSheet } from "react-native";
import { APPLE_BLUE_COLOR } from "../../constants";
import {
  EMAIL_INPUT_PLACEHOLDER,
  PASSWORD_INPUT_PLACEHOLDER
} from "../../StringValues/SigninValues";

export default class SignInForm extends Component {
  render() {
    let { onPasswordChange, password, onEmailChange, email } = this.props;
    return (
      <View style={styles.container}>
   

        <TextInput
          style={styles.input}
          value={email}
          placeholder={EMAIL_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          onChangeText={onEmailChange}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={PASSWORD_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="gray"
          onChangeText={onPasswordChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 250,
    alignSelf: "center",
    padding: 16
  },
  input: {
    fontSize: 18,fontFamily:"NeoSansPro-Bold",
    height: 44,
    marginVertical: 8,
    color: "gray",
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,backgroundColor:"white"
  },
  container: {
    flex: 1,padding:16
  },
  baseText: {
    marginTop: 16,
    alignSelf: "center"
  },
  titleText: {
    fontSize: 13
  },
  buttonText: {
    color: APPLE_BLUE_COLOR,
    fontSize: 13
  },
  subcontainer: {
    flex: 1
  }
});
