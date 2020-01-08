/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, Image, Text} from 'react-native'
import styles from '../pages/style'
import Button from './Button'

export default class WorkoutItem extends Component {
  render() {
    const {navigation, data, isEnabled} = this.props
    const {id, description, duration, level, sort, done} = data
    if (done) {
      return <WorkoutDone data={data} navigation={navigation} />
    } else if (isEnabled) {
      return <WorkoutActive data={data} navigation={navigation} />
    } else {
      return <WorkoutDisabled data={data} navigation={navigation} />
    }
  }
}

const WorkoutActive = ({data, navigation}) => {
  const {id, description, duration, level, sort} = data
  return (
    <View style={[styles.bBox]}>
      <View style={[styles.trItem]}>
        <Text style={[styles.h3, styles.mb]}>Тренировка {sort}</Text>
        <View style={[styles.inform, styles.mb]}>
          <Image
            source={require('./images/Time.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{duration}</Text>
          <Image
            source={require('./images/Mob.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{level}</Text>
        </View>
        <Text style={[styles.p18, styles.mb]}>{description}</Text>
        <Button
          style={[styles.white, styles.p16, styles.uppText]}
          text="НАЧАТЬ ТРЕНИРОВКУ"
          theme="success"
          onPress={() =>
            navigation.navigate('Training', {
              workoutId: id,
              sort: sort,
            })
          }
        />

        <Button
          style={[styles.link, styles.p16, styles.uppText]}
          text="Показать программу"
          onPress={() =>
            navigation.navigate('Workout', {
              workoutId: id,
            })
          }
        />
      </View>
    </View>
  )
}

const WorkoutDisabled = ({data, navigation}) => {
  const {id, description, duration, level, sort} = data
  return (
    <View style={[styles.bBox]}>
      <View style={[styles.trItem]}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            opacity: 0.6,
          }}>
          <Text style={[styles.h3, styles.mb]}>Тренировка {sort}</Text>
          <Image
            style={{width: 24, height: 24, marginLeft: 10}}
            source={require('./images/lock.png')}
          />
        </View>
        <View style={[styles.inform, styles.mb, styles.trOpac]}>
          <Image
            source={require('./images/Time.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{duration}</Text>
          <Image
            source={require('./images/Mob.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{level}</Text>
        </View>
        <Text style={[styles.p18, styles.mb, styles.trOpac]}>
          {description}
        </Text>
        <Button
          style={[styles.white, styles.p16, styles.uppText, styles.trOpac]}
          text="НАЧАТЬ ТРЕНИРОВКУ"
          disabled={true}
          theme="success"
          onPress={() =>
            navigation.navigate('Training', {
              workoutId: id,
              sort: sort,
            })
          }
        />

        <Button
          style={[styles.link, styles.p16, styles.uppText, styles.bgf3]}
          text="Показать программу"
          disabled={true}
          onPress={() =>
            navigation.navigate('Workout', {
              workoutId: id,
            })
          }
        />
      </View>
    </View>
  )
}

const WorkoutDone = ({data, navigation}) => {
  const {id, description, duration, level, sort} = data
  return (
    <View style={[styles.bBox]}>
      <View style={[styles.trItem]}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <Text style={[styles.h3, styles.mb]}>Тренировка {sort}</Text>
          <Image
            style={{width: 24, height: 24, marginLeft: 10}}
            source={require('./images/done2.png')}
          />
        </View>
        <View style={[styles.inform, styles.mb]}>
          <Image
            source={require('./images/Time.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{duration}</Text>
          <Image
            source={require('./images/Mob.png')}
            style={[styles.iconInform]}
          />
          <Text style={[styles.ll, styles.p16]}>{level}</Text>
        </View>
        <Text style={[styles.p18, styles.mb]}>{description}</Text>
        <Button
          style={[styles.white, styles.p16, styles.uppText]}
          text="НАЧАТЬ ТРЕНИРОВКУ"
          theme="success"
          onPress={() =>
            navigation.navigate('Training', {
              workoutId: id,
              sort: sort,
            })
          }
        />

        <Button
          style={[styles.link, styles.p16, styles.uppText]}
          text="Показать программу"
          onPress={() =>
            navigation.navigate('Workout', {
              workoutId: id,
            })
          }
        />
      </View>
    </View>
  )
}
