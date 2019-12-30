import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { fetchAlertsActions } from "../../actions";
import { connect } from "react-redux";
import Loading from '../common/Loading';
import AlertItem from "./AlertItem";
import { LOADING_ALERTS } from "../../StringValues";
class AlerstList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { suscriptions } = this.props;
    this.props.fetchAlertsActions(suscriptions);
  }

  render() {
    return this.renderAlertsList();
  }


  renderAlertsList = () => {
    const { isLoadingAlerts, alerts } = this.props;
    if (isLoadingAlerts) {
      return <Loading text={LOADING_ALERTS} />;
    } else {
      return (
        <FlatList
          style={styles.flatList}
          data={alerts}
          renderItem={({ item }) => <AlertItem alert={item} />}
          keyExtractor={(item, index) => index}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = ({ alertsReducer }) => {

  const { alerts, isLoadingAlerts } = alertsReducer;
  return { alerts, isLoadingAlerts };
};

export default connect(
  mapStateToProps,
  {
    fetchAlertsActions
  }
)(AlerstList);
