import React, {Fragment} from 'react'
import {Button, View, Text} from 'react-native'
import DataManager from '../DataLayer/DataManager'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProfileScreen from './Profile'
import CalendarScreen from './Calendar'
import MainScreen from './Main'
import HomeScreen from './Home'
import WaterScreen from './Water'

const TabScreen = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        tabBarLabel: 'Главная',
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Активность',
      },
    },
    Water: {
      screen: WaterScreen,
      navigationOptions: {
        tabBarLabel: 'Вода',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Профиль',
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation, screenProps}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state
        let IconComponent = Ionicons
        let iconName
        if (routeName === 'Home') {
          iconName = 'ios-fitness'
        } else if (routeName === 'Profile') {
          iconName = 'ios-body'
        } else if (routeName === 'Main') {
          iconName = 'ios-podium'
        } else if (routeName === 'Water') {
          iconName = 'ios-water'
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2BAB5C',
      inactiveTintColor: 'gray',
    },
  },
)

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
  }
}

export default createAppContainer(TabScreen)
