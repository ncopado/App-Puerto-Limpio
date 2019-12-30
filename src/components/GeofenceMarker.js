import React, { Component } from "react";

import  {  Marker } from "react-native-maps";


export default class GeofenceMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { geofence } = this.props;
  
    const center = geolib.getCenter(geofence.points);

   
    

    const centerCoordinate = {
      latitude: center.latitude ,
      longitude: center.longitude
    };

    return (
      <Marker
        key={geofence.name}
        coordinate={centerCoordinate}
        title={geofence.name}
      />
    );
  }
}
