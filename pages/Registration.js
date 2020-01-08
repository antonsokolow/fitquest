import React from 'react'
import {Dimensions, StatusBar, View, ScrollView, StyleSheet} from 'react-native'
import styles from './style'

import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {profileLoaded} from '../store/actions'
import Button from '../components/Button'
import {Sex, One, Two, Three} from '../components/Questionnaire'

let screenWidth = Dimensions.get('window').width

const questionnaire = [1, 2, 3, 4]
class RegistrationScreen extends React.Component {
  state = {
    page: 0,
    profile: {
      sex: null,
      goal: null,
      growth: null,
      weight: null,
      wweight: null,
      level: null,
    },
    isButtonDisabled: true,
  }

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.page !== this.state.page) {
      this.myRef.current.scrollTo({
        x: screenWidth * this.state.page,
        y: 0,
        animated: true,
      })
    }
  }

  setProfileValue = (key, value) => {
    this.setState(({profile}) => {
      profile[key] = value
      this.props.profileLoaded(profile)
      return {
        profile: profile,
        isButtonDisabled: false,
      }
    })
  }

  handleScroll = e => {
                        // scroll animation ended
                        //TODO 
                      }

  onNext = () => {
    if (this.state.page + 1 < questionnaire.length) {
      this.setState(state => {
        const disabled = state.page < 1
        return {
          page: state.page + 1,
          isButtonDisabled: disabled,
        }
      })
    } else {
      this.onRegister()
    }
  }

  onRegister = () => {
    const {navigation} = this.props
    navigation.navigate('Purchase', {
      action: 'registration',
    })
    return
  }

  render() {
    const {profile, isButtonDisabled} = this.state
    return (
      <View style={styles.justify}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          ref={this.myRef}
          horizontal={true}
          scrollEnabled={true}
          pagingEnabled={true}
          onMomentumScrollEnd={this.handleScroll}>
          <Sex setProfileValue={this.setProfileValue} sex={profile.sex} />
          <One
            setProfileValue={this.setProfileValue}
            sex={profile.sex}
            goal={profile.goal}
          />
          <Two
            setProfileValue={this.setProfileValue}
            sex={profile.sex}
            growth={profile.growth}
            weight={profile.weight}
            wweight={profile.wweight}
          />
          <Three
            setProfileValue={this.setProfileValue}
            sex={profile.sex}
            level={profile.level}
          />
        </ScrollView>
        <View style={styles.absolute}>
          <Button
            text="Далее"
            theme="success"
            onPress={this.onNext}
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileLoaded: profile => {
      dispatch(profileLoaded(profile))
    },
  }
}

export default withFitquestService()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RegistrationScreen),
)
