import React from 'react';
import {View, Image, Text,} from 'react-native';
import styles from './style';
import Button from '../components/Button';


import {withFitquestService} from '../components/hoc'
import {connect} from 'react-redux'
import {compose} from '../utils'

class WorkoutDoneScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerLeft: null,
  }
  render() {
    const {navigation} = this.props
    const profile = this.props.profile.profile
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{}}>
            <Image
              source={require('../components/images/winner.jpg')}
              style={[styles.saleimg]}
            />
            <Text
              style={{
                padding: 20,
                textAlign: 'center',
                fontSize: 30,
                fontWeight: '600',
              }}>
              Молодец!
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'center',
                fontSize: 20,
              }}>
              {profile.sex === 'm' &&
                'Ты на шаг приблизился к своей цели. Не отступай, увидимся на следующей тренировке.'}
              {profile.sex === 'f' &&
                'Ты на шаг приблизилась к своей цели. Не отступай, увидимся на следующей тренировке.'}
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Button
            text="Вернуться на главную"
            theme="success"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    water: state.water,
    credentials: state.credentials,
  }
}

export default compose(
  withFitquestService(),
  connect(mapStateToProps),
)(WorkoutDoneScreen)
