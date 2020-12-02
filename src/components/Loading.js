// import React from 'react'
// import { View, Text } from 'react-native'

// export default function Loading() {
//     return (
//         <View>
//             <Text>loading</Text>
//         </View>
//     )
// }
import React,{ useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { Video } from 'expo-av';

export default function Loading() {
    const { colors } = useTheme();
    let [user, setUser]= useState();

    return (
      <View style={styles.container}>
          <StatusBar  barStyle="light-content"/>
        <View style={styles.header}>
        <Video
      source={require('../../assets/LogoAnimated/Untitled-3.mp4')}
      style={styles.backgroundVideo}
      rate={1}
      shouldPlay={true}
      isLooping={true}
      volume={1}
      muted={true}
      resizeMode="cover"
      />
        </View>
      </View>
    );
};


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#189ad3'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:100,
      height:100,
      marginLeft:150,
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  backgroundVideo: {
    position: 'absolute',
   width: 200,
   height: 200,
   //marginLeft:200
  }
});
