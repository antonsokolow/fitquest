import React from 'react'
import {Text, ImageBackground, View, TouchableOpacity} from 'react-native'
import styles from '../../pages/style'

export const One = ({setProfileValue, sex, goal}) => {
  const bgImage =
    sex === 'm' ? require('../images/m-1.png') : require('../images/w-1.png')
  return (
    <ImageBackground source={bgImage} style={[styles.boxSlide]}>
      <Text style={[styles.shag]}>ШАГ 1</Text>
      <Text style={[styles.h3, styles.white, styles.mb]}>
        Выбери цель занятий
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <GoalView
          text={
            sex === 'm' ? 'Набрать мышечную массу' : 'Похудение, сушка, рельеф'
          }
          value="a"
          onPress={setProfileValue}
          isActive={goal === 'a'}
        />
        <GoalView
          text={sex === 'm' ? 'Похудеть' : 'Плоский живот'}
          value="b"
          onPress={setProfileValue}
          isActive={goal === 'b'}
        />
        <GoalView
          text={sex === 'm' ? 'Придти в тонус' : 'Красивые ягодицы'}
          value="c"
          onPress={setProfileValue}
          isActive={goal === 'c'}
        />
        <GoalView
          text={sex === 'm' ? 'Убрать живот' : 'На всё тело'}
          value="d"
          onPress={setProfileValue}
          isActive={goal === 'd'}
        />
      </View>
      <View style={[styles.otstup]} />
    </ImageBackground>
  )
}

const GoalView = ({text, value, onPress, isActive}) => {
  if (isActive) {
    return (
      <View style={[styles.btnChoise, styles.btnActive]}>
        <Text style={[styles.btnChoiseText, styles.textActive]}>{text}</Text>
      </View>
    )
  } else {
    return (
      <TouchableOpacity onPress={() => onPress('goal', value)}>
        <View style={[styles.btnChoise]}>
          <Text style={[styles.btnChoiseText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
