/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, Image, View } from "react-native";

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
              uri: "http://192.168.1.104/Splitpay/uploads/expense.png"
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.expenseInfo}>
            <Text style={{fontSize:20}}>Ulaşım Masrafları </Text>
          </View>

          <View style={styles.expense}>
            <Text style={styles.pay}>1000.00 TL</Text>
            <Text>Melih Dikmen</Text>
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
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    elevation: 5
  },
  logo: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    marginLeft: 5
  },

  content: {
    flex: 3,
    flexDirection: "row",
    marginRight:5
  },

  image: {
    width: 70,
    height: 70
  },

  expenseInfo: {
    flex: 2,
    justifyContent:'center'
  },
  expense: {
    flex: 1
  },
  pay:{
    color:'#ff1e4b'
  }
});
