import {
  View,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Text,
  BackHandler,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import React, { Component } from "react";
import io from "socket.io-client";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from "react-native-gifted-chat";
// import Navigator from "../../navigation/Navigator";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import tracker from "../api/tracker";
import Loading from "../components/Loading";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convId: null,
      userId: null,
      chatMessage: "",
      chatMessages: [],
      chatAlert: false,
    };
    //this.submitChatMessage = this.submitChatMessage.bind(this);
    this.transformMsg = this.transformMsg.bind(this);
  }

  transformMsg(msgs) {
    const mm = msgs.map((m, index) => ({
      _id: m.id,
      text: m.content,
      createdAt: m.createdAt,
      user: {
        _id: m.userId,
        name: m.User.userName,
        avatar: m.User.profileImage,
      },
    }));
    return mm;
  }

  componentDidMount() {
    AsyncStorage.getItem("UserId").then((data) => {
      this.setState({ convId: this.props.route.params.idConv, userId: data });
      console.log(this.state.userId);
      tracker
        .get(`/message/mymessage/${this.state.convId}`)
        .then((res) => {
          //console.log(res.data);
          const msg = this.transformMsg(res.data);
          // console.log(msg);
          this.setState({ chatMessages: msg });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.socket = io("wss://vic-corporation.herokuapp.com/");

    this.socket.on("chat message", (msg) => {
     
      this.setState((previousState) => ({
        chatMessages: GiftedChat.append(previousState.chatMessages, msg),
      }));
    });
  }
  submitChatMessage(message) {
    console.log(message);
    this.setState((previousState) => ({
      chatMessages: GiftedChat.append(previousState.chatMessages, message),
    }));
    //console.log(this.state.convId);
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const body = JSON.stringify({
      content: message.text,
      conversationId: this.state.convId,
      userId: this.state.userId,
    });
    tracker
      .post(`/message/addmessage`, body, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.socket.emit("chat message", message);
  }

  //styling chat bubbles
  renderBubble = (props) => {
    return (
      <Bubble
        {...this.state.chatMessages}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#46CF76",
          },
          left: {
            backfroundColor: "#aaa",
          },
        }}
      />
    );
  };
  renderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: "#F2F2F2",
            borderTopWidth: 1,
            marginHorizontal: 10,
            marginLeft: "12%",
            borderRadius: 80,
            borderColor: "#189AD3",
          }}
          textInputProps={{
            style: {
              color: "#189AD3",
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 20,
              borderColor: "black",
            },
            multiline: false,
            returnKeyType: "go",
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            marginLeft: "4%",
            marginBottom: "1%",
            bottom: 0,
          }}
          onPress={this.handleChoosePhoto}
        >
          <Icon
            name="ios-analytics"
            style={{
              color: "#F2F2F2",
            }}
            size={32}
          />
        </TouchableOpacity>
      </>
    );
  };

  renderSend = (props) => {
    return (
      <>
        <Send {...props}>
          <Icon
            name="ios-arrow-dropright-circle"
            style={{
              color: "#189AD3",
              marginRight: "0%",
              marginBottom: "30%",
            }}
            size={32}
            // onPress={this.submitChatMessage}
          />
        </Send>
      </>
    );
  };

  render() {
    /*
    const chatMessages = this.state.chatMessages.map((chatMessage, i) => (
      <Text
        style={{ borderWidth: 1, top: 800, flexDirection: "column" }}
        key={i}
      >
        {chatMessage}
      </Text>
    ));*/
    return !this.state.userId ? (
      <Loading></Loading>
    ) : (
      <>
        <StatusBar backgroundColor="#189ad3" barStyle="light-content" />

        <View style={{ backgroundColor: "#189ad3", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              height: "8%",
              width: "100%",
              backgroundColor: "#189AD3",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: "4%",
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon
                name="ios-arrow-back"
                size={32}
                style={{ color: "#F2F2F2" }}
              />
            </TouchableOpacity>
            <Icon
              name="ios-call"
              size={32}
              style={{ color: "#F2F2F2" }}
              onPress={() => this.props.navigation.navigate("chatUser")}
            />
            <Text
              name="ios-home"
              style={{
                flex: 1,
                fontSize: 18,
                color: "#f2f2f2",
                textAlign: "center",
              }}
            ></Text>
            <Icon name="ios-home" size={32} style={{ opacity: 0, flex: 1 }} />
          </View>
          <GiftedChat
            listViewProps={{
              style: {
                backgroundColor: "#F2F2F2",
              },
            }}
            user={{ _id: +this.state.userId }}
            alwaysShowSend={true}
            messages={this.state.chatMessages}
            renderInputToolbar={this.renderInputToolbar}
            renderUsernameOnMessage={true}
            value={this.state.chatMessage}
            onSend={(message) => this.submitChatMessage(message)}
            onInputTextChanged={(chatMessage) => {
              
              this.setState({ chatMessage });
            }}
          />
          <View
            style={{
              height: "1%",
              width: "100%",
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
