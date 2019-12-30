import React, { PureComponent } from "react";
import { Polyline } from "react-native-maps";

export default class UserDistancePolyLine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { vehiclePosition, userPosition } = this.props;
    return (
      <Polyline
        coordinates={[
          {
            latitude: userPosition.latitude,
            longitude: userPosition.longitude
          },
          {
            latitude: vehiclePosition.lat,
            longitude: vehiclePosition.lon
          }
        ]}
        strokeColor="#007AFF"
        rokeWidth={6}
      />
    );
  }
}
