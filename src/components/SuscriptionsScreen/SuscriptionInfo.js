import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import SuscriptionItemDriverData from "./SuscriptionActiveRole";

const SuscriptionData = ({ data }) => {
  const { routeData, driverData, truckData } = data;
  return (
    <View style={styles.container}>
      <SuscriptionItemDriverData
        driverData={driverData}
        truckData={truckData}
      />
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          width: "100%",paddingTop:8
        }}
      />
      <Text numberOfLines={1} style={styles.name}>
        Ruta {routeData.name}
      </Text>
      <Text numberOfLines={3} style={styles.comment}>
        {routeData.comment}
      </Text>
    </View>
  );
};

export default SuscriptionData;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 8
  },
  name: {
    fontSize: 18,
    paddingTop: 8,
    fontFamily: "NeoSansPro-Bold",
    color: "gray"
  },
  comment: {
    fontSize: 10,
    paddingTop: 2,
    fontFamily: "NeoSans-Medium",
    color: "gray"
  }
});
