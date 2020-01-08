/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../pages/style';

export default class Day extends Component {
  render() {
    const {navigation, item, credentials, theme, day} = this.props;
    let dayItem = null;
    const DayTheme1 = () => {
      return (
        <View style={[styles.kvadrat]}>
          
        </View>
      );
    };
    const DayTheme2 = () => {
      return (
        <View style={[styles.kvadrat]}>
          <Text style={[styles.p16, styles.fw600]}>{day}</Text>
        </View>
      );
    };
    const DayTheme3 = () => {
      return (
        <View style={[styles.kvadrat]}>
          <Text style={[styles.p16, styles.space]}>{day}</Text>
        </View>
      );
    };
    const DayTheme4 = () => {
      return (
        <View style={[styles.kvadrat]}>
          <Text style={[styles.p16, styles.green, styles.fw600]}>{day}</Text>
        </View>
      );
    };
    const DayTheme5 = () => {
      return (
        <Image 
            style={[styles.kvadrat]}
            source={{uri: 'http://ir.deacrm.ru/medal.png'}}
        />
      );
    };
    switch (theme) {
      case 'one':
        dayItem = <DayTheme1 />;
        break;
      case 'two':
        dayItem = <DayTheme2 />;
        break;
      case 'three':
        dayItem = <DayTheme3 />;
        break;
      case 'four':
        dayItem = <DayTheme4 />;
        break;
      case 'five':
        dayItem = <DayTheme5 />;
        break;
      default:
        dayItem = <DayTheme1 />;
    }
    return <Fragment>{dayItem}</Fragment>;
  }
}
