import * as React from 'react'
import {Text, View, StatusBar} from 'react-native'
import {withFitquestService} from '../../hoc'
import {compose} from '../../../utils'
import {connect} from 'react-redux'

import styles from '../../../pages/style'
import DayWeek from './DayWeekCalendar'

class WeekCalendar extends React.Component {
  state = {
    week: [{}],
  }

  constructor(props) {
    super(props)
    let {fitquestService} = this.props
    this.moment = fitquestService.moment
  }

  week = (current, workouts) => {
    let {fitquestService} = this.props
    let week = []
    const today = new Date()
    let weekDays = this.moment.weekdaysShort(true)
    weekDays = weekDays.map(e => {
      return e[0].toUpperCase() + e.substring(1)
    })
    current.setDate(current.getDate() - current.getDay() + 1)
    for (var i = 0; i < 7; i++) {
      let status

      let todayWorkouts = workouts.filter(workout => {
        return fitquestService.moment
          .unix(workout.created._seconds)
          .isSame(current, 'day')
      })
      if (current.getDay() === today.getDay()) {
        status = 'today'
      } else if (this.moment(current).isAfter(this.moment(today), 'day')) {
        status = 'future'
      } else if (todayWorkouts.length > 0) {
        status = 'done'
      } else {
        status = 'notdone'
      }

      week.push({
        day: weekDays[i],
        number: this.moment(current).date(),
        status: status,
        workouts: todayWorkouts,
      })
      current.setDate(current.getDate() + 1)
    }
    return week
  }

  render() {
    const {workouts} = this.props
    const week = this.week(new Date(), workouts)
    const weekItems = week.map((item, i, array) => {
      return (
        <DayWeek
          key={i}
          day={item.day}
          number={item.number}
          status={item.status}
          workouts={item.workouts}
        />
      )
    })

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}>
        {weekItems}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    water: state.water,
    workouts: state.activity.workouts,
  }
}

export default compose(
  withFitquestService(),
  connect(mapStateToProps),
)(WeekCalendar)
