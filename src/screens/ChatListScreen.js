import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
import io from 'socket.io-client';

import { AsyncStorage } from 'react-native';
// import Navigator from '../../navigation/Navigator'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../components/Loading';
import tracker from '../api/tracker';





class ChatListScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       UserDATA:null,
       ConvDATA:null,
      chats: [],
      UserId: null
      
    };

    this.getUsers = this.getUsers.bind(this);
    this.getConversation = this.getConversation.bind(this);
  }


  getConversation = () =>{      
      tracker
      .get(`/Conversation/myConversation/${this.state.UserId}`)
      .then((res) => {
        console.log(res.data);
       this.setState({ConvDATA: res.data})
      })
      .catch((err) => {
        
        console.log(err);
      });
      
    }
  

  
  getUsers = () =>{ 
      
      tracker
      .get(`/user`)
      .then((res) => {
        console.log(res.data);
        this.setState({UserDATA: res.data.filter(u => u.id!==this.state.UserId)})
      })
      .catch((err) => {
        
        console.log(err);
      });
      
  
  }
  //catch the current user id
  componentDidMount() {
    AsyncStorage.getItem('UserId') 
      .then((UserId)=>{        
        this.setState({UserId: UserId});
        this.getUsers()
       this.getConversation()
      })
      .catch((err)=>{
        console.log(err);
      })      
  
  }
  // componentDidMount() {
  //   //get previous messages
  //   this.getMessages();

  //   //start socket connections
  //   this.socket = io('https://frozen-citadel-48963.herokuapp.com/chatsocket');
  //   this.socket.connect();
  //   this.socket.on('incommingMessage', () => {
  //     console.log('called');
  //     this.getMessages();
  //   });
  // }

  // getMessages = async () => {
  //   try {
  //     let response = await axios.get(
  //       'https://frozen-citadel-48963.herokuapp.com' +
  //         '/chats/' +
  //         this.state.userId,
  //     );
  //     if (response.status === 200) {
  //       let chats = [];
  //       for (var i = 0; i < response.data.length; i++) {
  //         if (response.data[i].sender == this.state.userId) {
  //           await axios
  //             .get(
  //               'https://frozen-citadel-48963.herokuapp.com/find/' +
  //                 response.data[i].reciever,
  //             )
  //             .then(res => {
  //               const chatItem = {
  //                 message: response.data[i].messages[0].text
  //                   ? response.data[i].messages[0].text
  //                   : 'Sent an image',
  //                 user: res.data,
  //               };
  //               chats.push(chatItem);
  //             });
  //         } else {
  //           await axios
  //             .get(
  //               'https://frozen-citadel-48963.herokuapp.com/find/' +
  //                 response.data[i].sender,
  //             )
  //             .then(res => {
  //               const chatItem = {
  //                 message: response.data[i].messages[0].text
  //                   ? response.data[i].messages[0].text
  //                   : 'Sent an image',
  //                 user: res.data,
  //               };
  //               chats.push(chatItem);
  //             });
  //         }
  //       }
  //       this.setState({
  //         chats: chats,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  render() {
    
    
    return !this.state.UserDATA || !this.state.ConvDATA  ? <Loading></Loading> :  (
      <View>
        <Text
          style={{
            color: '#189AD3',
            fontSize: 36,
            padding: '5%',
            paddingLeft: '7%',
           
          }}>
          Conversations
        </Text>
        <View>
          <ScrollView
            style={{
              paddingHorizontal: '7%',
              marginBottom: '18%',
              paddingBottom: '1.5%',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  marginVertical: '2%',
                  paddingVertical: '4%',
                  borderRadius: 10,
                }}>
                <Image
                  source={{
                    uri: 'https://i.imgur.com/4vzW11a.png',
                  }}
                  style={{width: 60, height: 60, borderRadius: 70}}
                />
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'column',
                    marginHorizontal: '5%',
                    marginTop: '1%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      
                      color: '#7a7a7a',
                    }}>
                    Broadcast
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      
                      color: 'lightgrey',
                    }}>
                    Chat with the global community
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {this.state.UserDATA.map((user, index) => (
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('chatUser')}>
                
                <View
                key={{index}}
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    marginVertical: '2%',
                    paddingVertical: '4%',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: user.profileImage,                      
                    }}
                    style={{width: 60, height: 60, borderRadius: 70}}
                   
                  />
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      marginHorizontal: '5%',
                      marginTop: '1%',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        
                        color: '#7a7a7a',
                      }}>
                      {user.userName}
                      
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        
                        color: 'black',
                      }}>
                      {user.messageId}
                     
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ChatListScreen;