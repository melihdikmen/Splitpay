/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid
} from "react-native";

import SearchBar from "../../components/GroupEdition/SearchBar";
import { observer } from "mobx-react";
import ExpenseStore from "../../stores/ExpenseStore";
import UserCard from "../../components/GroupEdition/UserCard";
import Header from "../../components/Header"
@observer
export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.success=this.success.bind(this)
  }

  success() {
    
    this.props.navigation.navigate("Members");
    ExpenseStore.getMembers();
    ToastAndroid.show("Kulllanıcı başarı ile eklendi", ToastAndroid.LONG);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          onPress={() => {
            navigation.popToTop();
          }}
          disabled={true}
          opacity={0}
         
          title={"Üye Ekle"}
        />
      )
    };
  };

  componentWillMount() {
    ExpenseStore.SearchUser("");
  }


  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.search}>
            <SearchBar
              SearchUser={text => {
                ExpenseStore.SearchUser(text);
              }}
            />
          </View>
          <View style={styles.content}>
            <FlatList
              data={ExpenseStore.getUser}
              renderItem={({ item }) => (
                <UserCard
                path={item.path}
                  fullname={item.fullname}
                  text={"Ekle"}
                  onpress={() => {
                    ExpenseStore.AddMember(item.userId, this.success);
                  }}
                />
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
