import React from 'react'
import {View, StatusBar} from 'react-native'

import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {
  workoutDone,
  profileLoaded,
  profileUpdated,
} from '../store/actions'
import {compose} from '../utils'
import Load from '../components/Load'
import StartView from '../components/Training/start-view'
import TrainingView from '../components/Training/training-view'
import RestView from '../components/Training/rest-view'
import Stepper from '../components/Training/stepper'
import Purchase from './Purchase'

class TrainingScreen extends React.Component {
  state = {
    workout: null,
    exercises: null,
    exerciseId: null,
    step: null,
    activeModal: null,
    modalHistory: [],
    workoutDone: null,
    error: false,
    networkError: false,
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: navigation.getParam('backgroundColorParam', '#2BAB5C'), //'#fff', //2BAB5C
        shadowColor: 'transparent',
        borderBottomWidth: 0,
      },
      headerTintColor: 'black',
      title: navigation.getParam('titleParam', null),
      headerLeft: null,
    }
  }

  componentDidMount() {
    const {subscription} = this.props.subscription
    const {navigation, fitquestService} = this.props

    const workoutId = navigation.getParam('workoutId', null)
    const sort = navigation.getParam('sort', null)

    if (!subscription && sort > 1) {
      navigation.navigate('Purchase', {
        action: 'training',
      })
      return
    }

    if (workoutId == null) {
                             //TODO ErrorManager
                             return
                           }
    fitquestService.networkManager
      .fetchWorkout(workoutId)
      .then(this.onDataLoaded)
      .catch(this.onNetworkError)
  }

  onDataLoaded = data => {
    if (data.data.exercises.length === 0) {
      this.setState({
        error: true,
        networkError: false,
      })
    } else {
      this.setState({
        workout: data.data,
        exercises: data.data.exercises,
        exerciseId: 0,
        step: 0,
        error: false,
        networkError: false,
      })
    }
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

  onNextExercise = () => {
    if (this.state.exerciseId === this.state.exercises.length - 1) {
      this.onWorkoutDone()
      return
    }

    let nextExercise
    if (this.state.step === 0) {
      nextExercise = this.state.exercises[0]
    } else {
      nextExercise = this.state.exercises[this.state.exerciseId + 1]
      this.setState(state => {
        return {
          exerciseId: state.exerciseId + 1,
        }
      })
    }
    const total = this.state.exercises.filter(
      exercise => exercise.is_rest === 0,
    ).length

    if (nextExercise.is_rest === 0) {
      this.props.navigation.setParams({
        titleParam: 'Упражнение ' + (this.state.step + 1) + ' из ' + total,
        backgroundColorParam: '#fff',
      })
      this.setState(state => {
        return {
          step: state.step + 1,
        }
      })
    }
  }

  onWorkoutDone = () => {
    let {fitquestService} = this.props
    let {workout} = this.state

    fitquestService.networkManager
      .workoutDone(workout.id)
      .then(body => {
        if (body.result === 'success') {
          return fitquestService.firebaseManager.saveWorkout(workout.id)
        } else {
          this.setState({
            error: true,
          })
          return false
        }
      })
      .then(result => {
        if (result) {
          this.props.workoutDone({
            created: {_nanoseconds: 0, _seconds: new Date().getTime() / 1000},
            workoutId: workout.id,
            programId: workout.program_id,
          })
          this.props.navigation.navigate('WorkoutDone')
        } else {
          this.onError()
        }
      })
      .catch(this.onError)

    if (
      !this.props.profile.profile.startDate ||
      this.props.profile.profile.startDate == null
    ) {
      const startDate = new Date()
      fitquestService.firebaseManager
        .updateDocumentWithPromise('profile', {startDate: startDate})
        .then(result => {
          this.props.profileUpdated({
            startDate: {
              _nanoseconds: 0,
              _seconds: Math.floor(startDate.getTime() / 1000),
            },
          })
        })
        .catch(error => {
                          errorManager(error)
                        })
    }
  }

  onHomeDataLoaded = data => {
    if (!data.data) {
      this.setState({
        error: true,
      })
      return
    }
    this.props.dataLoaded(data.data)
  }

  onWorkoutRestart = () => {
    this.setState({
      exerciseId: 0,
      step: 0,
    })
    this.props.navigation.setParams({
      titleParam: '',
      backgroundColorParam: '#2BAB5C',
    })
  }

  render() {
    const {exercises, exerciseId, step} = this.state
    let content = null
    if (exercises == null) {
      content = <Load />
    } else if (step === 0) {
      content = <StartView buttonAction={this.onNextExercise} />
    } else {
      const data = exercises[exerciseId]
      //const nextExercise =
      //  exerciseId < exercises.length - 1 ? exercises[exerciseId + 1] : null
      const nextExercise = exercises.filter(exercise => exercise.is_rest === 0)[
        step
      ]
      const total = exercises.filter(exercise => exercise.is_rest === 0).length
      if (data.is_rest) {
        content = (
          <>
            <StatusBar barStyle="dark-content" />
            <Stepper id={step} total={total} />
            <RestView
              time={data.repeat}
              data={data}
              nextExercise={nextExercise}
              buttonAction={this.onNextExercise}
            />
          </>
        )
      } else {
        content = (
          <>
            <StatusBar barStyle="dark-content" />
            <Stepper id={step} total={total} />
            <TrainingView
              data={data}
              buttonAction={this.onNextExercise}
              onWorkoutRestart={this.onWorkoutRestart}
              nextExercise={nextExercise}
            />
          </>
        )
      }
    }

    return <View style={{flex: 1}}>{content}</View>
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    subscription: state.subscription,
    data: state.data,
    activity: state.activity,
    profile: state.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    workoutDone: data => {
      dispatch(workoutDone(data))
    },
    profileLoaded: profile => {
      dispatch(profileLoaded(profile))
    },
    profileUpdated: data => {
      dispatch(profileUpdated(data))
    },
  }
}

export default compose(
  withFitquestService(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TrainingScreen)
