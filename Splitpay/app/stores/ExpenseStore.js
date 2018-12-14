import { observable, action, computed, toJS } from "mobx";

import { Alert, ToastAndroid } from "react-native";
import api from "../config/config";


class ExpenseStore {
  @observable
  groupId = 0;
  @observable
  data = ([] = "");
  @observable members = ([] = "");

  @observable foundUser = ([] = "");
@observable image
  @observable settling=[]
  @observable userId = 0;
  @observable
  ExpenseTitle = "";
  @observable
  paid = 0.0;
  @observable
  date = "";
  @observable
  fullname = "";
  @observable selectedItems = [];
  @observable groupName;
  @observable groupInfo;
  @observable path;

  @action setGroupName(text) {
    this.groupName = text;
  }

  @action setPath(text){
    this.path=text
  }

  @action setImage(uri)
  {
    this.image=uri
    alert(this.image)
  }
  @action setFirstMember() {
    this.selectedItems = [];
    this.selectedItems.push(this.userId);
  }
  @action setSelectedItems(items) {
    this.selectedItems = items;
    console.warn(this.selectedItems);
  }

  @action setGroupInfo(text) {
    this.groupInfo = text;
  }

  @action
  setGroupId(id) {
    this.groupId = id;
  }
  @action
  setFullname(fullname, userId) {
    this.fullname = fullname;
    this.userId = userId;
  }

  @action
  setExpenseTitle(text) {
    this.ExpenseTitle = text;
  }

  @action
  setPaid(text) {
    this.paid = text;
  }

  @action
  setDate(text) {
    this.date = text;
  }

  @computed
  get getExpenses() {
    return this.data;
  }

  @computed
  get getSettling() {
    return  toJS(this.settling)
  }

  @computed
  get Members() {
    return toJS(this.members);
  }

  @computed
  get getUser() {
    return this.foundUser;
  }

  @action DeleteMember(userId, success) {
    fetch(api + "/deleteMember", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          success();
          console.warn(responseJson);
        } else {
          Alert.alert(
            "Hata",
            "Üye silinemedi.Bir hata oluştu.",
            [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          this.getMembers();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action AddMember(userId, success) {
    control = true;
    this.members.map(item => {
      item.userId == userId ? (control = false) : control;
    });

    if (control) {
      fetch(api + "/addMember", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          groupId: this.groupId
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            console.warn(responseJson);
            success();
          } else {
            alert("üye eklenemdi");
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert(
        "Hata",
        "Kullanıcı zaten bu gruba üye",
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  @action SearchUser(text) {
    fetch(api + "/SearchMember", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: text
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          console.warn(responseJson);
          this.foundUser = responseJson;
        } else {
          this.foundUser = "";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action getMembers() {
    fetch(api + "/getMembers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          console.warn(responseJson);

          this.members = responseJson;
        } else {
          this.members = "";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action
  addExpenseInfo(success) {
    if (this.ExpenseTitle && this.paid && this.date) {
      fetch(api + "/AddExpense", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          groupId: this.groupId,
          expenseTitle: this.ExpenseTitle,
          paid: this.paid,
          fullname: this.fullname,
          date: this.date,
          users: this.selectedItems,
          userId: this.userId,
          payable: this.paid / this.selectedItems.length
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            console.warn(responseJson);
            success();
          } else {
            this.data = "";
            Alert.alert(
              "Hata",
              "Eklenemedi",
              [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert("boş bırakmayınız");
    }
  }

  @action
  getAll() {
    fetch(api + "/getExpenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          this.data = responseJson;
        } else {
          this.data = "";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action
  deleteExpense(expenseId, fullname, success) {
    if (this.fullname == fullname) {
      fetch(api + "/deleteExpense", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          expenseId: expenseId,
          groupId: this.groupId
        })
      })
        .then(response => response.text())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            console.warn(responseJson)
            success();
          } else {
            console.warn(responseJson);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert(
        "Hata",
        "Silinemedi.Sadece ekleyen kişi silebilir.",
        [{ text: "Tamam", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  @action UpdateGroupSetting() {
    fetch(api + "/UpdateGroupInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupName: this.groupName,
        groupInfo: this.groupInfo,
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          ToastAndroid.show(
            "Ayarlar başarı ile güncellendi.",
            ToastAndroid.LONG
          );
          console.warn(responseJson);
        } else {
          console.warn(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action getGroupSetting(success) {
    fetch(api + "/getGroupInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          this.setGroupInfo(responseJson[0].groupInfo);
          this.setGroupName(responseJson[0].groupName);
          this.setPath(responseJson[0].path);

        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action SettleUp() {
    this.getMembers()
    this.settling=[]
    fetch(api + "/getSummary", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          responseJson.forEach(element => {
            element.toplam = element.paid - element.payable
            
          });

          responseJson.forEach(element => {
            if(element.toplam<0){
              
              for(let item of responseJson)
               {
                if(item.toplam>0)
                {
                  if(element.toplam+item.toplam<0){
                    
                   
                  // console.warn(element.userId+" "+item.userId+" "+(item.toplam))             
                    debtor=this.members.filter(member=>member.userId==element.userId)
                    payee=this.members.filter(member=>member.userId==item.userId)
                    this.settling.push({"debtor":debtor[0].fullname,"payee":payee[0].fullname,"sum":item.toplam.toFixed(2)})
                    element.toplam+=item.toplam
                    item.toplam=0
                    //item alınacak
                  }

                  else if(element.toplam+item.toplam>0)
                  {
                    //console.warn(element.userId+" "+item.userId+" "+(-element.toplam))        
                    debtor=this.members.filter(member=>member.userId==element.userId)
                    payee=this.members.filter(member=>member.userId==item.userId)
                    this.settling.push({"debtor":debtor[0].fullname,"payee":payee[0].fullname,"sum":(-element.toplam.toFixed(2))})     
                    item.toplam+=element.toplam
                    element.toplam=0
                    break;
                    
                    //element
                  }

                  else if(element.toplam+item.toplam==0){
                    //console.warn(element.userId+" "+item.userId+" "+item.toplam)
                    debtor=this.members.filter(member=>member.userId==element.userId)
                    payee=this.members.filter(member=>member.userId==item.userId)
                    this.settling.push({"debtor":debtor[0].fullname,"payee":payee[0].fullname,"sum":item.toplam.toFixed(2)})

                    item.toplam=0
                    element.toplam=0
                    break
                 
                    //item
                  }

                  
                

                }

               
                
              };
            }
          });
          console.warn(this.settling)
        } else {
          this.settling=""
        }
      })
      .catch(error => {
        console.error(error);
      });
  }





}

export default new ExpenseStore();
