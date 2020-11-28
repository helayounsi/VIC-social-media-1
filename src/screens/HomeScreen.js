import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import { Video } from 'expo-av';
// import PostComponent from '../components/PostComponent';

const HomeScreen = props =>{
  return (
   <SafeAreaView style={styles.container}>
  <View>
  <PostComponent/>
  </View>
  
   </SafeAreaView>)
}; 





export default HomeScreen ; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});