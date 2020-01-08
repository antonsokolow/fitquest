import React, {useState} from 'react'
import {
  Text,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Picker,
} from 'react-native'
import SelectModal from './questionaryModal'
import styles from '../../pages/style'

export const Two = ({setProfileValue, sex, growth, weight, wweight}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [weightIsVisible, setWeightIsVisible] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const bgImage =
    sex === 'm' ? require('../images/m-2.png') : require('../images/w-2.png')

  return (
    <ImageBackground source={bgImage} style={[styles.boxSlide]}>
      <Text style={[styles.shag]}>ШАГ 2</Text>
      <Text style={[styles.h3, styles.white, styles.mb]}>
        Заполни параметры для оптимизации программы
      </Text>
      <View>
        <View style={[styles.listItem]}>
          <Image
            style={{width: 25, height: 25, marginRight: 10}}
            source={require('../images/rost.png')}
          />
          <Text style={[styles.Flex, styles.listText]}>Рост</Text>
          <TouchableOpacity onPress={() => setActiveModal('growth')}>
            {growth ? (
              <Text style={[styles.listText]}>{growth}</Text>
            ) : (
              <Image
                style={{width: 30, height: 30}}
                source={require('../images/add.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.listItem]}>
          <Image
            style={{width: 25, height: 25, marginRight: 10}}
            source={require('../images/weight-scale.png')}
          />
          <Text style={[styles.Flex, styles.listText]}>Вес</Text>
          <TouchableOpacity onPress={() => setActiveModal('weight')}>
            {weight && <Text style={[styles.listText]}>{weight}</Text>}
            {!weight && (
              <Image
                style={{width: 30, height: 30}}
                source={require('../images/add.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.listItem]}>
          <Image
            style={{width: 25, height: 25, marginRight: 10}}
            source={require('../images/goal.png')}
          />
          <Text style={[styles.Flex, styles.listText]}>Желаемый вес</Text>
          <TouchableOpacity onPress={() => setActiveModal('wweight')}>
            {wweight && <Text style={[styles.listText]}>{wweight}</Text>}
            {!wweight && (
              <Image
                style={{width: 30, height: 30}}
                source={require('../images/add.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.otstup]} />
      <SelectModal
        growth={growth}
        weight={weight}
        wweight={wweight}
        option="growth"
        value={growth}
        setValue={setProfileValue}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />
    </ImageBackground>
  )
}
