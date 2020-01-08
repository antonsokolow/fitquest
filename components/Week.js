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
import Day from '../components/Day';

export default class Week extends Component {
  render() {
    const {navigation, item, credentials} = this.props;
    return (
      <View
        style={[styles.week]}>
        <Day day="1" theme="one" />
        <Day day="2" theme="two" />
        <Day day="3" theme="three" />
        <Day day="4" theme="four" />
        <Day day="5" theme="five" />
        <Day day="6" theme="two" />
        <Day day="7" theme="two" />
      </View>
    );
  }
}
