import {
  createStackNavigator,
  getActiveChildNavigationOptions,
} from 'react-navigation-stack'

import React from 'react'
import {Image} from 'react-native'
import HomeScreen from '../../pages/Home'
import TabScreen from '../../pages/TabNavigator'
import ProgramScreen from '../../pages/Program'
import WorkoutScreen from '../../pages/Workout'
import TrainingScreen from '../../pages/Training'
import WorkoutDoneScreen from '../../pages/WorkoutDone'
import DetailsScreen from '../../pages/Details'

TabScreen.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  let headerTitle = routeName
  switch(routeName) {
    case 'Main':
      headerTitle = (
        <Image
          source={require('../../images/logo.png')}
          style={{width: 120, height: 28}}
          resizeMode="cover"
        />
      )
      break
    case 'Home':
      headerTitle = 'Активность'
      break
    case 'Water':
      header = null
      return {header}
      break
    case 'Profile':
      headerTitle = (
        <Image
          source={require('../../images/logo.png')}
          style={{width: 120, height: 28}}
          resizeMode="cover"
        />
      )
      header = null
      return {headerTitle}
      break
    default:
      break
  }

  return {
    headerTitle,
  }
}

const AppNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
        title: '',
      },
    },
    Program: {
      screen: ProgramScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerTintColor: 'white',
      },
    },
    Workout: {
      screen: WorkoutScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerTintColor: 'black',
        title: 'УПРАЖНЕНИЯ',
      },
    },
    Training: {
      screen: TrainingScreen,
    },
    WorkoutDone: {
      screen: WorkoutDoneScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        },
        headerLeft: null,
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
  },
  {
    navigationOptions: ({navigation, screenProps}) => ({
      // you can put fallback values before here, eg: a default tabBarLabel
      ...getActiveChildNavigationOptions(navigation, screenProps),
      // put other navigationOptions that you don't want the active child to
      // be able to override here!
    }),
  },
)

export default AppNavigator
