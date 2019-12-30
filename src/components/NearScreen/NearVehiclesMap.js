import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Polygon, Marker } from "react-native-maps";
import VehicleMarker from "./VehicleMarker";
import { connect } from "react-redux";
import {
  getUserLocationAction,
  resetUserLocationReducerActions
} from "../../actions";
import Loading from "../common/Loading";
import { showOkMessage } from "../../AlertMessages";
export default class NearVehiclesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.renderMap();
  }

  renderMap = () => {
    let { vehiclesStatus, userLocation } = this.props;

    let { latitude, longitude } = userLocation;

    let userRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    };

    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={userRegion}
      >
        {vehiclesStatus.map(vehicleStatus => {
          return (
            <VehicleMarker
              key={vehicleStatus.device.id}
              vehicleStatus={vehicleStatus}
              x
            />
          );
        })}
      </MapView>
    );
  };

  componentDidUpdate = () => {
    let {
      locationError,
      resetUserLocationReducerActions,
      dismisScreen
    } = this.props;
    if (locationError) {
      showOkMessage(
        "Error",
        "No pudimos obtener tu ubicación actual,verifica los permisos o tu conexión a internet,y vuelve a intentarlo ",
        () => {
          resetUserLocationReducerActions();
          dismisScreen();
        }
      );
    }
  };
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "transparent",
    ...StyleSheet.absoluteFillObject
  }
});
