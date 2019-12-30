import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import IconButton from "../common/IconButton";
import {
  PRESENT_SUSCRIPTION_SETTINGS_SCREEN,
  PRESENT_VEHICLE_LOCATION_SCREEN,
  PRESENT_COMPOSE_RATE_SCREEN
} from "../../constants";
import {
  SUSCRIPTION_CONFIGURE_BUTTON_TITLE,
  SUSCRIPTION_RATE_BUTTON_TITLE,
  SUSCRIPTION_LOCATION_BUTTON_TITLE
} from "../../StringValues/";

export default class SuscriptionActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onButtonPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onButtonPress(PRESENT_SUSCRIPTION_SETTINGS_SCREEN);
          }}
        >
          <IconButton
            title={SUSCRIPTION_CONFIGURE_BUTTON_TITLE}
            iconName="settings"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onButtonPress(PRESENT_COMPOSE_RATE_SCREEN);
          }}
        >
          <IconButton title={SUSCRIPTION_RATE_BUTTON_TITLE} iconName="rate" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onButtonPress(PRESENT_VEHICLE_LOCATION_SCREEN);
          }}
        >
          <IconButton
            title={SUSCRIPTION_LOCATION_BUTTON_TITLE}
            iconName="locationpin"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
