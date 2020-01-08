import React from 'react'
import {
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import styles from '../../pages/style'

export const Three = ({setProfileValue, sex, level}) => {
  const bgImage =
    sex === 'm' ? require('../images/m-3.png') : require('../images/w-3.png')
  return (
    <ImageBackground source={bgImage} style={[styles.boxSlide]}>
      <Text style={[styles.shag]}>ШАГ 3</Text>
      <Text style={[styles.h3, styles.white, styles.mb]}>Твой уровень подготовки</Text>
      <View>
        <ChekItem name="Новичок" desc="2 раза в неделю" level={1} selectedLevel={level} onPress={setProfileValue} />
        <ChekItem name="Бывалый" desc="3 раза в неделю" level={2} selectedLevel={level} onPress={setProfileValue} />
        <ChekItem name="Профи" desc="5 раз в неделю" level={3} selectedLevel={level} onPress={setProfileValue} />
      </View>
      <View style={[styles.otstup]} />
    </ImageBackground>
  )
}

const ChekItem = ({name, desc, level, selectedLevel, onPress}) => {
  const img =
    level === selectedLevel
      ? require('../images/chek-active.png')
      : require('../images/chek.png')
  return (
    <TouchableOpacity onPress={() => onPress('level', level)}>
      <View style={[styles.level_item]}>
        <Image
          style={{width: 26, height: 26, marginRight:10, marginTop:5,}}
          source={img}
        />
        <View>
          <Text style={[styles.level_item_text]}>{name}</Text>
          <Text style={[styles.level_item_text_p]}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
