import React, {useState, useEffect} from 'react'
import Modal from 'react-native-modal'
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import styles from '../../pages/style'
import Button from '../Button'
import { ScrollView } from 'react-native-gesture-handler'
import Privacy from './Privacy'
import Rules from './Rules'
import Terms from './Terms'

const LicenseModal = ({activeModal, setActiveModal}) => {
  const modals = (
    <>
      <View id="privacy" style={[styles.modal_content]}>
        <View style={[styles.modal_header]}>
          <Text style={[styles.modal_header_title]}>
            Политика конфиденциальности
          </Text>
          <Text
            style={{color: '#1958AF'}}
            onPress={() => {
              setActiveModal(null)
            }}>
            Закрыть
          </Text>
        </View>
        <ScrollView style={{padding: 20}}>
          <TouchableWithoutFeedback>
            <>
              <Privacy />

              <Button
                style={[styles.white, styles.p16, styles.uppText]}
                text="Понятно"
                theme="success"
                onPress={() => {
                  setActiveModal(null)
                }}
              />
              <View style={{height:60,}}/>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>

        
      </View>
      <View id="rules" style={[styles.modal_content]}>
        <View style={[styles.modal_header]}>
          <Text style={[styles.modal_header_title]}>Правила сервиса</Text>
          <Text
            style={{color: '#1958AF'}}
            onPress={() => {
              setActiveModal(null)
            }}>
            Закрыть
          </Text>
        </View>

        <ScrollView style={{paddingHorizontal:20, paddingBottom:80,}}>
          <TouchableWithoutFeedback>
            <>
              <Rules />
              <Button
                style={[styles.white, styles.p16, styles.uppText, styles.mb4]}
                text="Понятно"
                theme="success"
                onPress={() => {
                  setActiveModal(null)
                }}
              />
              <View style={{height:60,}}/>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
        
      </View>
      <View id="terms" style={[styles.modal_content]}>
        <View style={[styles.modal_header]}>
          <Text style={[styles.modal_header_title]}>Условия приобретения</Text>
          <Text
            style={{color: '#1958AF'}}
            onPress={() => {
              setActiveModal(null)
            }}>
            Закрыть
          </Text>
        </View>

        <ScrollView style={{padding: 20}}>
          <TouchableWithoutFeedback>
            <>
              <Terms />

              <Button
                style={[styles.white, styles.p16, styles.uppText]}
                text="Понятно"
                theme="success"
                onPress={() => {
                  setActiveModal(null)
                }}
              />
              <View style={{height:60,}}/>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </>
  )
  const content = activeModal
    ? modals.props.children.filter(m => m.props.id === activeModal)
    : modals.props.children[0]

  const isVisible = activeModal != null

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setActiveModal(null)}
      style={stylesModal.view}>
      {content}
    </Modal>
  )
}

export default LicenseModal

const stylesModal = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    height: '90%',
    margin: 0,
  },
})
