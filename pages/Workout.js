import React from 'react'
import {View, Text, Image, StatusBar} from 'react-native'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'

import styles from './style'
import {ScrollView} from 'react-native-gesture-handler'
import Button from '../components/Button'
import SetItem from '../components/SetItem'

class WorkoutScreen extends React.Component {
  state = {
    exercises: [],
    workoutId: null,
    duration: null,
    level: null,
    sort: null,
    error: false,
    networkError: false,
  }

  componentDidMount() {
    const {navigation, fitquestService} = this.props
    const workoutId = navigation.getParam('workoutId', null)
    if (workoutId == null) {
      return
    }
    fitquestService.networkManager
      .fetchWorkoutWithExercises(workoutId)
      .then(this.onDataLoaded)
      .catch(this.onNetworkError)
  }

  onDataLoaded = data => {
    if (!data.data) {
      this.setState({
        error: true,
        networkError: false,
      })
      return
    }

    this.setState({
      exercises: data.data.exercises,
      workoutId: data.data.id,
      duration: data.data.duration,
      level: data.data.level,
      sort: data.data.sort,
      error: false,
      networkError: false,
    })
  }

  onError = error => {
    this.setState({
      error: true,
    })
  }

  onNetworkError = error => {
    this.setState({
      networkError: true,
    })
  }

  render() {
    const {navigation} = this.props
    let {exercises, workoutId, duration, level, sort} = this.state

    const workoutItems = exercises.map(item => {
      const {id} = item
      return <SetItem key={id} data={item} />
    })

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.tpbar]}>
          <View style={[styles.tpbarItem]}>
            <Image
              source={{
                uri: 'http://prostor-spb.ru/icon/Time@3x.png',
              }}
              style={[styles.iconInform]}
            />
            <Text style={[styles.ll, styles.p16]}>{duration} мин.</Text>
          </View>
          <View style={[styles.tpbarItem]}>
            <Image
              source={{
                uri: 'http://prostor-spb.ru/icon/Mob@3x.png',
              }}
              style={[styles.iconInform]}
            />
            <Text style={[styles.ll, styles.p16]}>{level}</Text>
          </View>
        </View>
        <ScrollView style={{flex: 1, padding: 20}}>
          {workoutItems}
          <View style={{height: 90}} />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
          }}>
          <Button
            text="Начать тренировку"
            theme="success"
            onPress={() =>
              navigation.navigate('Training', {
                workoutId: workoutId,
                sort: sort,
              })
            }
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    subscription: state.subscription,
  }
}

export default withFitquestService()(connect(mapStateToProps)(WorkoutScreen))
