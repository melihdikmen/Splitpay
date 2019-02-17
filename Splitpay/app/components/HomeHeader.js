/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from '../config/config'

export default class HomeHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.back, { opacity: this.props.backOpacity }]}>
          <TouchableOpacity onPress={this.props.onPress}>
           <Icon  name={"user"} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={this.props.add}
          style={[styles.addButton, { opacity: this.props.opacity }]}
        >
          <Icon name={"plus-circle"} size={30} />
        </TouchableOpacity>
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

  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },

  back: {
    justifyContent: "center",
    flex: 1.5,
    marginLeft: 15
  }
});
