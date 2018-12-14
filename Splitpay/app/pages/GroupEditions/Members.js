/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import Header from "../../components/Header";
import SearchBar from "../../components/GroupEdition/SearchBar";
import UserCard from "../../components/GroupEdition/UserCard";
import ExpenseStore from "../../stores/ExpenseStore";
import { observer } from "mobx-react";

@observer
export default class Members extends Component {
  componentWillMount() {
    ExpenseStore.getMembers();
  }

  success(){
    ExpenseStore.getMembers()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          onPress={() => {
            navigation.popToTop();
          }}
          add={() => {
            navigation.navigate("AddMember");
          }}
          title={"Üyeler"}
        />
      )
    };
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <FlatList
              data={ExpenseStore.Members}
              renderItem={({ item }) => (
                <UserCard  display={"none"}text={"Sil"} fullname={item.fullname} onpress={()=>{
                  ExpenseStore.DeleteMember(item.userId,this.success)
                }} />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 6,
    backgroundColor: "#fff"
  }
});
