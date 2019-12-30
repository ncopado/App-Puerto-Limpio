import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import DriverProfileImage from "../common/DriverProfileImage";

export default class DriverItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { driver } = this.props;
    const imageUrl = `https://randomuser.me/api/portraits/thumb/men/${
      driver.id
    }.jpg`;
    return (
      <View style={styles.container}>
        <DriverProfileImage imageUri={imageUrl} />
        <Text style={styles.text}> {driver.nombre} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 5
  },
  text: { fontSize: 18, marginHorizontal: 8, fontWeight: "600" }
});
