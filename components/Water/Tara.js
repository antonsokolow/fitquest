import * as React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import styles from '../../pages/style'

class Tara extends React.Component {
  render() {
    const {isSelected, level, onPress} = this.props
    if (isSelected) {
      return (
        <TouchableOpacity onPress={() => onPress(level)}>
          <View style={[styles.tara, styles.taraActive]}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
              {level} мл
            </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => onPress(level)}>
          <View style={[styles.tara]}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
              {level} мл
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

export default Tara
