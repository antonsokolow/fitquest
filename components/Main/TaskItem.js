import * as React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'

import styles from '../../pages/style'

class TaskItem extends React.Component {
  render() {
    const {data, completeTask} = this.props
    if (data.isDone) {
      return (
        <View style={[styles.rowwer]}>
          <TouchableOpacity onPress={() => completeTask(data.id)}>
            <Image
              style={{width: 20, height: 20, marginRight: 10}}
              source={{uri: 'http://newlife.deacrm.ru/icon/checkitemDone@2x'}}
            />
          </TouchableOpacity>

          <Text style={[styles.white, styles.p16, styles.text_decor]}>
            {data.title}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.rowwer]}>
          <TouchableOpacity onPress={() => completeTask(data.id)}>
            <Image
              style={{width: 20, height: 20, marginRight: 10}}
              source={{uri: 'http://newlife.deacrm.ru/icon/checkitem@2x'}}
            />
          </TouchableOpacity>
          <Text style={[styles.white, styles.p16]}>{data.title}</Text>
        </View>
      )
    }
  }
}

export default TaskItem
