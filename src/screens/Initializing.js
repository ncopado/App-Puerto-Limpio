import React from "react";
import { View, StyleSheet } from "react-native";
// import { goToApp, goToAuth } from "../navigation/Tab";
import { goToApp, goToAuth, goToOnboarding } from "../navigation";
import firebase from "react-native-firebase";
import { getFirstLaunch } from "../AsyncStorage";
export default class Initializing extends React.Component {
  async componentDidMount() {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        this.navigate();
      } else {
        goToAuth();
      }
    } catch (err) {
      goToAuth();
    }
  }

  render() {
    return <View style={styles.container} />;
  }

  navigate = async () => {
    try {
      await getFirstLaunch();
      goToApp();
    } catch (error) {
      goToOnboarding();
    }
  };
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
