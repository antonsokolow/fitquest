/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from '../pages/style'

type Props = {
  navigation?: {},
  item: string,
  credentials?: {},
  img?: Image,
  text?: string,
  znach: string,
  value: string,
  onPress: (string) => {},
}

const ProfileList = ({
  navigation,
  item,
  credentials,
  img,
  text,
  znach,
  value,
  onPress,
}: Props) => {
  if (value) {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={[styles.profileList]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20, marginRight: 10}}
              source={img}
            />
            <Text style={[styles.p16]}>{text}</Text>
          </View>
          <Text style={[styles.space]}>{value + ' ' + znach}</Text>
        </View>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={[styles.profileList]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20, marginRight: 10}}
              source={img}
            />
            <Text style={[styles.p16]}>{text}</Text>
          </View>
          <Image
            style={{width: 30, height: 30}}
            source={require('./images/add.png')}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

export default ProfileList
