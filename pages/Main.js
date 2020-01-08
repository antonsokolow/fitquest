import React, {Component} from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {compose} from '../utils'
import {profileUpdated} from '../store/actions'

import WeekCalendar from '../components/Main/WeekCalendar/WeekCalendar'
import TaskBox from '../components/Main/TaskBox'
import WorkoutBox from '../components/Main/WorkoutBox'
import WaterBox from '../components/Main/WaterBox'
import styles from './style'

class MainScreen extends Component {
  state = {
    tasks: [{}, {}, {}],
  }

  constructor(props) {
    super(props)
    let {fitquestService} = this.props
    this.moment = fitquestService.moment
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  completeTask = id => {
    this.setState(state => {
      let newItems = state.tasks
      const index = newItems.findIndex(elem => {
        return elem.id === id
      })
      newItems[index].isDone = !newItems[index].isDone
      return {
        tasks: newItems,
      }
    })
  }

  getDayNumber = startDay => {
    let given = this.moment.unix(startDay).startOf('day')
    let current = this.moment().startOf('day')

    //Difference in number of days
    const duration = this.moment.duration(current.diff(given)).asDays() + 1
    return ('0' + duration).slice(-2)
  }

  render() {
    const {tasks} = this.state
    const total = tasks.length
    const completed = tasks.filter(task => {
      return task.isDone === true
    }).length
    let challengeDay
    const profile = this.props.profile.profile

    if (!profile.startDate || profile.startDate == null) {
      challengeDay = 1
    } else {
      challengeDay = this.getDayNumber(
        this.props.profile.profile.startDate._seconds,
      )
    }

    return (
      <View style={[styles.base]}>
        <StatusBar barStyle="dark-content" />
        <WeekCalendar />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.home_header]}>
            <Text style={[styles.home_day]}>{challengeDay}</Text>
            <Text style={[styles.home_task]}>ДЕНЬ ИЗ 28</Text>
          </View>

          <View style={[styles.home_task_box]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <WorkoutBox />
            </TouchableOpacity>
            <View style={{height: 40, width: 10}}></View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Water')}>
              <WaterBox />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
)(MainScreen)
