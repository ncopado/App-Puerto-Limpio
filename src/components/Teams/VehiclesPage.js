import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import VehicleItem from "./VehicleItem";
import { LIGHT_GRAY } from "../../constants";

export default class VehiclesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}>{this.renderVehiclesList()}</View>;
  }

  renderVehiclesList = () => {
    const { reducer } = this.props;
    const { isLoadingVehicles } = reducer;
    if (isLoadingVehicles) {
      return (
        <ActivityIndicator
          size="large"
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        />
      );
    } else {
      const { vehicles } = reducer;
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={vehicles}
          renderItem={({ item }) => <VehicleItem vehicle={item} />}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LIGHT_GRAY
  }
});