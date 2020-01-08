import React from 'react'
import {connect} from 'react-redux'
import {AppEventsLogger} from 'react-native-fbsdk'
import auth from '@react-native-firebase/auth'
import {withFitquestService} from '../hoc'
import {
  profileLoaded,
  subscriptionLoaded,
  waterLoaded,
  workoutsLoaded,
  tariffsLoaded,
} from '../../store/actions'

import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native'

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  componentWillUnmount() {
    this.subscriber && this.subscriber()
  }

  onAuthStateChanged = async user => {
    if (user) {
      // Юзер авторизован
      this.preloadData(user)
        .then(() => {
          this.props.navigation.navigate('App')
        })
        .catch(error => {
          errorManager(error)
        })
    } else {
      // Показываем окно регистрации
      this.preloadTariffs()
        .then(() => {
          this.props.navigation.navigate('Auth')
        })
        .catch(error => {
          errorManager(error)
        })
    }
  }

  preloadData = user => {
    const {fitquestService} = this.props
    fitquestService.firebaseManager.user = user
    return new Promise((resolve, reject) => {
      Promise.all([
        fitquestService.firebaseManager.getCollection('profile'),
        fitquestService.firebaseManager.getDrinkedWater(),
        fitquestService.purchaseManager.getSubs(),
        this.checkSubscription(),
      ])
        .then(([profile, waterLevel, tariffs, subscription]) => {
          if (profile) {
            // Load Profile and water tracker 
          }

          this.props.tariffsLoaded(tariffs)
          this.props.subscriptionLoaded(subscription)
          resolve(subscription)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  preloadTariffs = () => {
    const {fitquestService} = this.props
    return new Promise((resolve, reject) => {
      fitquestService.purchaseManager
        .getSubs()
        .then(tariffs => {
          this.props.tariffsLoaded(tariffs)
          resolve(true)
        })
        .catch(() => {
          reject(false)
        })
    })
  }

  checkSubscription = () => {
    // some secure code was removed
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    water: state.water,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileLoaded: profile => {
      dispatch(profileLoaded(profile))
    },
    subscriptionLoaded: subscription => {
      dispatch(subscriptionLoaded(subscription))
    },
    waterLoaded: water => {
      dispatch(waterLoaded(water))
    },
    workoutsLoaded: workouts => {
      dispatch(workoutsLoaded(workouts))
    },
    tariffsLoaded: tariffs => {
      dispatch(tariffsLoaded(tariffs))
    },
  }
}

export default withFitquestService()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthLoadingScreen),
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
