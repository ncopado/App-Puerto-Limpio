import React, { Component } from "react";
import { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import firebase from "react-native-firebase";

export default class VehicleMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { vehicleStatus } = this.props;
    const { latitude, longitude } = vehicleStatus;
    const centerCoordinate = {
      latitude: latitude,
      longitude: longitude
    };

    return (
      <Marker
        key={vehicleStatus.device.id}
        coordinate={centerCoordinate}
        image={require("../../images/logo_puerto_limpio.png")}
        onPress={this.testCallout}
      />
    );
  }

  testCallout = () => {
    const { vehicleStatus } = this.props;
    const { latitude, longitude, device } = vehicleStatus;
    var vehicleRef = firebase
      .database()
      .ref("unidades")
      .child(device.id);

    vehicleRef.once("value", snap => {
      let vehicleData = snap.val();
      openMap({
        latitude: latitude,
        longitude: longitude,
        query: vehicleData.nombre,
        travelType: "walk",
        end: `${latitude},${longitude}`
      });
    });
  };
}
