import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  UIManager
} from "react-native";
import SuscriptionData from "./SuscriptionInfo";
import SuscriptionActions from "./SuscriptionActions";
import {
  PRESENT_SUSCRIPTION_SETTINGS_SCREEN,
  PRESENT_VEHICLE_LOCATION_SCREEN,
  PRESENT_COMPOSE_RATE_SCREEN
} from "../../constants";
import {
  presentSuscriptionSettingsScreen,
  presentVehicleLocationScreeen,
  presentRateScreen
} from "../../navigation";
import { showOkMessage } from "../../AlertMessages";
import { connect } from "react-redux";
import { fetchSuscriptionRoleAction } from "../../actions";
import { NOT_ASIGNED_ROLE_TO_SUSCRIPTION_MESSAGE } from "../../StringValues";

import Divider from "react-native-divider";
import SuscriptionItemDeviceLocationMap from "./SuscriptionItemDeviceLocationMap";

class SuscriptionItem extends Component {
  constructor(props) {
    super(props);
    this.getSuscriptionRole();
  }

  
  getSuscriptionRole = () => {
    let { suscription } = this.props;
    this.props.fetchSuscriptionRoleAction(suscription.id, suscription.name);
  };

  render() {
    return <View style={styles.container}>{this.renderData()}</View>;
  }

  renderData = () => {
    const { roleData, mapHeight } = this.props;

    if (roleData) {
      const { errorDescription } = roleData;
      if (errorDescription) {
        return (
          <Text
            style={{ margin: 8, fontFamily: "NeoSans-Medium", color: "gray" }}
          >
            {errorDescription}
          </Text>
        );
      } else {
        const { truckData } = roleData;
        return (
          <View>
            <SuscriptionData data={roleData} />
            <SuscriptionItemDeviceLocationMap
              deviceId={truckData.id}
              mapHeight={mapHeight}
            />
            <SuscriptionActions onButtonPress={this.onButtonPress} />
          </View>
        );
      }
    }
  };

  onButtonPress = type => {
    const { roleData } = this.props;
    const { routeData, truckData } = roleData;

    switch (type) {
      case PRESENT_SUSCRIPTION_SETTINGS_SCREEN:
        presentSuscriptionSettingsScreen(routeData);
        break;
      case PRESENT_VEHICLE_LOCATION_SCREEN:
        presentVehicleLocationScreeen(
          truckData.id,
          routeData.id,
          routeData.name
        );

        break;
      case PRESENT_COMPOSE_RATE_SCREEN:
        presentRateScreen(routeData.name, routeData.id);
        break;
    }
  };

  showNotAsignedRoleMessage = () => {
    showOkMessage(null, NOT_ASIGNED_ROLE_TO_SUSCRIPTION_MESSAGE, () => {});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 5
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

const mapStateToProps = ({ suscriptionsRolesReducer }, ownProps) => {
  let { roles } = suscriptionsRolesReducer;
  let { suscription } = ownProps;
  let roleData = roles[suscription.id];
  return { roleData };
};

export default connect(
  mapStateToProps,
  {
    fetchSuscriptionRoleAction
  }
)(SuscriptionItem);
