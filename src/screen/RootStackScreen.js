import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './Landing';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode= 'none'>
        <RootStack.Screen name="Landing" component={LandingScreen}/>
        <RootStack.Screen name="Login" component={LoginScreen}/>
        <RootStack.Screen name="SignUp" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;