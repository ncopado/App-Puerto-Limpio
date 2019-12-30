import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BorderButton from "./BorderButton";

const ErrorScreen = ({ title, description, retyAction, buttonTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <BorderButton title={buttonTitle} color="gray" action={retyAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    fontSize: 18
  }
});

export default ErrorScreen;
