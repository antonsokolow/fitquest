import React from 'react'
import {
  Text,
  ImageBackground,
  View,
  Image,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import styles from '../../pages/style'

export const Sex = ({setProfileValue, sex}) => {
  return (
    <ImageBackground
      source={require('../images/sex.png')}
      style={[styles.boxSlide]}>
      <StatusBar barStyle="light-content" />
      <Text style={[styles.shag]}>ШАГ 1</Text>
      <Text style={[styles.h3, styles.white, styles.mb]}>Укажи свой пол</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start', justifyContent:'space-between'}}> 
        {sex === 'm' ? (
          <SexViewMaleActive />
        ) : (
          <SexViewMale onPress={setProfileValue} />
        )}
        {sex === 'f' ? (
          <SexViewFemaleActive />
        ) : (
          <SexViewFemale onPress={setProfileValue} />
        )}
      </View>
      <View style={[styles.otstup]} />
    </ImageBackground>
  )
}

const SexViewMale = ({onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress('sex', 'm')}>
      <View style={[styles.btnSex]}>
        <Image
          style={{width: 50, height: 50, marginBottom:20,}}
          source={require('../images/man-standing-up.png')}
        />
        <Text style={[styles.btnChoiseText, styles.textActive]}>Мужской</Text>
      </View>
    </TouchableOpacity>
  )
}

const SexViewMaleActive = () => {
  return (
    <View style={[styles.btnSex, styles.btnActive]}>
      <Image
        style={{width: 50, height: 50, marginBottom:20,}}
        source={require('../images/man-standing-up-active.png')}
      />
      <Text style={[styles.btnChoiseText, styles.textActive]}>Мужской</Text>
    </View>
  )
}

const SexViewFemale = ({onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress('sex', 'f')}>
      <View style={[styles.btnSex]}>
        <Image
          style={{width: 50, height: 50, marginBottom:20,}}
          source={require('../images/woman-standing-up.png')}
        />
        <Text style={[styles.btnChoiseText, styles.textActive]}>Женский</Text>
      </View>
    </TouchableOpacity>
  )
}

const SexViewFemaleActive = () => {
  return (
    <View style={[styles.btnSex, styles.btnActive]}>
      <Image
        style={{width: 50, height: 50, marginBottom:20,}}
        source={require('../images/woman-standing-up-active.png')}
      />
      <Text style={[styles.btnChoiseText, styles.textActive]}>Женский</Text>
    </View>
  )
}
