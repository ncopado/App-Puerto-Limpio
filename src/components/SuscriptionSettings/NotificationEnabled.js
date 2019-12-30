import React, { Component } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import firebase from "react-native-firebase";

export default class NotificationEnabled extends Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Notificaciones</Text>
        <Switch value={this.state.enabled} onValueChange={this.changeStatus} />
      </View>
    );
  }

  changeStatus = async enabled => {
    try {
      this.updateState();
      await this.changeStatusOnFirebase(enabled);
    } catch (err) {
      this.updateState();
    }
  };

  updateState = () => {
    this.setState(previouseState => ({
      enabled: !previouseState.enabled
    }));
  };

  changeStatusOnFirebase = enabled => {
    const { geofenceId, suscriptionRef } = this.props;
    return new Promise(function(resolve, reject) {
      suscriptionRef
        .update({ enabled })
        .then(value => {
          enabled
            ? firebase.messaging().subscribeToTopic(geofenceId)
            : firebase.messaging().unsubscribeFromTopic(geofenceId);
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  };

  getStatusFromFirebase = () => {
    const { suscriptionRef } = this.props;
    return new Promise(function(resolve, reject) {
      suscriptionRef
        .child("enabled")
        .once("value")
        .then(snapshot => {
          enabled = snapshot.val();
          resolve(enabled);
        })
        .catch(reason => {
          reject();
        });
    });
  };

  componentDidMount = async () => {
    const enabled = await this.getStatusFromFirebase();
    this.setState({ enabled });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 18,fontFamily:"NeoSans-Medium",color:"gray"
  }
});
