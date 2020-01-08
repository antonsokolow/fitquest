import {createStackNavigator} from 'react-navigation-stack'
import PurchaseScreen from '../../pages/Purchase'

const IAPNavigator = createStackNavigator(
  {
    Purchase: {
      screen: PurchaseScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Purchase',
  },
)

export default IAPNavigator
