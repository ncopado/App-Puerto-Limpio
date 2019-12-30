import React, { Component } from "react";
import { View, Text } from "react-native";

const ColorText = ({ text, color, fontSize }) => {
  return <Text style={{ color, fontSize, textAlign: "center",marginHorizontal:8 }}> {text} </Text>;
};

export default ColorText;
