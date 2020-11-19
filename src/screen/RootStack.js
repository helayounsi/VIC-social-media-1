import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Landing from './Landing';
import LoginScreen from './Login.js';
import SignUp from './SignUp';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode= 'none'>
        <RootStack.Screen name="Landing" component={Landing}/>
        <RootStack.Screen name="Loginscreen" component={LoginScreen}/>
        <RootStack.Screen name="SignUp" component={SignUp}/>
    </RootStack.Navigator>
);

export default RootStackScreen;