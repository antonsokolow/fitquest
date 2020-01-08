/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import Video from 'react-native-video'
import styles from '../pages/style'
import Button from '../components/Button'

export default class SetItem extends Component {
  videoError = () => {
                       //TODO ErrorManager
                     }
  render() {
    const {navigation, credentials, data} = this.props
    const url =
      'https://fitquest.storage.yandexcloud.net/video/' +
      data.video +
      '_180x120.mp4'

    return (
      <View style={[styles.setItem]}>
        <Video
          source={{uri: url}}
          ref={ref => {
            this.player = ref
          }}
          onError={this.videoError}
          style={[styles.setImag]}
          repeat={true}
          poster={
            Image.resolveAssetSource(require('./images/preloader.gif')).uri
          }
          posterResizeMode="cover"
        />

        <View style={[styles.setInfo]}>
          <Text style={[styles.setInfoH]}>{data.name}</Text>
          <Text style={[styles.setInfoP]}>{data.repeat} раз</Text>
        </View>
      </View>
    )
  }
}
