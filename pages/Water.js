import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native'
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors'


import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {compose} from '../utils'
import {waterLoaded} from '../store/actions'

import {map, filter} from 'rxjs/operators'
import DeviceInfo from 'react-native-device-info'
import Button from '../components/Button'
import Tara from '../components/Water/Tara'
import WeekCalendar from '../components/Main/WeekCalendar/WeekCalendar'
import TaskBox from '../components/Main/TaskBox'
import WorkoutBox from '../components/Main/WorkoutBox'
import WaterBox from '../components/Main/WaterBox'
import styles from './style'

const moment = require('moment')
require('moment/min/locales.min')
import * as RNLocalize from 'react-native-localize'
moment.locale(RNLocalize.getLocales()[0].languageCode)

class WaterScreen extends Component {
  state = {
    selectedLevel: 100,
    z: 0,
    isButtonDisabled: false,
  }

  constructor(props) {
    super(props)
    this.animatedLevel = new Animated.Value(0)
  }

  componentDidMount() {
    const water = this.props.water.water
    this.animateWater(water.level, water.dailyNorm)

    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
  }

  componentWillUnmount() {
    //this.subscription.unsubscribe()
    this._navListener.remove()
  }

  drinkWater = (selectedLevel, level, dailyNorm) => {
    this.setState({
      isButtonDisabled: true,
    })

    const levelToDrink =
      selectedLevel + level < dailyNorm ? selectedLevel + level : dailyNorm

    if (level < dailyNorm) {
      this.animateWater(levelToDrink, dailyNorm, result => {
        let water = this.props.water.water
        water.level = selectedLevel + level
        this.props.waterLoaded(water)
        this.saveDrinkedWater(selectedLevel)
        this.setState({
          isButtonDisabled: false,
        })
      })
    } else {
      let water = this.props.water.water
      water.level = selectedLevel + level
      this.props.waterLoaded(water)
      this.saveDrinkedWater(selectedLevel)
      this.setState({
        isButtonDisabled: false,
      })
    }
  }

  saveDrinkedWater = level => {
    const {fitquestService} = this.props

    fitquestService.firebaseManager
      .saveWater(level)
      .then(result => {
        debugManager('Вода сохранена:', result)
      })
      .catch(error => {
        errorManager(error)
      })
  }

  animateWater = (level, dailyNorm, callback) => {
    const screenHeight = Dimensions.get('window').height
    const totalHeight = screenHeight * 0.8
    const value = level < dailyNorm ? level : dailyNorm
    const valueToMove = -Math.trunc((totalHeight * value) / dailyNorm)
    const duration = 1500
    Animated.timing(this.animatedLevel, {
      toValue: valueToMove,
      duration: duration,
      useNativeDriver: true,
    }).start(callback)
  }

  selectLevel = level => {
    this.setState({
      selectedLevel: level,
    })
  }

  _start = value => {
    return Animated.parallel([
      Animated.timing(this.animatedLevel, {
        toValue: value,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start()
  }

  render() {
    const {selectedLevel, isButtonDisabled} = this.state
    const {dailyNorm, level} = this.props.water.water
    const screenHeight = Dimensions.get('window').height

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#2BAB5C',
        }}>
        <Animated.Image
          source={require('../components/images/blueWater.png')}
          style={{
            height: 100 + '%',
            width: 100 + '%',
            top: screenHeight * 0.8,
            transform: [
              {
                translateY: this.animatedLevel,
              },
              {rotateZ: this.state.z / 10 + 'rad'},
            ],
          }}
          resizeMode="cover"
        />
        <View style={{position: 'absolute', height: '100%'}}>
          <View
            style={{
              flex: 1,
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.p18, styles.white, styles.fw600, styles.mb]}>
              ВЫПИТО ВОДЫ
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: 'white',
                fontWeight: '800',
                marginBottom: 10,
              }}>
              {level}/{dailyNorm}
            </Text>
            <Text style={[styles.p14, styles.white]}>МИЛЛИЛИТРОВ</Text>
          </View>
          <View style={{paddingBottom: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Tara
                level={100}
                isSelected={this.state.selectedLevel === 100}
                onPress={this.selectLevel}
              />
              <Tara
                level={150}
                isSelected={this.state.selectedLevel === 150}
                onPress={this.selectLevel}
              />
              <Tara
                level={200}
                isSelected={this.state.selectedLevel === 200}
                onPress={this.selectLevel}
              />
              <Tara
                level={250}
                isSelected={this.state.selectedLevel === 250}
                onPress={this.selectLevel}
              />
              <Tara
                level={350}
                isSelected={this.state.selectedLevel === 350}
                onPress={this.selectLevel}
              />
              <Tara
                level={500}
                isSelected={this.state.selectedLevel === 500}
                onPress={this.selectLevel}
              />
              <Tara
                level={1000}
                isSelected={this.state.selectedLevel === 1000}
                onPress={this.selectLevel}
              />
            </ScrollView>
          </View>
          <View style={{padding: 20}}>
            <Button
              text="Выпить воды"
              theme="outline"
              onPress={() => {
                this.drinkWater(selectedLevel, level, dailyNorm)
              }}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    water: state.water,
    credentials: state.credentials,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    waterLoaded: water => {
      dispatch(waterLoaded(water))
    },
  }
}

export default compose(
  withFitquestService(),
  connect(
    mapStateToProps, 
    mapDispatchToProps
  ),
)(WaterScreen)
