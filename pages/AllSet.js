import React from 'react'
import {Dimensions, StatusBar, View, ScrollView, Text, Image} from 'react-native'
import styles from './style'

import {connect} from 'react-redux'
import {AppEventsLogger} from 'react-native-fbsdk'
import auth, {firebase} from '@react-native-firebase/auth'
import {withFitquestService} from '../components/hoc'
import {credentialsLoaded, profileLoaded, waterLoaded} from '../store/actions'
import Button from '../components/Button'
import LoadView from '../components/Load'

let screenWidth = Dimensions.get('window').width

class AllSetScreen extends React.Component {
  state = {
    isButtonDisabled: false,
    isLoading: false,
    user: null,
  }

  constructor(props) {
    super(props)
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  onAuthStateChanged = async user => {
    if (user) {
      // Юзер авторизовался,
      // Сохраняем профиль и переходим на главную
      const profile = this.props.profile
      const {navigation, fitquestService} = this.props
      fitquestService.firebaseManager.user = user

      this.createAndStoreUser(user, profile)
        .then(result => {
          navigation.navigate('App')
        })
        .catch(error => {
          errorManager(error)
        })
    } else {
      // Показываем окно регистрации через Facebook
      this.setState({
        isLoading: false,
      })
    }
  }

  createAndStoreUser = (user, profile) => {
    if (profile.weight && profile.sex) {
      profile.water =
        profile.sex === 'm' ? profile.weight * 35 : profile.weight * 31
    } else {
      profile.water = 2700
    }

    const {fitquestService} = this.props
    return new Promise((resolve, reject) => {
      fitquestService.firebaseManager
        .getCollection('credential')
        .then(credentials => {
          if (!credentials) {
            // Новый пользователь, создаем аккаунт
            return new Promise((resolve, reject) => {
              fitquestService.networkManager
                .registerWithPromise()
                .then(newCredentials => {
                  fitquestService.firebaseManager
                    .createDocumentWithPromise('credential', newCredentials)
                    .then(resolve(newCredentials))
                    .catch(error => reject(error))
                })
                .catch(error => reject(error))
            })
          } else {
            // Пользователь найден, используем данные для логина
            return credentials
          }
        })
        .then(result => {
          fitquestService.networkManager.credentials = result
          return fitquestService.dataManager.storeCredentialsWithPromise(
            result.username,
            result.token,
            user.uid,
          )
        })
        .then(() => {
          return fitquestService.firebaseManager.createDocumentWithPromise(
            'profile',
            profile,
          )
        })
        .then(() => {
          let water = this.props.water.water
          this.props.waterLoaded({dailyNorm: profile.water, level: water.level})
          AppEventsLogger.logEvent('User created')
          resolve(true)
        })
        .catch(error => {
          AppEventsLogger.logEvent('Error: AllSet 114 ' + error)
          reject(error)
        })
    })
  }

  createFacebookProfile = () => {
    const {navigation, fitquestService} = this.props
    const profile = this.props.profile
    this.setState({
      isButtonDisabled: true,
    })

    fitquestService.firebaseManager
      .facebookLoginWithPromise()
      .then(user => {
        // success
      })
      .catch(error => {
        this.setState({
          isButtonDisabled: false,
        })
      })
  }

  createAnonymousProfile = () => {
    const {navigation, fitquestService} = this.props
    const profile = this.props.profile.profile
    this.setState({
      isButtonDisabled: true,
    })
    fitquestService.firebaseManager
      .anonymousLoginWithPromise()
      .then(user => {
        return this.createAndStoreUser(user, profile)
      })
      .then(result => {
        navigation.navigate('App')
      })
      .catch(error => {
        // Registration error
        this.setState({
          isButtonDisabled: false,
        })
      })
  }

  render() {
    const {isButtonDisabled} = this.props
    if (this.state.isLoading) {
      return <LoadView />
    }
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <Image
            source={require('../components/images/Starter.jpg')}
            style={[styles.regimg]}
          />
          <View style={{padding: 20}}>
            <Text
              style={{textAlign: 'center', fontSize: 23, fontWeight: '600'}}>
              Авторизуйтесь, чтобы сохранить свои результаты и победы!
            </Text>
          </View>
          <View style={{padding: 20}}>
            <Button
              text="Войти через Facebook"
              theme="blue"
              onPress={this.createFacebookProfile}
              disabled={isButtonDisabled}
            />
          </View>
          <View style={{padding: 0}}>
            <Button
              text="Пропустить"
              theme="white"
              onPress={() => this.createAnonymousProfile()}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile.profile,
    water: state.water,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    credentialsLoaded: credentials => {
      dispatch(credentialsLoaded(credentials))
    },
    profileLoaded: profile => {
      dispatch(profileLoaded(profile))
    },
    waterLoaded: water => {
      dispatch(waterLoaded(water))
    },
  }
}

export default withFitquestService()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AllSetScreen),
)
