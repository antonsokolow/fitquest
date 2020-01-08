import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'

class ErrorView extends Component {
  render() {
    const {networkError} = this.props
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>
          Кажется, что-то пошло не так :( Проверьте интернет-соединение и
          повторите попытку.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default ErrorView
