import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const OpenCameraScreen = props =>{
  return (<View style={styles.ProfileScreen}>
    <Text>This is the Open Camera Screen!</Text>
  </View>)
}; 


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default OpenCameraScreen ;