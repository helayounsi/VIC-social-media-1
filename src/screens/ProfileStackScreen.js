import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const ProfileStackScreen = props =>{
  return (<View style={styles.ProfileScreen}>
    <Text>This is the  ProfileStackScreen</Text>
  </View>)
}; 


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default ProfileStackScreen ;