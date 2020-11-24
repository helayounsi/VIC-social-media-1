import {View, Text, StyleSheet} from 'react-native'
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
 }
 componentDidMount() {
  this.socket = io("http://127.0.0.1:3000");
   this.socket.on("chat message", msg => {
         this.setState({ chatMessages: [...this.state.chatMessages, msg] 
            
    });
    console.log(msg)
 });
}
submitChatMessage() {
  this.socket.emit('chat message', this.state.chatMessage);
  this.setState({chatMessage: ''});
}
render() {
  const chatMessages = this.state.chatMessages.map((chatMessage, index) => (
    <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
  ))
return(
  <View style={styles.container}>
{chatMessages}
<TextInput 
style={{height: 40, borderWidth: 2, top: 600}}
autoCorrect={false}
value={this.state.chatMessage}
onSubmitEditing={() => this.submitChatMessage()}
onChangeText={chatMessage =>{
  this.setState({chatMessage});
}}
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