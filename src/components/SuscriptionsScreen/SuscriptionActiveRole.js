import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import DriverProfileImage from "../common/DriverProfileImage";

const SuscriptionItemDriverData = ({ driverData, truckData }) => {
  const { nombre, photoURL } = driverData;

  var imageUrl;
  if (photoURL) {
    imageUrl = photoURL;
  } else {
    imageUrl =
      "https://pbs.twimg.com/profile_images/947933566679134208/hSNfWT0j_400x400.jpg";
  }

  return (
    <View style={styles.container}>
      <DriverProfileImage imageUri={imageUrl} />
      <View>
        <Text style={styles.driverName}>Operador: {nombre}</Text>
        <Text style={styles.vehicleName}>{truckData.nombre}</Text>
      </View>
    </View>
  );
};

export default SuscriptionItemDriverData;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  driverName: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "NeoSansPro-Bold",
    color: "gray"
  },
  vehicleName: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "NeoSansPro-Light",
    color: "gray"
  }
});
