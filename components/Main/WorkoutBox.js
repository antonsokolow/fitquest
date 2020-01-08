import * as React from 'react'
import {Text, ImageBackground, View, Image} from 'react-native'

import {connect} from 'react-redux'
import {withFitquestService} from '../hoc'
import {compose} from '../../utils'

import {activityLoaded, workoutsLoaded} from '../../store/actions'

import styles from '../../pages/style'

class WorkoutBox extends React.Component {
  render() {
    const {workouts, profile} = this.props
    let {fitquestService} = this.props
    const today = fitquestService.moment()
    let todayWorkouts = workouts.filter(workout => {
      return fitquestService.moment
        .unix(workout.created._seconds)
        .isSame(today, 'day')
    })
    let content
    const WorkoutBoxNotDone = () => {
      return (
        <ImageBackground source={bgImage} style={[styles.trening_box]}>
          <View style={[styles.trending_box_done]}>
            <Text style={[styles.p13, styles.white, styles.fw600, styles.mb1]}>
              Тренировка дня
            </Text>
            <Text style={[styles.p11, styles.white]}>
              Выполните любую тренировку из раздела Активность
            </Text>
          </View>
        </ImageBackground>
      )
    }

    const WorkoutBoxDone = () => {
      return (
        <ImageBackground source={bgImage} style={[styles.trening_box]}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 1,
              padding: 10,
            }}>
            <Image
              source={require('../images/done.png')}
              style={{height: 35, width: 35}}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.trending_box_done]}>
            <Text style={[styles.p13, styles.white, styles.fw600, styles.mb1]}>
              Выполнено!
            </Text>
            <Text style={[styles.p11, styles.white]}>
              Отлично! Тренировка завершена
            </Text>
          </View>
        </ImageBackground>
      )
    }

    if (todayWorkouts.length > 0) {
      content = <WorkoutBoxDone />
    } else {
      content = <WorkoutBoxNotDone />
    }

    const bgImage =
      profile.sex === 'm'
        ? require('../images/m-1.png')
        : require('../images/w-1.png')

    return <>{content}</>
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    subscription: state.subscription,
    workouts: state.activity.workouts,
    profile: state.profile.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    activityLoaded: data => {
      dispatch(activityLoaded(data))
    },
    workoutsLoaded: data => {
      dispatch(workoutsLoaded(data))
    },
  }
}

export default compose(
  withFitquestService(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkoutBox)
