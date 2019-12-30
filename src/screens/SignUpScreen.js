import React, { Component } from "react";
import {
  SafeAreaView,
  Button,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import {
  passwordChangedAction,
  emailChangedAction,
  resetAuthAction,
  createUseraInFirebaseAction,
  confirmPasswordChangedAction,
  lastNameChangedAction,
  nameChangedAction
} from "../actions";
import SignupForm from "../components/SignupScreen/SignupForm";
import { showOkMessage } from "../AlertMessages";
import {
  PASSWORDS_DONT_MATCH,
  MISSING_FIELDS,
  BACK_BUTTON_TITLE,
  SIGNUP_SUBMIT_BUTTON_TITLE
} from "../StringValues";
import { Navigation } from "react-native-navigation";
import { LIME_GREEN_COLOR } from "../constants";
import ColorButton from "../components/common/ColorButton";

const CANCEL_SIGNUP = "cancelSignup";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: ""
    };
    Navigation.events().bindComponent(this);
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleConfirmPasswordChange = confirmPassword => {
    this.setState({ confirmPassword });
  };

  handleNameChange = name => {
    this.setState({ name });
  };

  handleLastNameChange = lastName => {
    this.setState({ lastName });
  };

  static get options() {
    let backButton = {
      id: CANCEL_SIGNUP,
      text: BACK_BUTTON_TITLE
    };
    return {
      topBar:
        Platform.OS === "android"
          ? { rightButtons: [backButton] }
          : { leftButtons: [backButton] }
    };
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === CANCEL_SIGNUP) {
      this.dismissModal();
    }
  };

  render = () => {
    const { name, lastName, email, password, confirmPassword } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.subcontainer} behavior="padding">
          <SignupForm
            onPasswordChange={this.handlePasswordChange}
            onConfirmPasswordChange={this.handleConfirmPasswordChange}
            onEmailChange={this.handleEmailChange}
            onNameChange={this.handleNameChange}
            onLastNameChange={this.handleLastNameChange}
            lastName={lastName}
            name={name}
            password={password}
            email={email}
            confirmPassword={confirmPassword}
          />
          {this.renderButton()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  dismissModal = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator style={styles.indicator} size="large" />;
    }
    return (
      <ColorButton
        title="REGISTRARSE"
        color="orange"
        action={this.onSignUpPress}
      />
    );
  };

  onSignUpPress = () => {
    const { password, email, confirmPassword, name, lastName } = this.state;
    if (
      !password.length ||
      !email.length ||
      !confirmPassword.length ||
      !name.length ||
      !lastName.length
    ) {
      this.showMissingFieldsAlert();
    } else if (password === confirmPassword) {
      this.props.createUseraInFirebaseAction(email, password, name, lastName);
    } else {
      this.showPasswordErrorAlert();
    }
  };

  showPasswordErrorAlert = () => {
    showOkMessage(null, PASSWORDS_DONT_MATCH, () => {});
  };

  showMissingFieldsAlert = () => {
    showOkMessage(null, MISSING_FIELDS, () => {});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: LIME_GREEN_COLOR
  }
});

const mapStateToProps = ({ AuthReducer }) => {
  let {
    password,
    email,
    loading,
    errorDescription,
    confirmPassword,
    lastName,
    name
  } = AuthReducer;
  return {
    password,
    email,
    loading,
    errorDescription,
    confirmPassword,
    lastName,
    name
  };
};

export default connect(
  mapStateToProps,
  {
    passwordChangedAction,
    emailChangedAction,
    resetAuthAction,
    createUseraInFirebaseAction,
    confirmPasswordChangedAction,
    lastNameChangedAction,
    nameChangedAction
  }
)(SignUpScreen);
