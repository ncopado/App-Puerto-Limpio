import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { APPLE_BLUE_COLOR } from "../../constants";
import {
  EMAIL_INPUT_PLACEHOLDER,
  NAME_INPUT_PLACEHOLDER,
  LAST_NAME_INPUT_PLACEHOLDER,
  PASSWORD_INPUT_PLACEHOLDER,
  CONFIRM_PASSWORD_INPUT_PLACEHOLDER
} from "../../StringValues";

export default class SignupForm extends Component {
  render() {
    let {
      onEmailChange,
      email,
      onNameChange,
      name,
      onLastNameChange,
      lastName,
      onPasswordChange,
      password,
      onConfirmPasswordChange,
      confirmPassword
    } = this.props;
    return (
      <View style={{marginHorizontal:16}}>
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
          value={name}
          placeholder={NAME_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          onChangeText={onNameChange}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          placeholder={LAST_NAME_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          onChangeText={onLastNameChange}
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

        <TextInput
          style={styles.input}
          value={confirmPassword}
          placeholder={CONFIRM_PASSWORD_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="gray"
          onChangeText={onConfirmPasswordChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,fontFamily:"NeoSansPro-Bold",
    height: 44,
    marginVertical: 8,
    color: "gray",
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,backgroundColor:"white"
  },
});
