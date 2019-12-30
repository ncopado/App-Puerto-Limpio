import React, { Component } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Linking } from "react-native";
import { LIGHT_GRAY } from "../constants";
import SettingRow from "../components/SettingsScreen/SettingRow";
import firebase from "react-native-firebase";
import { goToAuth, presentNotificationsPermissionsScreen } from "../navigation";
import {
  VERACRUZ_MUNICIPIO_LINK_PLACEHOLDER,
  VERACRUZ_MUNICIPIO_LINK,
  DATOS_ABIERTOS_LINK,
  DATOS_ABIERTOS_LINK_PLACEHOLDER,
  SIGNOUT_BUTTON_TITLE
} from "../StringValues";

import {
  RemoveCredentials,
  removeFirtLaunch,
  removeFirebaseToken
} from "../AsyncStorage";
import { removeToken } from "../permissions";
import fcmTokenManager, {
  requestNotificationPermissions
} from "../Helpers/Notifications";
import {
  showOkMessage,
  noNotificationsPemissionsAlert
} from "../AlertMessages";

export default class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { notificationsEnabled: true };
  }

  componentDidMount = () => {
    this.checkNotificationsPermissions();
  };

  checkNotificationsPermissions = async () => {
    try {
      await requestNotificationPermissions();
      const tokenManager = new fcmTokenManager();
      tokenManager.verifyLocalToken();
    } catch (error) {
      noNotificationsPemissionsAlert();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SettingRow
            text="Veracruz te Quiero"
            image="vertequiero"
            action={this.openVeracruzMunicipioURL}
          />

          <SettingRow
            text="Datos Abierto"
            image="vertequiero"
            action={this.openDatosAbiertosURL}
          />

          <SettingRow
            text="Decide Veracruz"
            image="vertequiero"
            action={this.openDevideVeracruzURL}
          />
          <SettingRow
            text={SIGNOUT_BUTTON_TITLE}
            image="vertequiero"
            action={this.signout}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  openDatosAbiertosURL = () => {
    Linking.openURL(DATOS_ABIERTOS_LINK);
  };

  openDevideVeracruzURL = () => {
    Linking.openURL("http://decide.veracruzmunicipio.gob.mx/");
  };

  openVeracruzMunicipioURL = () => {
    Linking.openURL(VERACRUZ_MUNICIPIO_LINK);
  };

  signout = async () => {
    try {
      firebase.messaging().unsubscribeFromTopic("noticias-generales");
      await RemoveCredentials();
      await removeFirebaseToken();
      await removeFirtLaunch();
      await this.signoutFromFirebase();
      goToAuth();
    } catch (err) {
    }
  };

  signoutFromFirebase = async () => {
    return new Promise(function(resolve, reject) {
      firebase
        .auth()
        .signOut()
        .then(value => {
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY
  }
});
