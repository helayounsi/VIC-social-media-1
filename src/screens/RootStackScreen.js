import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode= 'none'>
        <RootStack.Screen name="Landing" component={LandingScreen}/>
        <RootStack.Screen name="Login" component={LoginScreen}/>
        <RootStack.Screen name="SignUp" component={SignUpScreen}/>
        <RootStack.Screen name="Home" component={HomeScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;