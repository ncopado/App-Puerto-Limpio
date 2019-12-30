import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from "react-native";
import DriverItem from "./DriverItem";
import { LIGHT_GRAY } from "../../constants";

export default class DriversPages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}>{this.renderDriversList()}</View>;
  }

  renderDriversList = () => {
    const { reducer } = this.props;
    const { isLoadingDrivers } = reducer;
    if (isLoadingDrivers) {
      return (
        <ActivityIndicator
          size="large"
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        />
      );
    } else {
      const { drivers } = reducer;
      return (
        <FlatList
          keyExtractor={(item, index) => index}
          data={drivers}
          renderItem={({ item }) => <DriverItem driver={item} />}
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
