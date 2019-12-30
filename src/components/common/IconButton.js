import React, { PureComponent } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { APPLE_BLUE_COLOR } from "../../constants";

const imagePaths = {
  settings: require("../../icons/settings.png"),
  locationpin: require("../../icons/locationpin.png"),
  rate: require("../../icons/rate.png")
};

export default class IconButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { iconName } = this.props;
    const imagePath = imagePaths[iconName];

    return (
      <View style={styles.container}>
        <Image
          style={styles.imageButton}
          resizeMode="contain"
          source={imagePath}
        />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  imageButton: {
    width: 20,
    height: 20,
    margin: 4
  },
  text: { fontSize: 13, color: APPLE_BLUE_COLOR, fontFamily: "NeoSans-Medium" }
});
