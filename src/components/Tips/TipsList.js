import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import TipItem from "./TipItem";

export default class TipsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tips } = this.props;
    return (
      <FlatList
        style={styles.flatList}
        data={tips}
        renderItem={({ item }) => <TipItem tip={item} />}
        keyExtractor={(_, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  flatList: {
    width: Dimensions.get("window").width,alignSelf: 'center',
  }
});
