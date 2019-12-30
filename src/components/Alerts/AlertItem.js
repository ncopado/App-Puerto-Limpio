import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { APPLE_BLUE_COLOR, LIGHT_GRAY } from "../../constants";
import moment from "moment";
export default class AlertItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alert } = this.props;
    const { title, body, timestamp } = alert;
    const date = new Date(timestamp);
    const formattedDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");

    return (
      <View style={styles.container}>
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={require("../../images/Logo2.png")}
        />
        <View style={styles.textContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}> {formattedDate}</Text>
          </View>

          <Text style={styles.body}>{body}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    padding: 8,
    borderWidth: 0.7,
    borderColor: "gray",
    borderRadius: 25
  },
  titleView: {
    justifyContent: "space-between"
  },
  textContainer: { alignSelf: "flex-start", flex: 1,padding:4 },
  title: {
    fontSize: 18,
    flex: 1,
    fontFamily: "NeoSansPro-Bold",
    color: "gray"
  },
  body: { fontSize: 15, fontFamily: "NeoSans-Medium", color: "gray" },
  date: { color: "gray", fontSize: 11, fontFamily: "NeoSans-Medium" }
});
