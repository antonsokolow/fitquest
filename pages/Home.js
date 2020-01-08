import React from 'react'
import {View, Image, StatusBar, StyleSheet} from 'react-native'
import ProgramGallery from '../components/Scroll'
import styles from './style'
import LoadView from '../components/Load'
import ErrorView from '../components/Error'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import {programsLoaded} from '../store/actions'

class HomeScreen extends React.Component {
  state = {
    error: false,
    networkError: false,
  }

  static navigationOptions = {
    header: {
      visible: false,
    },
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
    })

    const {fitquestService} = this.props
    const profile = this.props.profile
    if (profile == null) {
      return
    }

    fitquestService.networkManager
      .fetchPrograms(profile.sex)
      .then(this.onDataLoaded)
      .catch(this.onNetworkError)
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  onDataLoaded = data => {
    if (!data || !data.data) {
      this.setState({
        error: true,
        networkError: false,
      })
      return
    }
    this.props.programsLoaded(data.data)
    this.setState({
      error: false,
      networkError: false,
    })
  }

  onError = error => {
    this.setState({
      error: true,
    })
  }

  onNetworkError = error => {
    this.setState({
      networkError: true,
    })
  }

  render() {
    let items = this.props.programs
    let {networkError} = this.state
    let content = null
    if (!items) {
      content = <LoadView />
    } else {
      content = (
        <View style={[styles.base]}>
          <ProgramGallery items={items} />
        </View>
      )
    }
    if (networkError) {
      content = <ErrorView />
    }
    return (
      <>
        <View style={{height: 20}} />
        <View style={stylesHome.paddingBottom}>{content}</View>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    programs: state.activity.programs,
    profile: state.profile.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    programsLoaded: programs => {
      dispatch(programsLoaded(programs))
    },
  }
}

export default withFitquestService()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomeScreen),
)

const stylesHome = StyleSheet.create({
  paddingBottom: {flex: 1, paddingBottom: 20},
})
