import React, {Component} from 'react'
import {View, Image, Text, StatusBar} from 'react-native'
import auth, {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk'
import styles from './style'
import Button from '../components/Button'
import ProfileList from '../components/ProfileList'
import {ScrollView} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {profileLoaded, waterLoaded} from '../store/actions'
import SelectModal from '../components/Questionnaire/questionaryModal'

class ProfileScreen extends Component {
  state = {
    initilizing: true,
    user: null,
    displayName: null,
    picture: null,
    activeModal: null,
  }
  componentWillUnmount() {
    this._navListener.remove()
  }

  setInitilizing = value => {
    this.setState({
      initilizing: value,
    })
  }

  setUser = user => {
    this.setState({
      user: user,
    })
  }

  setProfile = profile => {
    this.setState({
      profile: profile,
    })
  }

  componentDidMount() {
    // Handle user state changes
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChanged)
    this._navListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        StatusBar.setBarStyle('dark-content')
      },
    )
  }

  componentWillUnmount() {
    this.subscriber()
  }

  onAuthStateChanged = async user => {
    if (user) {
      if (!user.isAnonymous) {
        this.getFacebookAvatar()
      }
    } else {
      // User is signed out
      this.setState({
        picture: null,
      })
      //signInAnonymously()
    }

    this.setUser(user)
    if (this.state.initilizing) {
      this.setInitilizing(false)
    }
  }

  getFacebookAvatar = async () => {
    try {
      const currentAccessToken = await AccessToken.getCurrentAccessToken()
      if (currentAccessToken == null) {
        return
      }
      const graphRequest = new GraphRequest(
        '/me',
        {
          accessToken: currentAccessToken.accessToken,
          parameters: {
            fields: {
              string: 'picture.type(large), name',
            },
          },
        },
        (error, result) => {
          if (error) {
                       //TODO ErrorManager
                     } else {
            this.setState({
              picture: result.picture.data.url,
              displayName: result.name,
            })
          }
        },
      )

      new GraphRequestManager().addRequest(graphRequest).start()
    } catch (error) {
      console.error(error)
    }
  }

  updateUserProfile = async () => {
    const currentUser = auth().currentUser
    try {
      await currentUser.updateProfile({
        displayName: 'Антон Соколов',
      })
    } catch (e) {
                  errorManager(e.message)
                }
  }

  setProfileValue = (key, value) => {
    const profile = this.props.profile.profile
    const {fitquestService} = this.props
    profile[key] = value
    fitquestService.firebaseManager
      .createDocumentWithPromise('profile', profile)
      .then(result => {
        this.props.profileLoaded(profile)
        if ((key = 'weight')) {
          let dailyNorm = profile.sex === 'm' ? value * 35 : value * 31
          let water = this.props.water.water
          this.props.waterLoaded({
            dailyNorm: dailyNorm,
            level: water.level,
          })
        }
      })
      .catch(error =>
        errorManager(error),
      )
  }

  setActiveModal = activeModal => {
    this.setState({
      activeModal: activeModal,
    })
  }

  render() {
    let {user, picture, activeModal, displayName} = this.state
    const {fitquestService} = this.props
    const profile = this.props.profile.profile
    if (displayName == null) {
      displayName = 'Профиль'
    }

    const avatar = picture
      ? {uri: picture}
      : profile.sex === 'm'
      ? require('../components/images/AvatarM.png')
      : require('../components/images/AvatarF.png')

    return (
      <>
        <ScrollView
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40,
            paddingTop: 20,
            flex: 1,
          }}>
          <View style={{padding: 20, marginBottom: 20}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={avatar}
                style={{width: 120, height: 120, borderRadius: 120}}
              />
            </View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '800',
                marginTop: 20,
                marginBottom: 10,
                textAlign: 'center',
              }}>
              {displayName}
            </Text>

            {user && user.isAnonymous && (
              <>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#747E9D',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  Авторизуйтесь, чтобы сохранить свой прогресс
                </Text>
                <Button
                  style={[styles.white, styles.p16, styles.uppText]}
                  text="Facebook"
                  theme="blue"
                  onPress={() => this.facebookLinkToAnonymous()}
                />
              </>
            )}
            {!user && (
              <Button
                text="Continue with Facebook"
                onPress={() => this.facebookLogin()}
              />
            )}
          </View>

          <Text style={[styles.p16, styles.uppText, styles.fw600, styles.mb1]}>
            Параметры
          </Text>
          <ProfileList
            text="Рост"
            znach="см"
            value={profile.growth}
            item="growth"
            img={require('../components/images/hh.png')}
            onPress={this.setActiveModal}
          />
          <ProfileList
            text="Вес"
            znach="кг"
            value={profile.weight}
            item="weight"
            img={require('../components/images/ves.png')}
            onPress={this.setActiveModal}
          />
          <ProfileList
            text="Желаемый вес"
            znach="кг"
            value={profile.wweight}
            item="wweight"
            img={require('../components/images/point.png')}
            onPress={this.setActiveModal}
          />
        </ScrollView>
        <SelectModal
          growth={profile.growth}
          weight={profile.weight}
          wweight={profile.wweight}
          setValue={this.setProfileValue}
          activeModal={activeModal}
          setActiveModal={this.setActiveModal}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile,
    water: state.water,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
  )(ProfileScreen),
)
