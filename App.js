import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//importing screens
import Search from './Screens/SearchScreen';
import Transaction from './Screens/Transaction'

//import navigation
 import { createAppContainer } from 'react-navigation';
 import {createBottomTabNavigator} from 'react-navigation-tabs'
 import Ionicons from 'react-native-vector-icons/Ionicons';


export default class App extends React.Component {
  render() {
    return (
      <View>
<AppContainer/>
      </View>


  );
}
}

const TabNavigator = createBottomTabNavigator({
  Transaction: { screen: Transaction},
  Search: { screen: Search},
})

const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58355E'
  },
  text:{
    fontSize:30,
    fontWeight: 'bold',
    color: '#FFF689'
  }
});
