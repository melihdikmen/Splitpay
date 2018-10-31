/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class AddExpense extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              source={require("../../node_modules/react-navigation/src/views/assets/back-icon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: "#fff",
    elevation: 1,

    flexDirection: "row"
  },
  title: {
    justifyContent: "center",
    flex: 2
  },

  titleText:{
    fontSize:20,
    fontWeight: 'bold',
    color:'#000'
  },

  back: {
    justifyContent: "center",
    flex: 1,
    marginLeft:15
  }
});
