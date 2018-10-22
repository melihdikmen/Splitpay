/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View,Image,TouchableOpacity } from "react-native";

export default class Groups extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groupPhoto}>
          <Image  style={{flex:1}} source={{uri:'http://192.168.1.104/Splitpay/uploads/pay.jpg'}}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.groupName}>{this.props.groupName}</Text>
          <Text style={styles.contentText}>{this.props.info}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "#ff1443",
    margin: 10,
    marginTop: 15,
    flexDirection: "row",
    elevation:1
  },
  groupPhoto: {
    flex: 2,
    backgroundColor: "#ff1443"
  },
  content: {
    flex: 3,
    backgroundColor: "#FFF"
  },
  groupName: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#000"
  },
  contentText: {
    margin: 10,
    height: 40,
    width: 150,
  }
});
