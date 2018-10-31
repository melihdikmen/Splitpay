/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View,ToastAndroid,TouchableWithoutFeedback,Keyboard  } from "react-native";
import GroupForm from "../components/groups/GroupForm";
import GroupStore from "../stores/GroupsStore";
import { observer } from "mobx-react";
@observer
export default class AddGroup extends Component {
  constructor(props) {
    super(props);
   this.success=this.success.bind(this)
  }

  success()
  {
   this.props.navigation.navigate("Home")
   ToastAndroid.show("Grup başarı ile oluşturuldu", ToastAndroid.LONG);
   GroupStore.getAll();

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        elevation: 2
      },

      title: "Grup Oluştur",

      headerTitleStyle: {
        marginLeft: 50
      }
    };
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss()}}>
      <View style={styles.container}>
      

        <GroupForm
          store={text => {
            GroupStore.setGroupName(text);
          }}
          
          length={30}
          title={'Grup Adı'}
          placeholder={'Grup Adı'}

        />
        <GroupForm
          store={text => {
            GroupStore.setGroupInfo(text);
          }}
          title={'Grup Bilgisi'}
          placeholder={'Grup Bilgisi'}
         
          length={30}
        />
        <GroupForm
          store={text => {
            GroupStore.setGroupPay(text);
          }}
          keyboard={"numeric"}
          title={'Harcanan Miktar'}
          placeholder={'Miktar'}
 
          
        />
        <TouchableOpacity
          onPress={() => {
            GroupStore.createGroup(this.success);
          }}

          disabled={GroupStore.getEnabled?false:true}

          style={[styles.button, { opacity: GroupStore.getEnabled ? 1 : 0.3 }]}
        >
          <Text style={styles.buttontext}>Oluştur</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>

      
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    //borderTopWidth: 1,
    borderColor: "#ddd"
  },
  button: {
    
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
   backgroundColor: "#ff1443",
    marginTop: 20
  },
  buttontext: {
    fontSize: 25,
    color: "#ffff"
  }
});
