import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatScreen from './ChatScreen'
import { View } from 'react-native-animatable'
import { List } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'

export default class ChatListScreen extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <View>
            <FlatList>sdsdsdsds</FlatList>
            </View>
            
        )
    }
}
