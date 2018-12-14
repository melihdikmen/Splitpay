/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Settling extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={{ uri: api + "/uploads/avatar.png" }}
            style={styles.image}
          />
          <Text style={styles.person}>{this.props.debtor}</Text>
        </View>
        <View style={{flex:1,alignItems: 'center',}}>
          <Icon name={"arrow-right"}  color={"red"} size={15} />
        </View>

        <View style={styles.logo}>
          <Image
            source={{ uri: api + "/uploads/avatar.png" }}
            style={styles.image}
          />
          <Text style={styles.person}>{this.props.payee}</Text>
        </View>
        <View
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <Text style={styles.debt}>{this.props.debt}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    height: 80,
    backgroundColor: "#ffff",
    marginRight: 10,
    marginLeft: 10,

    //elevation: 2,

    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor:"#ddd"
  },

  person: {
    marginLeft: 5,
    flex: 3,
    fontSize: 12
  },

  logo: {
    backgroundColor: "#FFFF",

    flexDirection: "row",
    alignItems: "center",
    flex: 2
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    flex: 2
  },
  debt: {
    color: "red",
    fontSize: 12
  }
});
