import * as React from 'react'
import {Text, View, ImageBackground} from 'react-native'
import TaskItem from './TaskItem'

import styles from '../../pages/style'

class TaskBox extends React.Component {
  render() {
    const {tasks, completeTask} = this.props
    const dayItems = tasks.map((item, i, array) => {
      return (
        <TaskItem key={i} data={item} completeTask={completeTask} />
      )
    })

    return (
      <View style={{padding: 20}}>
        <ImageBackground
          source={{uri: 'http://newlife.deacrm.ru/icon/rec@2x'}}
          style={{overflow: 'hidden', borderRadius: 15, padding: 20}}>
          <Text style={[styles.p22, styles.white, styles.fw800]}>
            Задачи на сегодня
          </Text>
          {dayItems}
        </ImageBackground>
      </View>
    )
  }

  getDayTasks = day => {
    const tasks = [
      [
        {id: 1, title: 'Съесть одно яблоко', isDone: false},
        {
          id: 2,
          title: 'Сделать себе комплимент',
          isDone: false,
        },
        {id: 3, title: 'Улыбнуться прохожему', isDone: false},
      ],
      [],
      [],
    ]

    return tasks[day]
  }
}

export default TaskBox
