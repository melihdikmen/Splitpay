/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { observer } from "mobx-react";

import Expense from "../../components/GroupEdition/Expense";
import ExpenseStore from "../../stores/ExpenseStore";
import AddExpenseButton from "../../components/GroupEdition/AddExpenseButton";

import Header from "../../components/Header"

@observer
export default class GroupExpense extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        header:<Header onPress={()=>{navigation.popToTop()}} title={"Harcamalar"}/>,
       
    };
  };
  componentWillMount() {
    ExpenseStore.setGroupId(this.props.navigation.getParam("id"));

    ExpenseStore.getAll();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            ListHeaderComponent={() => {
              return ExpenseStore.getExpenses ? (
                ExpenseStore.getExpenses.length < 1 && (
                  <ActivityIndicator color={"#ff1443"} size={"large"} />
                )
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    marginTop: 10
                  }}
                >
                  <Text style={{ fontSize: 25 }}>Harcama Yok</Text>
                </View>
              );
            }}
            data={ExpenseStore.getExpenses}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Expense
                  expenseTitle={item.expenseTitle}
                  paid={item.paid + " TL"}
                  byPaid={item.fullname}
                  date={item.date}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <AddExpenseButton onPress={()=>{this.props.navigation.navigate("AddExpense")}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF"
  },

  content: {
    flex: 4
    // backgroundColor: "#FFF"
  }
});
