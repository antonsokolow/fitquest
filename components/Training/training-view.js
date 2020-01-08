import React, {Component} from 'react'
import {View, Image, Text, StatusBar} from 'react-native'
import Video from 'react-native-video'
import styles from '../../pages/style'
import Button from '../Button'
import PauseModal from '../PauseModal'

class TrainingView extends Component {
  state = {
    isModalVisible: false,
    activeModal: null,
    modalHistory: [],
  }

  modalBack = () => {
    this.setActiveModal(
      this.state.modalHistory[this.state.modalHistory.length - 2],
    )
  }

  setActiveModal = activeModal => {
    activeModal = activeModal || null
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : []

    if (activeModal === null) {
      modalHistory = []
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1)
    } else {
      modalHistory.push(activeModal)
    }

    this.setState({
      activeModal,
      modalHistory,
    })
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
    this.setState({activeModal: 'Main'})
  }

  videoError = () => {
                       //TODO ErrorManager
                     }

  render() {
    const {data, buttonAction, onWorkoutRestart, nextExercise} = this.props
    const videoUrl =
      'https://fitquest.storage.yandexcloud.net/video/' +
      data.video +
      '_480x320.mp4'

    const nextText = nextExercise ? 'Далее: ' + nextExercise.name : null

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={{minHeight: 200, backgroundColor: '#000'}}>
          <Video
            source={{uri: videoUrl}}
            ref={ref => {
              this.player = ref
            }}
            onError={this.videoError}
            style={[styles.trVideo]}
            repeat={true}
            poster={
              Image.resolveAssetSource(require('../images/preloader.gif')).uri
            }
            posterResizeMode="cover"
          />
        </View>
        <View style={{paddingTop: 20}}>
          <Text style={[styles.p22, styles.fw600, styles.tc]}>{data.name}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.raz, styles.fw800]}>10 раз</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 20,
          }}>
          <Text style={[styles.p14, styles.space, styles.tc]}>{nextText}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Button
              text="ПАУЗА"
              theme="secondary"
              onPress={() => this.setActiveModal('Main')}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Button
              text="ДАЛЬШЕ"
              theme="secondary"
              onPress={() => buttonAction()}
            />
          </View>
        </View>
        <PauseModal
          activeModal={this.state.activeModal}
          setActiveModal={this.setActiveModal}
          modalBack={this.modalBack}
          onWorkoutRestart={onWorkoutRestart}
        />
      </>
    )
  }
}

export default TrainingView
