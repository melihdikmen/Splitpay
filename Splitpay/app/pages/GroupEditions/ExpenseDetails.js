/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Header from "../../components/Header";
import ExpenseStore from "../../stores/ExpenseStore";
import UserCard from "../../components/GroupEdition/UserCard"
export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          disabled={true}
          opacity={0}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title={"Harcama Detayları"}
        />
        <View style={styles.info}>
          <Text style={styles.text1}>Harcama:</Text>
          <Text style={styles.text}>
            {ExpenseStore.details[0].expenseTitle}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text1}>Ödeyen:</Text>
          <Text style={styles.text}>{ExpenseStore.details[0].fullname}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text1}>Miktar:</Text>
          <Text style={styles.text}>{ExpenseStore.details[0].paid}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text1}>Tarih:</Text>
          <Text style={styles.text}>{ExpenseStore.details[0].date}</Text>
        </View>
        <View style={{ flex: 6 }}>
          <FlatList
            data={ExpenseStore.users}
            renderItem={({ item }) => <UserCard fullname={item.fullname} display={"none"}  path={item.path}/>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFF"
  },

  info: {
    height: 50,

    borderBottomWidth: 1,
    borderBottomColor: "#dddd",
    flexDirection: "row",
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center"
  },

  text: {
    marginLeft: 10,
    fontSize: 20
  },
  text1: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20
  }
});
