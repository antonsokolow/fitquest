import React from 'react'
import {View, Image, Text, Animated, StatusBar} from 'react-native'
import Video from 'react-native-video'
import styles from '../../pages/style'
import Button from '../Button'
import SetItem from '../../components/SetItem'

class RestView extends React.Component {
  state = {
    timer: null,
    slideUpValue: new Animated.Value(0),
  }

  _start = () => {
    return Animated.parallel([
      Animated.timing(this.state.slideUpValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }

  componentDidMount() {
    const {time} = this.props
    this.time = new Date()
    this.timerId = setInterval(() => this.updateTimer(time), 1000)

    this._start()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  updateTimer = time => {
    const timer = time - Math.round((new Date() - this.time) / 1000)

    this.setState({
      timer: this.toHHMMSS(timer),
    })

    if (timer < 0) {
      clearInterval(this.timerId)
      this.props.buttonAction()
    }
  }

  toHHMMSS = value => {
    var sec_num = parseInt(value, 10) // don't forget the second param
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - hours * 3600) / 60)
    var seconds = sec_num - hours * 3600 - minutes * 60

    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  }

  render() {
    let {slideUpValue} = this.state
    const {data, buttonAction, nextExercise} = this.props
    let {timer} = this.state
    if (timer == null) {
      timer = this.toHHMMSS(this.props.time)
    }

    return (
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          transform: [
            {
              translateX: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
          flex: 1,
        }}>
        <StatusBar barStyle="dark-content" />
        <View style={{flex:1, backgroundColor:'#2BAB5C', justifyContent:'center', alignItems:'center',paddingTop:40,}}>
          <Text style={{color:'#fff', fontSize:22, textTransform:'uppercase',}}>Время отдыха</Text>
          <Text style={{color:'#fff', fontSize:70, textTransform:'uppercase', fontWeight:'800'}}>{timer}</Text>
        </View>
        <View style={{backgroundColor:'#2BAB5C',paddingBottom:20,}}>
          <Button
              text="ПРОПУСТИТЬ ОТДЫХ"
              theme="success"
              onPress={() => buttonAction()}
          />
        </View>
        <View style={{paddingHorizontal:20, paddingTop:20,}}>
          <SetItem data={nextExercise} />
        </View>
      </Animated.View>
    )
  }
}

export default RestView
