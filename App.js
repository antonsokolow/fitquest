import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import {Transition} from 'react-native-reanimated'
import store from './store/store'
import {Provider} from 'react-redux'
import {FitquestServiceProvider} from './components/fitquest-service-contex'

import DataManager from './DataLayer/DataManager'
import NetworkManager from './DataLayer/NetworkManager'
import PurchaseManager from './DataLayer/PurchaseManager'
import FirebaseManager from './DataLayer/FirebaseManager'

// import moment here
// to workaround locale error
const moment = require('moment')
require('moment/min/locales.min')
import * as RNLocalize from 'react-native-localize'
moment.locale(RNLocalize.getLocales()[0].languageCode)

//import * as RNIap from 'react-native-iap'
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap'

import {
  AppNavigator,
  AuthNavigator,
  AuthLoadingScreen,
  IAPNavigator,
} from './components/navigator'

class App extends React.Component {
  dataManager = new DataManager()
  networkManager = new NetworkManager()
  purchaseManager = new PurchaseManager()
  firebaseManager = new FirebaseManager()

  render() {
    const AppContainer = createAppContainer(
      createAnimatedSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppNavigator,
          Auth: AuthNavigator,
          Purch: IAPNavigator,
        },
        {
          // The previous screen will slide to the bottom while the next screen will fade in
          transition: (
            <Transition.Together>
              <Transition.Out
                type="slide-bottom"
                durationMs={400}
                interpolation="easeIn"
              />
              <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
          ),
        },
        {
          initialRouteName: 'AuthLoading',
        },
      ),
    )

    const value = {
      dataManager: this.dataManager,
      networkManager: this.networkManager,
      purchaseManager: this.purchaseManager,
      firebaseManager: this.firebaseManager,
      moment: moment,
    }
    return (
      <Provider store={store}>
        <FitquestServiceProvider value={value}>
          <AppContainer />
        </FitquestServiceProvider>
      </Provider>
    )
  }
}

export default App
