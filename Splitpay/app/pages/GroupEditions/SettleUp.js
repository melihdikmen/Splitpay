/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, FlatList, RefreshControl,ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import ExpenseStore from "../../stores/ExpenseStore";
import Header from "../..//components/Header";
import Settling from "../../components/GroupEdition/Settling";

@observer
export default class SettleUp extends Component {
  constructor(props) {
    super(props);
    this._onRefresh = this._onRefresh.bind(this);
    this.state = {
      refreshing: false
    };
  }
  componentWillMount() {
    ExpenseStore.SettleUp();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });

    ExpenseStore.SettleUp();
    this.setState({ refreshing: false });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          onPress={() => {
            this.props.navigation.popToTop();
          }}
          title={"Hesaplaş"}
          disabled={true}
          opacity={0}
        />
        <FlatList
          ListHeaderComponent={() => {
            return ExpenseStore.getSettling ? (
              ExpenseStore.getSettling.length < 1 && (
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
          refreshControl={
            <RefreshControl
              tintColor="#ff00ff"
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={ExpenseStore.getSettling}
          keyExtractor={index => index}
          renderItem={({ item }) => (
            <Settling debtor={item.debtor} payee={item.payee} debt={item.sum} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF"
  }
});
