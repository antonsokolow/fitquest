/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Text, ImageBackground} from 'react-native'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import styles from '../pages/style'
import Button from '../components/Button'

class ProgramItem extends Component {
  render() {
    const {profile} = this.props
    const {navigation, item} = this.props
    const backgroundImage = item.backgroundImage,
      name = item.name,
      description = item.description
    return (
      <ImageBackground
        source={{
          uri: backgroundImage,
        }}
        style={[styles.programBg]}>
        <Text style={[styles.h3, styles.white, styles.mb]}>{name}</Text>
        <Text style={[styles.p18, styles.white, styles.mb]}>{description}</Text>
        <Text style={[styles.p16, styles.white, styles.uppText, styles.fw600]}>
          Прогресс
        </Text>
        <Text
          style={[
            styles.p16,
            styles.white,
            styles.uppText,
            styles.fw600,
            styles.mb,
          ]}>
          {item.completedTraining}/{item.numberOfTraining}
        </Text>
        <Button
          text="Начать тренировку"
          theme="success"
          onPress={() =>
            navigation.navigate('Program', {
              programId: item.id,
            })
          }
        />
      </ImageBackground>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile,
  }
}

export default withNavigation(connect(mapStateToProps)(ProgramItem))
//export default withNavigation()(connect(mapStateToProps)(ProgramItem))
//export default withFitquestService()(connect(mapStateToProps)(ProgramScreen))
