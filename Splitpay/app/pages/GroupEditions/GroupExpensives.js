/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Expense from "../../components/GroupEdition/Expense";

import AddExpenseButton from "../../components/GroupEdition/AddExpenseButton";

export default class GroupExpense extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
         
          <TouchableOpacity>
            <Expense />
          </TouchableOpacity>

          <TouchableOpacity>
            <Expense />
          </TouchableOpacity>

          <TouchableOpacity>
            <Expense />
          </TouchableOpacity>
      
        </View>

      
          <AddExpenseButton />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF"
  },

  content:{
    flex:4,
    backgroundColor:'#FFF'
  },
  
});
