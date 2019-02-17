/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  FlatList,
  TextInput
} from "react-native";
import Header from "../../components/Header";
import GroupForm from "../../components/groups/GroupForm";
import ExpenseStore from "../../stores/ExpenseStore";
import { observer } from "mobx-react";
import MultiSelect from "react-native-multiple-select";
@observer
export default class AddExpense extends Component {
  commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return val;
  }
  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
  }

  componentWillMount() {
    ExpenseStore.getMembers();
    ExpenseStore.setFirstMember();
  }

  onSelectedItemsChange = selectedItems => {
    ExpenseStore.setSelectedItems(selectedItems);
  };

  success() {
    this.props.navigation.navigate("GroupExpense");
    ExpenseStore.getAll();
    ToastAndroid.show("Kayıt eklendi", ToastAndroid.LONG);
  }

  async tarih() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        mode: "spinner",
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        ExpenseStore.setDate(day + "/" + month + "/" + year);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          onPress={() => {
            navigation.popToTop();
          }}
          title={"Harcama Ekle"}
          disabled={true}
          opacity={0}
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
        <ScrollView style={styles.container}>
          <GroupForm
            title={"İsim"}
            placeholder={"Harcamaya bir isim girin"}
            store={text => {
              ExpenseStore.setExpenseTitle(text);
            }}
          />
          <GroupForm
            title={"Miktar"}
            placeholder={"Harcanan miktarı giriniz"}
            keyboard={"numeric"}
            store={text => {
              ExpenseStore.setPaid(text);
            }}
          />

          <GroupForm
            title={"Tarih"}
            placeholder={"Tarihi seçmek dokunun"}
            onPress={() => {
              this.tarih();
            }}
            editable={false}
            value={ExpenseStore.date}
          />

          <View style={{ flex: 1,borderBottomWidth: 1,borderBottomColor: '#ddd', }}>
            <MultiSelect
              hideTags
              items={ExpenseStore.Members}
              uniqueKey="userId"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={ExpenseStore.selectedItems}
              selectText="Üye Seç"
              searchInputPlaceholderText="Üye Ara"
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="fullname"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Tamam"
            />
          </View>
          <View style={{borderBottomWidth: 1,borderBottomColor: '#ddd',marginTop:10}}>
            <FlatList
              data={ExpenseStore.ExpenseUsers}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row",alignItems: 'center', }}>
                  <Text style={{fontSize:15,marginBottom: 10,marginLeft: 5,}}  >{item.fullname}</Text>
                  <TextInput  placeholder={"Oran giriniz"} style={{marginLeft:10,width:100}} underlineColorAndroid={"transparent"} onChangeText={(text)=>{
                    ExpenseStore.setRatio(text,item.userId)
                  }} />
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              ExpenseStore.addExpenseInfo(this.success);
            }}
            style={styles.button}
          >
            <Text style={styles.text}>Ekle</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1,
    borderRadius: 30,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: "#ff0048"
  },
  text: {
    color: "#ffff",
    fontSize: 20
  }
});
