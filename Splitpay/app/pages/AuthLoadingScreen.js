import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  toJs
} from 'react-native';
import GroupStore from '../stores/GroupsStore'
import ExpenseStore from '../stores/ExpenseStore';
import ChatStore from '../stores/ChatStore'
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  //AsyncStorage.removeItem("userToken")
  
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
   user=JSON.parse(userToken)
   
   user?GroupStore.setUserId(user.userId):GroupStore.setUserId(-1)
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  ExpenseStore.setFullname(user.fullname,user.userId)
  ChatStore.setUserId(user.userId)

  

  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}