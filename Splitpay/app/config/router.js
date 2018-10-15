import { createStackNavigator  } from 'react-navigation'

import Login from '../pages/login'
import Register from '../pages/register'




export default createStackNavigator({
    Login: {
      screen: Login
    },

    Register:{
      screen:Register
    },
   
  });