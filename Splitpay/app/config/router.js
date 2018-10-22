import {
  createStackNavigator,
  SwitchNavigator,
  StackNavigator
} from "react-navigation";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/Home";
import AuthLoadingScreen from "../pages/AuthLoadingScreen";

const AuthStack = StackNavigator(
  {
    Login: {
      screen: Login
    },

    Register: {
      screen: Register
    }
  },
 
);

const AppStack = StackNavigator({
  Home: {
    screen: Home
  }
});

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
