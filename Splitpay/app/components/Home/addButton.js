/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class addButton extends Component {
  render() {
    return (
      <View style={styles.container}>
      
      <Icon name={'plus'} size={25} color={'#000'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight:15,
    justifyContent: 'center',
  },

});
