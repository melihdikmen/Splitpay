/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Image,  } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from '../../config/config'
export default class Groups extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groupPhoto}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: api+"/uploads/group/"+this.props.path+".jpg" }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.groupName}>{this.props.groupName}</Text>
          <Text style={styles.contentText}>{this.props.info}</Text>
        </View>
        <View style={styles.info}>
          <Icon name={"money"} size={18}>
            <Text> {this.props.money}</Text>
          </Icon>
          <Icon style={styles.icon} name={"user"} size={18}>
            <Text> {this.props.count}</Text>
          </Icon>
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
     elevation: 1
  },
  groupPhoto: {
    flex: 3,
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
    color: "#000",
    height:30
  },
  contentText: {
    margin: 10,
    height: 40,
    width: 150,
  },
  info: {
    flex: 2,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: 'center',
   
  },
  icon: {
    marginTop: 25,
    marginRight: 0
  }
});
