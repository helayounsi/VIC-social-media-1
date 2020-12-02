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
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
               source={require('../../assets/LogoImage/VIC.png')}
               style={styles.logo}
               resizeMode="stretch"
            />
        </View>
        {/* <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Loading wait for a second!</Text>
            <Text style={styles.text}>Stay connected</Text>
        </Animatable.View> */}
      </View>
    );
};

// export default Loading;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#189ad3'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
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
   width: 500,
   height: 420
  }
});
