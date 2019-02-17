import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Text,
  View,
  NetInfo,
  Modal
  
} from "react-native";
import GroupStore from "../stores/GroupsStore";
import ExpenseStore from "../stores/ExpenseStore";
import ChatStore from "../stores/ChatStore";
import ProfileStore from "../stores/ProfileStore";
import LoginStore from "../stores/LoginStore"
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this._bootstrapAsync();
    // AsyncStorage.removeItem("userToken")
    
    NetInfo.isConnected.addEventListener("connectionChange", res => {
      if (res) {
        LoginStore.setNetCheck(false)

        console.warn(LoginStore.netCheck);
      } else {
        LoginStore.setNetCheck(true)


        console.warn(LoginStore.netCheck);
      }
    });
    
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    user = JSON.parse(userToken);

    user ? GroupStore.setUserId(user.userId) : GroupStore.setUserId(-1);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
    ExpenseStore.setFullname(user.fullname, user.userId);
    ChatStore.setUserId(user.userId);
    ProfileStore.set(user);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
         <Modal animationType="slide" visible={LoginStore.netCheck} transparent={true}>
        <View style={{height:20,backgroundColor:"#ff1443",justifyContent:"center",alignItems: 'center',}}>
        <Text style={{color:"white",marginLeft: 5,marginRight: 5,fontSize:13}}>İnternet Bağlantısı Hatası!Aktif bir İnternet bağlantısı yok.</Text>
        </View>
       
        </Modal>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
