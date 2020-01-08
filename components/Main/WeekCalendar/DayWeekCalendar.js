import * as React from 'react'
import {Text, View, Image} from 'react-native'

import styles from '../../../pages/style'

export default class DayWeek extends React.Component {
  render() {
    const {status, workouts} = this.props
    switch (status) {
      case 'today':
        return (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={[styles.day_day]}>{this.props.day}</Text>
            <View style={{backgroundColor:'#ECEFFA',padding: 8, borderRadius: 20,}}>
              <Text style={{fontSize:16, fontWeight:'600',}}>
                {this.props.number}
              </Text>
            </View>
          </View>
        )
      case 'done':
        return (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={[styles.day_day]}>{this.props.day}</Text>
            <Text style={[styles.day_number, styles.green]}>
              {this.props.number}
            </Text>
          </View>
        )
      case 'notdone':
        return (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={[styles.day_day]}>{this.props.day}</Text>
            <Text style={[styles.day_number, styles.day_grey]}>
              {this.props.number}
            </Text>
          </View>
        )
      case 'future':
        return (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={[styles.day_day]}>{this.props.day}</Text>
            <Text style={[styles.day_number]}>
              {this.props.number}
            </Text>
          </View>
        )
      default:
        return (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={[styles.day_day]}>{this.props.day}</Text>
            <Text style={[styles.day_number]}>{this.props.number}</Text>
          </View>
        )
    }
  }
}
