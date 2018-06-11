import React from 'react';
import {
  Text,
  View,
  SafeAreaView
} from 'react-native';
import HomeScreen from './screens/Home';
import ScheduleScreen from './screens/Schedule';
import GalleryScreen from './screens/Gallery';
import ChatScreen from './screens/Chat';
import { createMaterialTopTabNavigator } from 'react-navigation'
// import styled from 'styled-components'

export default class App extends React.Component{
  render(){
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor:'#f2f2f2' }}>
        <AppTabNavigator/>
      </SafeAreaView>
    )
  }
}


const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  Schedule: { 
    screen: ScheduleScreen 
  },
  Gallery: {
    screen: GalleryScreen
  },
  Chat: {
    screen: ChatScreen
  }
}, {
    initialRouteName: 'Home',
    order: ['Home', 'Schedule', 'Gallery', 'Chat'],
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions:{
      activeTintColor:'red',
      inactiveTintColor:'grey',
      upperCaseLabel: 'false',
      pressOpacity: 3,
      style:{
        backgroundColor:'#f2f2f2',
        borderTopWidth: 1,
        borderTopColor: 'grey'
      },
      indicatorStyle: {
        height: 0
      },
      tabStyle: {
        flex: 4,
      },
      labelStyle: {
        fontSize: 6,
      }
    }
  })


