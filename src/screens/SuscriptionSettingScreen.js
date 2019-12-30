import React, { Component } from "react";
import { SafeAreaView, Platform, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import { LIGHT_GRAY } from "../constants";
import NotificationEnabled from "../components/SuscriptionSettings/NotificationEnabled";
import CancelSuscription from "../components/SuscriptionSettings/CancelSuscription";
import firebase from "react-native-firebase";

export default class SuscriptionSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  static get options() {
    if (Platform.OS === "ios") {
      return {
        topBar: {
          leftButtons: [
            {
              id: "Ok",
              text: "Volver",
              fontFamily: "NeoSans-Medium",
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
              id: "Ok",
              text: "Volver",
              fontFamily: "NeoSans-Medium",
              color: "gray"
            }
          ]
        }
      };
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "Ok") {
      this.dismissScreen();
    }
  }

  dismissScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    const { suscription } = this.props;
    const { id } = suscription;

    let userId = firebase.auth().currentUser.uid;
    var suscriptionRef = firebase
      .database()
      .ref("users")
      .child(userId)
      .child("suscriptions")
      .child("geofences")
      .child(id);

    return (
      <SafeAreaView style={styles.container}>
        <NotificationEnabled geofenceId={id} suscriptionRef={suscriptionRef} />
        <CancelSuscription
          geofenceId={id}
          suscriptionRef={suscriptionRef}
          dismiss={this.dismissScreen}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY
  }
});
