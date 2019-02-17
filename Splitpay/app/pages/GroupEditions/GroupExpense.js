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
  ActivityIndicator,
  Alert,
  ToastAndroid,
  RefreshControl
} from "react-native";
import { observer } from "mobx-react";

import Expense from "../../components/GroupEdition/Expense";
import ExpenseStore from "../../stores/ExpenseStore";
import ChatStore from "../../stores/ChatStore"
import AddExpenseButton from "../../components/GroupEdition/AddExpenseButton";

import Header from "../../components/Header";
@observer
export default class GroupExpense extends Component {

  constructor(props)
  { super(props)
    this._onRefresh=this._onRefresh.bind(this)
    this.state = {
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          onPress={() => {
            navigation.popToTop();
          }}
          add={()=>{navigation.navigate("AddExpense")}}
          title={"Harcamalar"}
        />
      )
    };
  };
  componentWillMount() {
    ExpenseStore.setGroupId(this.props.navigation.getParam("id"));
    ChatStore.setGroupId(this.props.navigation.getParam("id"))
    ExpenseStore.getAll();
    ExpenseStore.getMembers()
    ChatStore.getRoomId()
    
    
    
  }

  success() {
    ExpenseStore.getAll();
    ToastAndroid.show("Gider başarıyla silindi.", ToastAndroid.LONG);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    ExpenseStore.getAll();
    this.setState({ refreshing: false });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
          refreshControl={
            <RefreshControl
              tintColor="#ff00ff"
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
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
              <TouchableOpacity
              onPress={()=>{this.props.navigation.navigate("ExpenseDetails"), ExpenseStore.getExpenseDetails(item.expenseId)}}
                onLongPress={() => {
                  Alert.alert(
                    "Gider Silme",
                    "Bu gideri silmek istiyor musunuz?",
                    [
                      {
                        text: "İptal",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      {
                        text: "Sil",
                        onPress: () =>
                          ExpenseStore.deleteExpense(
                            item.expenseId,
                            item.fullname,
                            this.success,
                            
                          )
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
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

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  
  },

  content: {
    flex: 4
    // backgroundColor: "#FFF"
  }
});
