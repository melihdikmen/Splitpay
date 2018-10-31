/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import api from "../../config/config";

export default class Expense extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            style={styles.image}
            source={{
              uri: api + "/uploads/expense.png"
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.expenseInfo}>
            <Text style={{ fontSize: 25 }}>{this.props.expenseTitle}</Text>
            <Text style={{ fontSize: 10 }}>{this.props.byPaid}</Text>

          </View>

          <View style={styles.expense}>
            <Text style={styles.pay}>{this.props.paid}</Text>
            <Text>{this.props.date}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    //height: 70,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderBottomWidth:1,
    borderBottomColor: '#ddd',

    
  },
  logo: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    marginLeft: 5,
    marginBottom: 5,
  },

  content: {
    flex: 3,
    flexDirection: "row",
   // marginRight: 5
  },

  image: {
    width: 50,
    height: 50
  },

  expenseInfo: {
    flex: 2,
    justifyContent: "center"
  },
  expense: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent:'center',
    marginRight: 5,
  },
  pay: {
    color: "#ff1e4b"
  }
});
