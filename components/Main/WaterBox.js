import * as React from 'react'
import {Text, ImageBackground, Image, View} from 'react-native'

import {connect} from 'react-redux'
import {withFitquestService} from '../hoc'
import {compose} from '../../utils'

import styles from '../../pages/style'

class WaterBox extends React.Component {
  render() {
    const {dailyNorm, level} = this.props.water.water
    let content
    const WaterBoxNotDone = ({waterLevel}) => {
      return (
        <View style={[styles.wat]}>
          <View style={{height: waterLevel + '%'}}>
            <Image
              source={require('../images/volna_2.gif')}
              style={{height: 30, width: "100%"}}
              resizeMode="cover"
            />
            <View style={{flex: 1, backgroundColor: '#51aceb'}} />
          </View>
          <View style={{position: 'absolute', height: '100%', width: '100%'}}>
            <View style={{flex: 1, padding: 10, justifyContent: 'flex-end'}}>
              <Text
                style={[styles.p13, styles.white, styles.fw600, styles.mb1]}>
                Трекер воды
              </Text>
              <Text style={[styles.p18, styles.white, styles.fw800]}>
                {level}/{dailyNorm}
              </Text>
              <Text style={[styles.p11, styles.white]}>мл</Text>
            </View>
          </View>
        </View>
      )
    }

    const WaterBoxDone = () => {
      return (
        <View style={[styles.wat]}>
          <View style={{height: '100%'}}>
            <Image
              source={require('../images/volna_2.gif')}
              style={{height: 30, width: '100%'}}
              resizeMode="cover"
            />
            <View style={{flex: 1, backgroundColor: '#51aceb'}} />
          </View>
          <View
            style={{
              padding: 10,
              position: 'absolute',
              width: '100%',
              top: 0,
              zIndex: 5,
            }}>
            <Image
              source={require('../images/done.png')}
              style={{height: 35, width: 35}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              zIndex: 1,
            }}>
            <View style={{flex: 1, padding: 10, justifyContent: 'flex-end'}}>
              <Text
                style={[styles.p13, styles.white, styles.fw600, styles.mb1]}>
                Трекер воды
              </Text>
              <Text style={[styles.p18, styles.white, styles.fw800]}>
                {level}/{dailyNorm}
              </Text>
              <Text style={[styles.p11, styles.white]}>мл</Text>
            </View>
          </View>
        </View>
      )
    }

    if (level >= dailyNorm) {
      content = <WaterBoxDone />
    } else {
      const waterLevel = Math.floor((level / 2700) * 100)
      content = <WaterBoxNotDone waterLevel={waterLevel} />
    }

    return (
      <>
      {content}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    water: state.water,
  }
}

export default compose(
  withFitquestService(),
  connect(mapStateToProps),
)(WaterBox)
