import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const ColorButton = ({ title, color, action }) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={[styles.buttonTitle, { color: "white" }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  buttonTitle: { fontSize: 15, fontWeight: "600" }
});

export default ColorButton;
