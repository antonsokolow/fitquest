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

export default class WeekDay extends Component {
  render() {
    const {navigation, item, credentials} = this.props;
    return (
    <View style={[styles.kvadrat]}>
        <Text style={[styles.p14, styles.space]}>{this.props.day}</Text>
    </View>
    );
  }
}
