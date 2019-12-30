import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "react-native-firebase";
import { showOkMessage } from "../../AlertMessages";

export default class CancelSuscription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.cancelButtonPressed();
          }}
        >
          <View>
            <Text style={styles.text}> Cancelar Suscripción</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  cancelButtonPressed = async () => {
    try {
      await this.removeUserSuscriptionFromFirebase();
      showOkMessage("Se ha cancelado la suscripción", null, () => {
        this.props.dismiss();
      });
    } catch (err) {
 
    }
  };

  removeUserSuscriptionFromFirebase = () => {
    const { suscriptionRef, geofenceId } = this.props;
    return new Promise((resolve, reject) => {
      suscriptionRef
        .remove()
        .then(value => {
          firebase.messaging().unsubscribeFromTopic(geofenceId);
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  };
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", padding: 8, margin: 8,borderRadius: 5 },
  text: {
    color: "red",fontSize:16,alignSelf: 'center',fontFamily:"NeoSans-Medium",
  }
});
