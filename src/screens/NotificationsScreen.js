import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const NotificationsScreen = props =>{
  return (<View style={styles.ProfileScreen}>
    <Text>This is the NotificationScreen !</Text>
  </View>)
}; 


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default NotificationsScreen ;