import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ToastAndroid,
  Modal,
  NetInfo
} from "react-native";
import { observer } from "mobx-react";






import Groups from "../components/Home/groups";
import GroupsStore from "../stores/GroupsStore";
import LoginStore from "../stores/LoginStore"
import HomeHeader from "../components/HomeHeader";


@observer
export default class index extends Component {
  constructor(props) {
    super(props);

    this._onRefresh = this._onRefresh.bind(this);
    this.state = {
      refreshing: false,
      
    };


   
  }

  success = () => {
    GroupsStore.getAll();
    ToastAndroid.show("Grup başarı ile silindi", ToastAndroid.LONG);
  };

  longPress(id, success) {
    Alert.alert(
      "Grubu Sil",
      "Bu grubu silmek istiyor musunuz?",
      [
        {
          text: "İptal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sil", onPress: () => GroupsStore.deleteGroup(id, success) }
      ],
      { cancelable: true }
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    GroupsStore.getAll();
    this.setState({ refreshing: false });
  };
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <HomeHeader
          onPress={() => {
            
         navigation.navigate("ProfileSettings")
          }}
          add={() => {
            navigation.navigate("AddGroup");
          }}
          title={"Gruplar"}
          
        />
      )
    };
  };

  componentWillMount() {
    GroupsStore.getAll();
  }

  render() {
    return (
      <View style={{ backgroundColor: "#FFFF", flex: 1 }}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <Modal animationType="slide" visible={LoginStore.netCheck} transparent={true}>
        <View style={{height:20,backgroundColor:"#ff1443",justifyContent:"center",alignItems: 'center',}}>
        <Text style={{color:"white",marginLeft: 5,marginRight: 5,fontSize:13}}>İnternet Bağlantısı Hatası!Aktif bir İnternet bağlantısı yok.</Text>
        </View>
       
        </Modal>
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor="#ff00ff"
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          ListHeaderComponent={() => {
            return GroupsStore.getGroups ? (
              GroupsStore.getGroups.length < 1 && (
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
                <Text style={{ fontSize: 25 }}>Grup Yok</Text>
              </View>
            );
          }}
          data={GroupsStore.getGroups}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                this.longPress(item.groupId, this.success);
              }}
              onPress={() => {
                this.props.navigation.navigate("GroupExpense", {
                  id: item.groupId
                });
              }}
            >
              <Groups
                groupName={item.groupName}
                info={item.groupInfo}
                count={item.count}
                money={item.groupPay}
                path={item.path}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
