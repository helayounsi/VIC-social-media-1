import * as react from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, RefreshControlComponent, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/Home.js';
import Profile from './src/screen/Profile.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/screen/RootStack.js'





const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer  >
      <RootStack/>
      {/* <Stack.Navigator initialRouteName={LoginScreen}>
        <Stack.Screen        
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
         {/* <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            /> */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
    </SafeAreaProvider>
       
      
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
