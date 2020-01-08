import {createStackNavigator} from 'react-navigation-stack'

import RegistrationScreen from '../../pages/Registration'
import AllSetScreen from '../../pages/AllSet'

const AuthNavigator = createStackNavigator(
  {
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        header: null,
      },
    },
    AllSet: {
      screen: AllSetScreen,
      navigationOptions: {
        header: null,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
      },
    },
  },
  {
    initialRouteName: 'Registration',
  },
)

export default AuthNavigator
