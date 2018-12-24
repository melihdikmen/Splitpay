/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
var { height, width } = Dimensions.get("window");
export default class SettingForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
        
        <View style={{justifyContent: 'flex-end',flex:2}}>
        <TextInput
        secureTextEntry={this.props.secureTextEntry}
            onChangeText={this.props.onchange}
          defaultValue={this.props.value}
          underlineColorAndroid={"transparent"}
          style={styles.input}
          placeholder={this.props.placeholder}
        /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
   
  },

  input: {
   
    textAlign: "right",
    // width:300,
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "center",
    marginTop: 5,
    marginRight: 5,
  },

  text: {
    marginLeft: 15,
    fontSize: 18,
    color: "#d8d8d8",
   
  }
});
