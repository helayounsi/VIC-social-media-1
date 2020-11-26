import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatScreen from './ChatScreen'
import { View } from 'react-native-animatable'
import { List } from 'react-native-paper'

export default class ChatListScreen extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <View>
                <List>
                <ChatScreen/>
                </List>
               
            </View>
        )
    }
}
