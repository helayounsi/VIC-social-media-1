import {View, Text, StyleSheet, Button, ScrollView} from 'react-native'
import React, { Component } from 'react'
import io from 'socket.io-client';
import { TextInput } from 'react-native-paper';
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chatMessage: "",
       chatMessages: [],
       chatAlert: false
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
  this.setState({chatMessage: ''},
  this.setState({chatAlert: true}))
 console.log(this.state.chatAlert);
 if (this.state.chatAlert = true) {
  alert("you have a message")
 }
}

// alertm(){
//   if (this.state.chatAlert = true) {
//     console.log("you have a message")
//   }
// }




render() {
  const chatMessages = this.state.chatMessages.map((chatMessage, i) => (
    <Text style={{borderWidth: 1, top: 800, flexDirection:'column'}} key={i}>{chatMessage}</Text>
  ))
 
return(
  <View style={styles.container}>
    <View>
      <Text>Reserved for Video call</Text>
    </View>
    <ScrollView>
    <View>
{chatMessages}
</View>
<TextInput 
style={{ height: 40, borderColor: '#82b8ff', borderWidth: 1, padding: 20, marginRight: 1, marginTop: 800 }}
autoCorrect={false}
value={this.state.chatMessage}
onSubmitEditing={() => this.submitChatMessage()}
onChangeText={chatMessage =>{
  this.setState({chatMessage});
}}
/>
</ScrollView>
<Button
        title="Send"
        onPress={this.submitChatMessage}
      />
  </View>
)
}};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
