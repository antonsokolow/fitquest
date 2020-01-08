import React from 'react'
import {
  ImageBackground,
  StatusBar,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native'
import styles from '../pages/style'
import WorkoutItem from '../components/WorkoutItem'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'

let screenWidth = Dimensions.get('window').width
class ProgramScreen extends React.Component {
  state = {
    items: null,
    name: null,
    backgroundImage: null,
    error: false,
    slideIndex: 0,
  }

  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  componentDidMount() {

    const {navigation, fitquestService} = this.props
    const programId = navigation.getParam('programId', null)
    if (programId == null) {
      return
    }

    fitquestService.networkManager
      .fetchProgram(programId)
      .then(this.onDataLoaded)
      .catch(this.onNetworkError)
  }

  onDataLoaded = data => {
    if (!data.data) {
      this.setState({
        error: true,
        networkError: false,
      })
      return
    }
    let index = data.data.workouts.reduce((a, value, i) => {
      if (value.done) {
        return i === data.data.workouts.length - 1 ? a : i + 1
      } else {
        return a
      }
    }, 0)

    this.setState({
      items: data.data.workouts,
      name: data.data.name,
      backgroundImage: data.data.backgroundImage,
      error: false,
      slideIndex: index,
    })

    setTimeout(() => {
      this.myRef.current.scrollTo({
        x: screenWidth * index,
        y: 0,
        animated: true,
      })
    }, 400)
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
    const {name, backgroundImage, items} = this.state
    const {navigation} = this.props
    let content = null
    if (!items) {
      content = <Text>Идет загрузка</Text>
    } else {
      const workoutItems = items.map((item, i, array) => {
        const {id} = item
        const isEnabled =
          'undefined' === typeof array[i - 1] ? true : array[i - 1].done

        return (
          <WorkoutItem
            data={item}
            navigation={navigation}
            key={id}
            isEnabled={isEnabled}
          />
        )
      })
      content = (
        <ImageBackground
          source={{
            uri: backgroundImage,
          }}
          style={[styles.topView]}>
          <StatusBar barStyle="light-content" />
          <View style={[styles.trCont]}>
            <View style={[styles.bBox]}>
              <Text style={[styles.h2, styles.white]}>{name}</Text>
            </View>

            <ScrollView
              ref={this.myRef}
              style={[styles.mb4]}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              scrollIndicatorInsets={{
                top: 10,
                left: 10,
                bottom: 10,
                right: 10,
              }}>
              {workoutItems}
            </ScrollView>
          </View>
        </ImageBackground>
      )
    }
    return <View>{content}</View>
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile,
  }
}

export default withFitquestService()(connect(mapStateToProps)(ProgramScreen))
