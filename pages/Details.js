import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styles from './style';
import Button from '../components/Button';
import SetItem from '../components/SetItem';

class DetailsScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1,}}>
        <StatusBar barStyle="light-content" />
        <View style={{flex:1, backgroundColor:'#2BAB5C', justifyContent:'center', alignItems:'center',paddingTop:40,}}>
          <Text style={{color:'#fff', fontSize:22, textTransform:'uppercase',}}>Время отдыха</Text>
          <Text style={{color:'#fff', fontSize:70, textTransform:'uppercase', fontWeight:'800'}}>00:59</Text>
        </View>
        <View style={{backgroundColor:'#2BAB5C',paddingBottom:20,}}>
          <Button
              text="ПРОПУСТИТЬ ОТДЫХ"
              theme="success"
              onPress={() => navigation.push('WorkoutDone')}
          />
        </View>
        <View style={{paddingHorizontal:20, paddingTop:20,}}>
          <SetItem
            description="Становая тяга"
            numb="15"
            img="https://pp.userapi.com/c631229/u308541352/video/l_c8357cb7.jpg"
          />
        </View>
      </View>
    );
  }
}

export default DetailsScreen;
