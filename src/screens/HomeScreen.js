import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import { Video } from 'expo-av';


const HomeScreen = props =>{
  return (
   <SafeAreaView>
  <View style={styles.ProfileScreen}>
    <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={{ width: 400, height: 300 }}
/>
    <Text>This is the Home Screen!</Text>
  </View> </SafeAreaView>)
}; 


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default HomeScreen ; 

