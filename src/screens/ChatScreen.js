import {
  View,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Text,
  BackHandler,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import React, { Component } from 'react'
import io from 'socket.io-client';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from 'react-native-gifted-chat';
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chatMessage: "",
       chatMessages: [],
       chatAlert: false
    };
    // this.submitChatMessage = this.submitChatMessage.bind(this);
 }

//  componentDidMount() {
//   this.socket = io("http://192.168.1.7:3000");
//    this.socket.on("chat message", msg => {
//          this.setState({ chatMessages: [...this.state.chatMessages, msg] 
            
//     });
//     // console.log(msg)
//  });
// }
// submitChatMessage() {
//   this.socket.emit('chat message', this.state.chatMessage);
//   this.setState({chatMessage: ''},
//   this.setState({chatAlert: true}))
//  console.log(this.state.chatAlert);
//  if (this.state.chatAlert = true) {
//   alert("you have a message")
//  }
// }

  //styling chat bubbles
  renderBubble = props => {
    return (
      <Bubble
      {...chatMessages}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#46CF76',
          },
          left: {
            backfroundColor: '#aaa',
          },
        }}
      />
    );
  };
  renderInputToolbar = props => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: '#F2F2F2',
            borderTopWidth: 1,
            marginHorizontal: 10,
            marginLeft: '12%',
            borderRadius: 80,
            borderColor: '#189AD3',

          }}
          textInputProps={{
            style: {
              color: '#189AD3',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 20,
              borderColor: 'black',
            },
            multiline: false,
            returnKeyType: 'go',
            
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            marginLeft: '4%',
            marginBottom: '1%',
            bottom: 0,
          }}
          onPress={this.handleChoosePhoto}>
          <Icon
            name="ios-analytics"
            style={{
              color: '#F2F2F2',
            }}
            size={32}
            
          />
        </TouchableOpacity>
      </>
    );
  };

  renderSend = props => {
    return (
      <>
        <Send {...props}>
          <Icon
            name="ios-arrow-dropright-circle"
            style={{
              color: '#189AD3',
              marginRight: '0%',
              marginBottom: '30%',
            }}
            size={32}
            // onPress={this.submitChatMessage}
          />
        </Send>
      </>
    );
  };

  render() {
    const chatMessages = this.state.chatMessages.map((chatMessage, i) => (
      <Text style={{borderWidth: 1, top: 800, flexDirection:'column'}} key={i}>{chatMessage}</Text>
    ))
    return (
      <>
        <StatusBar backgroundColor="#189ad3" barStyle="light-content" />

        <View style={{backgroundColor: '#189ad3', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              height: '8%',
              width: '100%',
              backgroundColor: '#189AD3',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: '4%',
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name="ios-arrow-back"
                size={32}
                style={{color: '#F2F2F2'}}
              />
            </TouchableOpacity>
            <Text
              name="ios-home"
              style={{
                flex: 1,
                fontSize: 18,
                color: '#f2f2f2',
                textAlign: 'center',
              }}>
              
            </Text>
            <Icon name="ios-home" size={32} style={{opacity: 0, flex: 1}} />
          </View>
          <GiftedChat
            listViewProps={{
              style: {
                backgroundColor: '#F2F2F2',
              },
            }}
            alwaysShowSend={true}
            messages={this.state.messages}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderSend={this.renderSend}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage =>{
            this.setState({chatMessage});
            }}
            
          />
          <View
            style={{
              height: '1%',
              width: '100%',
            }}
          />
        </View>
      </>
    );
  }
}



















 

// alertm(){
//   if (this.state.chatAlert = true) {
//     console.log("you have a message")
//   }
// }




