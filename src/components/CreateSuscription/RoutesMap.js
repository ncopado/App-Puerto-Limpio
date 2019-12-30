import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Polygon, Marker } from "react-native-maps";
import RoutePolygon from "../VehicleLocation/GeofencePolygon";

const RoutesMap = ({ routes, onRoutePress, userLocation }) => {
  const { latitude, longitude } = userLocation;

  const userRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };

  return (
    <MapView
      style={styles.container}
      showsUserLocation={true}
      initialRegion={userRegion}
    >
      {routes.map((geofence, i) => (
        <RoutePolygon key={i} geofence={geofence} onPress={onRoutePress} />
      ))}
    </MapView>
  );
};

export default RoutesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
