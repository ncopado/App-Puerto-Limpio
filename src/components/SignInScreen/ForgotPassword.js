import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { APPLE_BLUE_COLOR, YELLOW_COLOR } from "../../constants";
import {
  SUGGEST_USER_TO_SIGNUP_TEXT,
  SIGNUP_TEXT_BUTTON_TITLE
} from "../../StringValues/SigninValues";
import { presentResetPasswordScreen } from "../../navigation";

export default class ForgotPassword extends PureComponent {
  render() {
    return (
      <Text style={styles.baseText}>
        <Text
          onPress={this.presentForgotPasswordScreen}
          style={styles.titleText}
        >
          Olvidé mi Contraseña
        </Text>
      </Text>
    );
  }

  presentForgotPasswordScreen = () => {
    presentResetPasswordScreen();
  };
}

const styles = StyleSheet.create({
  baseText: {
    marginTop: 4,
    alignSelf: "center",
    marginBottom: 4
  },
  titleText: {
    fontSize: 16,
    fontFamily: "NeoSansPro-Bold",
    color: YELLOW_COLOR
  },
  buttonText: {
    color: YELLOW_COLOR,
    fontSize: 16,
    fontFamily: "NeoSansPro-Bold"
  }
});
