import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import { APPLE_BLUE_COLOR, YELLOW_COLOR } from "../../constants";
import {
  SUGGEST_USER_TO_SIGNUP_TEXT,
  SIGNUP_TEXT_BUTTON_TITLE
} from "../../StringValues/SigninValues";

export default class SignInFooter extends PureComponent {
  render() {
    let { onSignupPress } = this.props;
    return (
     
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>¿Aún no tienes una cuenta? </Text>
          <Text style={styles.buttonText} onPress={() => onSignupPress()}>
            {SIGNUP_TEXT_BUTTON_TITLE}
          </Text>
        </Text>
 
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    marginTop: 4,
    alignSelf: "center",marginBottom:4
  },
  titleText: {
    fontSize: 16,fontFamily:"NeoSansPro-Bold",color:"white"
  },
  buttonText: {
    color: YELLOW_COLOR,
    fontSize: 16,fontFamily:"NeoSansPro-Bold"
  }
});
