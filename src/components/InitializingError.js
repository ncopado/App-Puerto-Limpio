import React, { Component } from "react";
import { SafeAreaView, Text, StyleSheet, Button, View } from "react-native";
import { LIGHT_GRAY } from "../constants";

export default class InitializingError extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>
            Error al inicializar la aplicación,verifica tu conexión a internet
            y vuelve a intentarlo
          </Text>
          <Button
            title="Reintentar"
            onPress={() => {
              this.props.onRetryPress();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  text: { marginBottom: 16 }
});
