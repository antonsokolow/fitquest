import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'
import Modal from 'react-native-modal'
import Button from './Button'

const PauseModal = ({
  activeModal,
  setActiveModal,
  modalBack,
  onWorkoutRestart,
  navigation,
}) => {
  let isVisible = activeModal != null

  const [showModal, setShowModal] = useState(null)

  useEffect(() => {
    if (activeModal != null) {
      setShowModal(activeModal)
    }
  }, [activeModal, showModal])

  const modals = (
    <>
      <View id="Main" style={{backgroundColor: '#fff', padding: 20}}>
        <Button text="Начать сначала" onPress={() => {
            setActiveModal(null)
            onWorkoutRestart()
          }}
        />
        <Button text="Завершить тренировку" onPress={() => setActiveModal('CancelTraining')} />
        <Button text="Продолжить тренировку" onPress={() => setActiveModal(null)} theme="success"/>
      </View>
      <View id="CancelTraining" style={{backgroundColor: '#fff', padding: 20}}>
        <Button
          text="Слишком сложно"
          onPress={() => {
            setActiveModal(null)
            navigation.goBack()
          }}
        />
        <Button
          text="Слишком легко"
          onPress={() => {
            setActiveModal(null)
            navigation.goBack()
          }}
        />
        <Button
          text="Мне не понравилось"
          onPress={() => {
            setActiveModal(null)
            navigation.goBack()
          }}
        />
        <Button
          text="Я изучаю программу"
          onPress={() => {
            setActiveModal(null)
            navigation.goBack()
          }}
        />
        <Button text="Назад" onPress={() => modalBack()} theme="success" />
      </View>
    </>
  )

  const content = showModal
    ? modals.props.children.filter(m => m.props.id === showModal)
    : modals.props.children[0]

  return (
    <Modal
      isVisible={isVisible}
      swipeThreshold={80}
      onSwipeComplete={() => setActiveModal(null)}
      onBackdropPress={() => setActiveModal(null)}
      onBackButtonPress={() => setActiveModal(null)}
      swipeDirection={['down']}
      useNativeDriver={false}
      hideModalContentWhileAnimating={false}
      backdropTransitionOutTiming={500}
      animationOutTiming={500}
      animationOut="slideOutDown"
      style={stylesT.bottomModal}>
      {content}
    </Modal>
  )
}

const stylesT = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default withNavigation(PauseModal)
