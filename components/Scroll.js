import React, {Component} from 'react'
import {View} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ProgramItem from '../components/program-item'
import {sliderWidth, itemWidth} from '../pages/SliderStyles'
import styles from '../pages/style'

class ProgramGallery extends Component {
  _renderItem = ({item}) => {
    const {id} = item
    return (
      <View style={[styles.scrollBox]} key={id}>
        <ProgramItem item={item} />
      </View>
    )
  }
  render() {
    const {items} = this.props
    return (
      <Carousel
        ref={c => {
          this._carousel = c
        }}
        data={items}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={2}
      />
    )
  }
}

export default ProgramGallery
