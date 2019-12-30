import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { APPLE_BLUE_COLOR } from "../../constants";

const imagePaths = {
  compose: require("../../icons/compose.png"),
  vertequiero: require("../../icons/vertequiero.png")
};

export default class SettingRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, image, action } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            action();
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={imagePaths.vertequiero}
          />
          <Text style={styles.text}> {text} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 5
  },
  text: {
    color: APPLE_BLUE_COLOR,
    fontSize: 18,
    paddingLeft: 4,
    fontFamily: "NeoSans-Medium"
  }
});
