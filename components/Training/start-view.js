import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar} from 'react-native'
import styles from '../../pages/style'

const StartView = ({buttonAction}) => {
  const labels = ["На старт", "Внимание", "Марш!"]
  const [timer, setTimer] = useState(labels.length)

  useEffect(() => {
    let timerId

    const updateTimer = () => {
      if (timer === 1) {
        clearInterval(timerId)
        buttonAction()
      } else {
        setTimer(timer - 1)
      }
    }

    timerId = setInterval(() => updateTimer(), 1800)

    return () => clearInterval(timerId)
  }, [buttonAction, timer])

  const textToStart = labels[labels.length - timer]
  return (
    <View style={[styles.bggreen, styles.centercnt,]}>
      <StatusBar barStyle="light-content" />
      <Text style={[styles.white, styles.fw800, styles.p35]}>
        {textToStart}
      </Text>
    </View>
  )
}

export default StartView
