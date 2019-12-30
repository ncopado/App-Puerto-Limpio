import React, { PureComponent } from "react";
import { Polygon } from "react-native-maps";
export default class RoutePolygon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { geofence, onPress } = this.props;
    const { fillColor } = geofence;
    const { r, g, b } = fillColor;
 

    const { points } = geofence;

    return (
      <Polygon
        key={geofence.key}
        coordinates={points}
        fillColor={`rgba(${r}, ${g}, ${b}, 0.5)`}
        strokeColor="rgba(0,0,0,0.5)"
        strokeWidth={1}
        tappable={true}
        onPress={() => {
          onPress(geofence);
        }}
      />
    );
  }
}
