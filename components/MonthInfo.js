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

export default class MonthInfo extends Component {
  render() {
    const {navigation, item, credentials} = this.props;
    return (
      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20,}}>
          <Text style={[styles.p16, styles.fw600]}>Октябрь 2019</Text>
          <Text style={[styles.p16, styles.fw600]}>6/31</Text>
      </View>
    );
  }
}
