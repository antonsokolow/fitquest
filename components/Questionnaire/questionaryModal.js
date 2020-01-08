import React, {useState, useEffect} from 'react'
import Modal from 'react-native-modal'
import {Text, View, Picker, StyleSheet} from 'react-native'
import styles from '../../pages/style'
import Button from '../Button'

const SelectModal = ({
  growth,
  weight,
  wweight,
  setValue,
  activeModal,
  setActiveModal,
}) => {
  let heightArray = []
  for (var i = 120; i <= 210; i++) {
    heightArray.push(<Picker.Item label={'' + i} value={'' + i} key={'' + i} />)
  }
  let weightArray = []
  for (var i = 40; i <= 200; i++) {
    weightArray.push(<Picker.Item label={'' + i} value={'' + i} key={'' + i} />)
  }

  const [selectedGrowth, setSelectedGrowth] = useState(growth ? growth : '170')
  const [selectedWeight, setSelectedWeight] = useState(weight ? weight : '70')
  const [selectedWWeight, setSelectedWWeight] = useState(wweight ? wweight : '70')
  
  const modals = (
    <>
      <View id="growth" style={styles.content}>
        <Text style={styles.contentTitle}>Ваш рост</Text>
        <View style={{alignItems: 'center'}}>
          <Picker
            selectedValue={selectedGrowth}
            style={styles.pikers}
            itemStyle={styles.pikerItem}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGrowth(itemValue)
            }>
            {heightArray}
          </Picker>
        </View>

        <Button
          style={[styles.white, styles.p16, styles.uppText]}
          text="Сохранить"
          theme="success"
          onPress={() => {
            setValue('growth', selectedGrowth)
            setActiveModal(null)
          }}
        />
      </View>
      <View id="weight" style={styles.content}>
        <Text style={styles.contentTitle}>Ваш вес</Text>
        <View style={{alignItems: 'center'}}>
          <Picker
            selectedValue={selectedWeight}
            style={styles.pikers}
            itemStyle={styles.pikerItem}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedWeight(itemValue)
            }>
            {weightArray}
          </Picker>
        </View>
        <Button
          style={[styles.white, styles.p16, styles.uppText]}
          text="Сохранить"
          theme="success"
          onPress={() => {
            setValue('weight', selectedWeight)
            setActiveModal(null)
          }}
        />
      </View>
      <View id="wweight" style={styles.content}>
        <Text style={styles.contentTitle}>Желаемый вес</Text>
        <View style={{alignItems: 'center'}}>
          <Picker
            selectedValue={selectedWWeight}
            style={styles.pikers}
            itemStyle={styles.pikerItem}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedWWeight(itemValue)
            }>
            {weightArray}
          </Picker>
        </View>
        <Button
          style={[styles.white, styles.p16, styles.uppText]}
          text="Сохранить"
          theme="success"
          onPress={() => {
            const value = wweight ? wweight : '70'
            setValue('wweight', selectedWWeight)
            setActiveModal(null)
          }}
        />
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
      swipeDirection={['down']}
      onSwipeComplete={() => setActiveModal(null)}>
      {content}
    </Modal>
  )
}

export default SelectModal