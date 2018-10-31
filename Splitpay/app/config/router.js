import {
  createStackNavigator,
  SwitchNavigator,
  StackNavigator
} from "react-navigation";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/Home";
import AuthLoadingScreen from "../pages/AuthLoadingScreen";
import AddGroup from "../pages/AddGroup";
import GroupExpense from "../pages/GroupEditions/GroupExpense"
import AddExpense from "../pages/GroupEditions/AddExpense"

const AuthStack = StackNavigator({
  Login: {
    screen: Login
  },

  Register: {
    screen: Register
  }
});

const GroupEdit = StackNavigator({
  GroupExpense: {
    screen: GroupExpense,
  },

  AddExpense:{
    screen:AddExpense,
    navigationOptions: {
      
    }
  }


  
});

const AppStack = StackNavigator(
  {
    Home: {
      screen: Home
    },

    AddGroup: {
      screen: AddGroup
    },

    GroupEdit: {
      screen: GroupEdit,
      navigationOptions:{
        header:null
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
