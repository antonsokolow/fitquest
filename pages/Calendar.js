import React from 'react'
import {View, Text, StatusBar, ImageBackground, Dimensions} from 'react-native'
import Button from '../components/Button'
import MonthInfo from '../components/MonthInfo'
import Week from '../components/Week'
import Mdays from '../components/Mdays'

class CalendarScreen extends React.Component {
  state = {
    heightBox: null,
  }
  render() {
    let {heightBox} = this.state
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            backgroundColor: '#2BAB5C',
            padding: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 220,
              width: heightBox,
            }}
            onLayout={event => {
              const {height} = event.nativeEvent.layout
              this.setState({
                heightBox: height,
              })
            }}>
            <ImageBackground
              source={{uri: 'http://ir.deacrm.ru/trophy.png'}}
              style={{width: heightBox, height: heightBox}}></ImageBackground>
          </View>
        </View>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
          <MonthInfo />
          <Mdays />

          <Week />
          <Week />
          <Week />
          <Week />
          <Week />
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <Button
            text="Начать испытание"
            theme="success"
            onPress={() => navigation.push('Training')}
          />
        </View>
      </View>
    );
  }
}

export default CalendarScreen
