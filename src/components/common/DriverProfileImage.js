import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";
import { APPLE_BLUE_COLOR, LIGHT_GRAY } from '../../constants';

export default class DriverProfileImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { imageUri } = this.props;
    return (
      <Image
        style={styles.driverImage}
        source={{
          uri: imageUri
        }}
      resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: LIGHT_GRAY,
    borderWidth: 1,
    borderColor: APPLE_BLUE_COLOR
  }
});
