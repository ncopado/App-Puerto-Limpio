import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  requestLocationPermissions,
  getUserLocation
} from "../../Helpers/UserLocation";
import Loading from "../common/Loading";
import NearVehiclesItemMap from "./NearVehiclesItemMap";

export default class NearVehiclesItem extends Component {
  constructor(props) {
    super(props);
    this.state = { userLocation: null, loading: true };
    this.getUserLocation();
  }

  getUserLocation = async () => {
    try {
      await requestLocationPermissions();
      const userLocation = await getUserLocation();
      this.setState({ userLocation: userLocation, loading: false });

      // presentNearScreen(userLocation);
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
        {/* <Text> Cerca we </Text> */}
      </View>
    );
  }

  renderMap = () => {
    const { loading, userLocation } = this.state;
    if (loading) {
      return <Loading text="Cargando"> </Loading>;
    } else {
      if (userLocation) {
        return <NearVehiclesItemMap userLocation={userLocation} />;
      }
      return <Text style={{ margin: 8 }}>Sin Servicios De Localización</Text>;
    }
  };
}

const styles = StyleSheet.create({
  container: { margin: 8, borderRadius: 10, backgroundColor: "white" }
});
