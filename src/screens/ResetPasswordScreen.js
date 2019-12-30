import React, { Component } from "react";
import { Text, View, Platform, StyleSheet, TextInput } from "react-native";
import { Navigation } from "react-native-navigation";
import ColorButton from "../components/common/ColorButton";
import firebase from "react-native-firebase";
import { showErrorMessage } from "../AlertMessages";
import Loading from "../components/common/Loading";

export default class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, email: "" };
    Navigation.events().bindComponent(this);
  }

  static get options() {
    if (Platform.OS === "ios") {
      return {
        topBar: {
          leftButtons: [
            {
              id: "cancelSuscription",
              text: "Volver",
              fontFamily: "NeoSansPro-Bold",
              color: "gray"
            }
          ]
        }
      };
    }

    if (Platform.OS === "android") {
      return {
        topBar: {
          rightButtons: [
            {
              id: "cancelSuscription",
              text: "Volver",
              fontFamily: "NeoSansPro-Bold",
              color: "gray"
            }
          ]
        }
      };
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "cancelSuscription") {
      this.dismisScreen();
    }
  }

  dismisScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onEmailChange = email => {
    this.setState({ email: email });
  };

  sendResetEmail = () => {
    this.setState({ loading: true });
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ loading: false });
        this.dismisScreen();
      })
      .catch(reason => {
        this.setState({ loading: false });
        this.showErrorAlert();
      });
  };

  showErrorAlert = () => {
    showErrorMessage("El correo proporcionado es incorrecto");
  };

  render() {
    const { email, loading } = this.state;
    if (loading) {
      return <Loading text="Enviando Correo de Recuperación" />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Introduce el correo de recuperación
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder={"Email de recuperación"}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          onChangeText={this.onEmailChange}
        />
        <ColorButton
          title="Enviar Correo de Recuperación"
          color="orange"
          action={this.sendResetEmail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 8 },
  description: {
    fontSize: 30,
    color: "gray",
    fontFamily: "NeoSansPro-Bold"
  },
  text: {
    backgroundColor: "white",
    height: 60,
    borderColor: "gray",
    borderWidth: 0.2,
    marginVertical: 8,
    flexGrow: 1,
    borderRadius: 5,
    padding: 8,
    flexGrow: 1,
    fontFamily: "NeoSans-Medium"
  },
  input: {
    fontSize: 18,
    fontFamily: "NeoSansPro-Bold",
    height: 44,
    marginVertical: 8,
    color: "gray",
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "white"
  }
});
