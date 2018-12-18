import {
  SwitchNavigator,
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import React, { Component } from "react";

import Icon from "react-native-vector-icons/FontAwesome5";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/Home";
import AuthLoadingScreen from "../pages/AuthLoadingScreen";
import AddGroup from "../pages/AddGroup";
import GroupExpense from "../pages/GroupEditions/GroupExpense";
import AddExpense from "../pages/GroupEditions/AddExpense";
import GroupSettings from "../pages/GroupEditions/GroupSettings";
import Members from "../pages/GroupEditions/Members";
import AddMember from "../pages/GroupEditions/AddMember";
import SettleUp from "../pages/GroupEditions/SettleUp";
import PickPhoto from "../pages/GroupEditions/PickPhoto"



const GroupEdit = createStackNavigator(
  {
    GroupExpense: {
      screen: GroupExpense
    },

    AddExpense: {
      screen: AddExpense
    }
  },
  {}
);

const AuthStack = StackNavigator({
  Login: {
    screen: Login
  },

  Register: {
    screen: Register
  }
});

const MembersStack=StackNavigator({

  Members:{screen:Members,
  
  },

  AddMember:{screen:AddMember}
})

const GroupSettingStack=StackNavigator({

  GroupSettings:{
    screen:GroupSettings,
    navigationOptions: {
      header:null
    }
  },

  

})

const tabs = createBottomTabNavigator(
  {
    GroupEdit: {
      screen: GroupEdit,
      navigationOptions: {
        title: "Harcamalar",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={"money-check-alt"}
            color={tintColor}
            size={focused ? 25 : 20}
          />
        ),
        
      }
    },

    MembersStack: {
      screen: MembersStack,
      navigationOptions: {
        title: "Üyeler",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={"users"} color={tintColor} size={focused ? 25 : 20} />
        )
      }
    },

    SettleUp:{
      screen:SettleUp,
      navigationOptions: {
        title: "Hesaplaş",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={"balance-scale"} color={tintColor} size={focused ? 25 : 20} />
        )
      }
      
    },

    GroupSettingStack: {
      screen: GroupSettingStack,
      navigationOptions: {
        title: "Ayarlar",
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name={"cog"} color={tintColor} size={focused ? 25 : 20} />
        )
      }
    },

   
  },
  {
    navigationOptions: {},
    initialRouteName:'GroupEdit',
    tabBarOptions: {
      activeTintColor: "#ff1443",
      labelStyle: {
        fontSize: 13
      }
    }
  }
);

const AppStack = StackNavigator(
  {
    Home: {
      screen: Home
    },

    AddGroup: {
      screen: AddGroup
    },

    tabs: {
      screen: tabs,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default SwitchNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
