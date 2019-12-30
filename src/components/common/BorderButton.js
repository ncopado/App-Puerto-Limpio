import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const BorderButton = ({ title, color, action }) => {
  return (
    <TouchableOpacity onPress={action}>
      <View
        style={[styles.container, { borderColor: color, borderWidth: 0.5 }]}
      >
        <Text style={[styles.buttonTitle, { color: color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    alignSelf: "center",
    padding: 8
  },
  buttonTitle: { fontSize: 15, fontWeight: "600" }
});

export default BorderButton;
