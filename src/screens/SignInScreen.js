import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  passwordChangedAction,
  emailChangedAction,
  resetAuthAction,
  loginInFirebaseAction
} from "../actions";

import SignInForm from "../components/SignInScreen/SignInForm";
import SignInFooter from "../components/SignInScreen/SigninFooter";
import { MISSING_FIELDS, SIGNIN_SUBMIT_BUTTON_TITLE } from "../StringValues";
import { showOkMessage } from "../AlertMessages";
import { presentSignupScreen } from "../navigation";
import { LIME_GREEN_COLOR } from "../constants";
import ColorButton from "../components/common/ColorButton";
import ForgotPassword from "../components/SignInScreen/ForgotPassword";

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  render = () => {
    const { email, password } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.subcontainer} behavior="padding">
          <View
            style={{
              backgroundColor: "white",
              height: 250,
              flex: 1,
              padding: 16
            }}
          >
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("../images/Logo.png")}
            />
          </View>

          <SignInForm
            onPasswordChange={this.handlePasswordChange}
            onEmailChange={this.handleEmailChange}
            email={email}
            password={password}
          />
        </KeyboardAvoidingView>
        <View>{this.renderButton()}</View>
        <ForgotPassword />
        <SignInFooter onSignupPress={this.showSignUpScreen} />
      </SafeAreaView>
    );
  };

  onSignInPress = () => {
    const { password, email } = this.state;
    if (!password.length || !email.length) {
      this.showMissingFieldsAlert();
    } else {
      this.props.loginInFirebaseAction(email, password);
    }
  };

  showSignUpScreen = () => {
    this.props.resetAuthAction();
    presentSignupScreen();
  };

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator style={styles.indicator} size="large" />;
    }
    return (
      <ColorButton
        title="INICIAR SESIÓN"
        color="orange"
        action={this.onSignInPress.bind(this)}
      />
    );
  };

  showMissingFieldsAlert = () => {
    showOkMessage(null, MISSING_FIELDS, () => {});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: LIME_GREEN_COLOR
  },
  subcontainer: {
    flex: 1
  },
  logo: {
    padding: 16,
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    padding: 16
  }
});

const mapStateToProps = ({ AuthReducer }) => {
  const { password, email, loading, errorDescription } = AuthReducer;
  return { password, email, loading, errorDescription };
};

export default connect(
  mapStateToProps,
  {
    passwordChangedAction,
    emailChangedAction,
    resetAuthAction,
    loginInFirebaseAction
  }
)(SignInScreen);
