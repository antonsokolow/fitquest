/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../pages/style';
import WeekDay from '../components/WeekDay';

export default class Mdays extends Component {
  render() {
    const {navigation, item, credentials} = this.props;
    return (
      <View style={{justifyContent:'space-between',flexDirection:'row',marginBottom:10}}>
          <WeekDay day="Пн"/>
          <WeekDay day="Вт"/>
          <WeekDay day="Ср"/>
          <WeekDay day="Чт"/>
          <WeekDay day="Пт"/>
          <WeekDay day="Сб"/>
          <WeekDay day="Вс"/>
      </View>
    );
  }
}
