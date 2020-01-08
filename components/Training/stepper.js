import React from 'react'
import {View} from 'react-native'
import styles from '../../pages/style'

const Stepper = ({id, total}) => {
  let content = []
  for (let i = 1; i <= total; i++) {
    if (i > id) {
      content.push(<View style={[styles.storyItemDone]} key={i.toString()} />)
    } else {
      content.push(<View style={[styles.storyItem]} key={i.toString()} />)
    }
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
      }}>
      {content}
    </View>
  )
}

export default Stepper
