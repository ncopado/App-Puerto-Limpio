import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import {
  fetchVehiclesStatusAction,
  resetVehiclesStatusReducerAction
} from "../../actions";
import VehicleMarker from "../NearScreen/VehicleMarker";

class NearVehiclesItemMap extends Component {
  componentDidMount = async () => {
    this.props.fetchVehiclesStatusAction();
  };

  render() {
    const { userLocation, vehiclesStatus } = this.props;
    let { latitude, longitude } = userLocation;


    let userRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    };

    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1, borderRadius: 10 }}
          initialRegion={userRegion}
        >
          {vehiclesStatus.map(vehicleStatus => {
            if (vehicleStatus) {
              return (
                <VehicleMarker
                  key={vehicleStatus.device.id}
                  vehicleStatus={vehicleStatus}
                  x
                />
              );
            }
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: 180, borderRadius: 10 }
});

const mapStateToProps = ({ vehiclesStatusReducer }) => {
  let {
    vehiclesStatus,
    isLoadingDevicesStatus,
    vehiclesStatusErrorMessage,
    vehiclesStatusError
  } = vehiclesStatusReducer;

  return {
    vehiclesStatus,
    isLoadingDevicesStatus,
    vehiclesStatusErrorMessage,
    vehiclesStatusError
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVehiclesStatusAction,
    resetVehiclesStatusReducerAction
  }
)(NearVehiclesItemMap);
