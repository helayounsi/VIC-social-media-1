import {View, Text, StyleSheet, Button, ScrollView} from 'react-native'
import React, { Component } from 'react'
import io from 'socket.io-client';
import { TextInput } from 'react-native-paper';
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chatMessage: "",
       chatMessages: []
    };
    this.submitChatMessage = this.submitChatMessage.bind(this);
 }
 componentDidMount() {
  this.socket = io("http://192.168.11.109:3000");
   this.socket.on("chat message", msg => {
         this.setState({ chatMessages: [...this.state.chatMessages, msg] 
            
    });
    // console.log(msg)
 });
}
submitChatMessage() {
  this.socket.emit('chat message', this.state.chatMessage);
  this.setState({chatMessage: ''});
}
render() {
  const chatMessages = this.state.chatMessages.map((chatMessage, i) => (
    <Text style={{borderWidth: 2, top: 500}} key={i}>{chatMessage}</Text>
  ))
 
return(
  <View style={styles.container}>
    <View>
{chatMessages}
</View>
<TextInput 
style={{height: 40, borderWidth: 2, top: 600}}
autoCorrect={false}
value={this.state.chatMessage}
onSubmitEditing={() => this.submitChatMessage()}
onChangeText={chatMessage =>{
  this.setState({chatMessage});
}}
/>
<Button
        title="Press me"
        onPress={this.submitChatMessage}
      />
  </View>
)
}};

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});