import { observable, action, computed, toJS } from "mobx";

import { Alert, ToastAndroid } from "react-native";
import api from "../config/config";
import ChatStore from "./ChatStore"

class ExpenseStore {
  @observable
  groupId = 0;
  @observable
  data = ([] = "");
  @observable members = ([] = "");

  @observable foundUser = ([] = "");
@observable image
  @observable settling=[]=""
  @observable userId = 0;
  @observable
  ExpenseTitle = "";
  @observable
  paid = 0;
  @observable
  date = "";
  @observable
  fullname = "";
  @observable selectedItems = [];
  @observable groupName=""
  @observable groupInfo=""
  @observable path;
  @observable details=[]
  @observable users=[]
  @observable ExpenseUsers=[]
  @observable ratio=1
  @observable payable=[]

  @action setGroupName(text) {
    this.groupName = text;
  }

  @action setRatio(text,userId)
  {
    this.ratio=text
    let cont=false
    if(this.payable!=""){
      this.payable.forEach(element => {
          if(element.userId==userId)
          {
            cont=true
            element.ratio=this.ratio
          }

         
          
    });
          if(!cont)
          {
            this.payable.push({"userId":userId,"ratio":this.ratio})
          }
          


    }


    else{
      this.payable.push({"userId":userId,"ratio":this.ratio})
    }
      
  

    
   

    console.warn(this.payable)
  }

  @action setPath(text){
   
    this.path=text
    
     
  }

  @action setImage(uri)
  {
    this.image=uri
   
  }
  @action setFirstMember() {
    this.selectedItems = [];
    this.selectedItems.push(this.userId);
    this.payable.push({"userId":this.userId,"ratio":this.ratio})
    this.ExpenseUsers=[]
    
   
  }
  
  @action setSelectedItems(items) {
    this.ExpenseUsers=[]
    this.payable=[]
    this.selectedItems= items
    //console.warn(this.selectedItems);

    
    this.getRatio()
 


  }
  
  @action getRatio()
  {
    this.members.forEach(element => {
        
      this.selectedItems.forEach(item => {
         
        if(element.userId==item)
        {
          this.ExpenseUsers.push(element)
         
        }

        
      });
    
  });
  console.warn(this.ExpenseUsers)
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
    console.warn(this.data)
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

  @computed
  get getPath() {
   
    console.warn(this.path)
    return toJS(this.path);
  
  }

  


  @action getExpenseDetails(expenseId)
  { 
    this.users=[]
    this.details=this.data.filter(item=>item.expenseId==expenseId)
    console.warn(this.details)
    
             
    let  usersId=this.details[0].users.split(",")
    console.warn(usersId)
    
      usersId.forEach(element => {
        
          this.members.forEach(item => {
             
            if(element==item.userId)
            {
              this.users.push(item)
             
            }

            
          });
        
      });

    console.warn(this.users)
    
  }

  @action UploadImage(){

    const data=new FormData()
    
    data.append("groupId",this.groupId)
    data.append("photo",{
      uri:this.image,
      type:"image/jpeg",
      name:this.groupId+".jpg"
    })


    fetch(api + "/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          
          this.getGroupSetting();
         
          ToastAndroid.show('Fotoğraf değiştirme işlemi başarılı.', ToastAndroid.SHORT);
          
        } else {
          console.warn("yüklenemedi");
         
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action DeleteMember(userId, success) {

    if(this.data!=[])
    this.data.forEach(element => {
    this.users= element.users.split(",")
    });
    
    
    console.warn(this.users.indexOf(userId))

    if(this.users.indexOf(userId)==-1)
    {

      
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
          ChatStore.DeleteMember(userId)
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

    else{

      Alert.alert(
        'Hata',
        'Üye silinemedi.',
        [
         
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }


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
        .then(response => response.text())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            console.warn(responseJson);
            ChatStore.AddMember(userId)
            success();
          } else {
            Alert.alert(
              'Hata',
              'Üye eklenemedi',
              [
                
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
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
          payable: this.payable
        })
      })
        .then(response => response.text())
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
      Alert.alert(
        'Hata',
        'Boş yer bırakmayın.',
        [
          
          {text: 'Tamam', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
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
          console.warn(responseJson)
          
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
