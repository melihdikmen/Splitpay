/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { observer, inject } from "mobx-react";
import Header from "../../components/Header";
import ChatStore from "../../stores/ChatStore";
import { GiftedChat } from "react-native-gifted-chat";





@observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ChatStore.getRoomId()
    ChatStore.GetAllMessages();
    ChatStore.OnMessage()

  
  }

  
  

  

  

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPress={() => {
            this.props.navigation.popToTop();
          }}
          disabled={true}
          opacity={0}
          title={"Grup Sohbeti"}
        />

        <GiftedChat
          messages={ChatStore.Messages}
         onSend={messages =>{ChatStore.SendMessage(messages )}}
         // onInputTextChanged={text=>{ChatStore.setMessage(text)}}
          user={{
            _id: ChatStore.userId
          }}
          
        />
      </View>
    );
  }
}
