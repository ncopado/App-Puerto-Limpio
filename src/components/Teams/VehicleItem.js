import React, { PureComponent } from "react";
import { View, Text, StyleSheet,Image } from "react-native";

export default class VehicleItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { vehicle } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}> {vehicle.nombre} </Text>
        <Image
          style={styles.vehicleImage}
          source={{
            uri:
              "https://www.waste360.com/sites/waste360.com/files/FreightlinerEconicWasteTruck_0.jpg"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 5
  },
  text: { fontSize: 18, fontWeight: '600',},
  vehicleImage: {
    height: 200,    
    borderRadius: 5,
    marginTop: 8
  }
});
