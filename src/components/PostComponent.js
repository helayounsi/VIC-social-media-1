import React, { Component, useState, useEffect, useCallback } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Share,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { Video } from 'expo-av';
import { AsyncStorage ,RefreshControl} from 'react-native';
import Loading from "./Loading";
import tracker from "../api/tracker";

const PostComponent = ({ navigation }) => {
  const [imageCam, setImageCam] = useState(null);
  const [posts, setPosts] = useState(null);
  let post = [
    "https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320",
    "https://bloximages.chicago2.vip.townnews.com/mymcr.net/content/tncms/assets/v3/editorial/a/6c/a6c39bd0-b325-11ea-9027-334715b6d420/5eee587f1da77.image.jpg?resize=1200%2C922",
    "https://cdn.pizap.com/pizapfiles/images/photo_effects_filters_app05.jpg",
    "https://photolemur.com/img/home/top-slider/after-1440.jpg",
    "https://photolemur.com/uploads/blog/unnamed.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  ];


  const [refreshing, setRefreshing] = useState(false);
  
 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    tracker
    .get("/post")
    .then((res) => {
      console.log(res.data);
      setPosts(res.data.sort((a, b) => a.createdAt<b.createdAt));
      setRefreshing(false)
    })
    .catch((err) => { 
      //console.log(123);
      // console.log(err);
    });
 
  }, []);

  // let media= ["https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320", "https://bloximages.chicago2.vip.townnews.com/mymcr.net/content/tncms/assets/v3/editorial/a/6c/a6c39bd0-b325-11ea-9027-334715b6d420/5eee587f1da77.image.jpg?resize=1200%2C922","https://cdn.pizap.com/pizapfiles/images/photo_effects_filters_app05.jpg", "https://photolemur.com/img/home/top-slider/after-1440.jpg","https://photolemur.com/uploads/blog/unnamed.jpg","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"]

  // useEffect (() => {
  //   axios.get('http://localhost:3000/User')
  //      .then (response => {
  //       console.log(response, 'hello')
  //      });
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
    
       
  // }, []);
  const [userid, setUserid]=useState(null);
  //catch the current user id
  useEffect(() => {
  AsyncStorage.getItem('UserId', (err, data)=>{
    setUserid(data);
    // console.log(userid)
})
})


  const LeftContent = (img) => (
    img? <Avatar.Image
    size={45}
    source={{uri:img}}
  />:
    <Avatar.Image
      size={45}
      source={require("../../assets/profile-photo/me.png")}
    />
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const getPosts = () => {
    tracker
      .get("/post")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.sort((a, b) => a.createdAt<b.createdAt));
      })
      .catch((err) => { 
        //console.log(123);
        // console.log(err);
      });
  };


  //sending image to cloudinary
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

     getPosts();
   }, []);

  // Pick image from gallery
  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setImageCam(data);
    if (!data.cancelled) {
      handelPost();
    }
  };
  //console.log(imageCam);


  // Pick image from camera
  const pickFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status == "granted") {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      setImageCam(data);
      if (!data.cancelled) {
        handelPost();
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  

  //pick video from gallery
  const pickDocument = async () => {
    let data = await DocumentPicker.getDocumentAsync({ type: "video/*" });

    setImageCam(data);
  };


  //toggel a model
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [value, onChangeText] = React.useState("");
  // const [text, onChangeText] = React.useState("");

  //onchange comment
  const onChangeComment = (text) => {
     console.log(text);
      const data ={
        comment: text,
      }
      tracker.post("/comment/addComment", body, config)
      .then ((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
      .catch((err)=>{
        console.log(err);
      })
      
  }

  const handelPost = () => {
    if(imageCam){

   
    let base64Img = `data:image/jpg;base64,${imageCam.base64}`;
    const data = {
      file: base64Img,
      upload_preset: "postInMainPage",
    };
    fetch("https://api.cloudinary.com/v1_1/vic2021/image/upload", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then(async (res) => {
        let r = await res.json();
       //console.log('res '+r.secure_url);
        setModalOpen(false);

        // add new post

        const config = {
          headers: {
            "Content-Type": "Application/json",
          },
        };
        const body = JSON.stringify({
          content: value,
          userId:userid,
          //this is the url from cloudinary that we have to send to the server then to the DB
           fileUrl: r.secure_url,
         
        });
      //  console.log('fileUrl:' +r.secure_url)
       //cloudres=r.secure_url
       //send a opost request to clever cloud DB
       tracker.post("/post/addPost", body, config)
       .then((res) => {
            // console.log(res.data);
            getPosts()
          })
          .catch((err) => {
           console.log('err:' +err);
          });
          
      })
      .catch((err) => console.log(err));
     }
  };

   
  return ( !posts ? (
    <Loading></Loading>
  ) : (

   <SafeAreaView>
      {/* add a post input */}
      <View style={{ backgroundColor: "#fff" }}>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
              marginLeft: 40,
            },
          ]}
        >
          Share what is in your mind?
        </Text>

        <Modal visible={modalOpen} animationType="slide" transparent={true}>
          <View
            style={{
              height: "100%",
              marginTop: "auto",
              backgroundColor: "white",
            }}
          >
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 15,
                  marginLeft: 40,
                },
              ]}
            >
              Share it here
            </Text>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={6}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              placeholder="Add description"
            />
            <View style={styles.modalButtonView}>
              <Button icon="camera" onPress={pickFromCamera}>
                Image from camera
              </Button>
              <Button icon="image-area" onPress={pickImage}>
                Image from gallery
              </Button>
              <Button icon="video" onPress={pickDocument}>
                Video from gallery
              </Button>
            </View>
            <Button onPress={() => handelPost()}>Add my Post</Button>
          </View>
        </Modal>
        <Button icon="pencil" onPress={() => setModalOpen(true)}>
          Add a post
        </Button>
        <ScrollView fadingEdgeLength={100}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <View style={{ justifyContent: "center" }}>
            {posts.filter(post => post.fileUrl).map((item, index) => {
              // console.log(item);
              if ( 
                item.fileUrl.includes(".jpg") ||
                item.fileUrl.includes(".jpeg") ||
                item.fileUrl.includes(".png") ||
                item.fileUrl.includes(".gif")
              ) {
                return (
                  <Card key={index}>
                    <Card.Title
                      title={item.User.userName}
                      subtitle={item.content}
                      left={()=>LeftContent(item.User.profileImage)}
                    />

                    <Card.Cover key={index} source={{ uri: item.fileUrl }} />
                    <Card.Content>
                      <View style={styles.feed}>
                        <Button
                          style={styles.feed}
                          icon={require("../../assets/profile-photo/like.png")}
                          color={"#189ad3"}
                        >
                          Like
                        </Button>

                        {/* </Button> */}
                        <Modal
                          visible={modalOpen1}
                          animationType="slide"
                          transparent={true}
                        >
                          <View
                            style={{
                              height: "30%",
                              marginTop: "auto",
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={[
                                styles.text_footer,
                                {
                                  marginTop: 15,
                                  marginLeft: 80,
                                },
                              ]}
                            >
                              Comment it here
                            </Text>
                            <TextInput
                              style={styles.inputComment}
                              onChangeComment={(text) => onChangeComment(text)}
                              value={value}
                              placeholder="Comment"
                            />
                            <Button onPress={() => setModalOpen1(false)}>
                              Add My Comment
                            </Button>
                          </View>
                        </Modal>
                        <Button
                          style={styles.feed}
                          icon={require("../../assets/profile-photo/Comment.png")}
                          color={"#189ad3"}
                          onPress={() => setModalOpen1(true)}
                        >
                          Comment
                        </Button>
                        <Button
                          icon={require("../../assets/profile-photo/share.png")}
                          onPress={onShare}
                          color={"#189ad3"}
                        >
                          Share
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                );
              } else if (item.fileUrl.includes(".mp4")) {
                return (
                  <Card key={index}>
                    <Card.Title
                       title={item.userId}
                       subtitle={item.content} 
                      left={()=>LeftContent(item.User.profileImage)}
                    />
                    <Video
                      key={index}
                      source={{ uri: item.fileUrl }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      resizeMode="cover"
                      autoPlay={true}
                      shouldPlay={true}
                      isLooping={true}
                      style={styles.card}
                    />
                    <Card.Content>
                      <View style={styles.feed}>
                        <Button
                          style={styles.feed}
                          icon={require("../../assets/profile-photo/like.png")}
                          color={"#189ad3"}
                        >
                          Like
                        </Button>
                        <Modal
                          visible={modalOpen1}
                          animationType="slide"
                          transparent={true}
                        >
                          <View
                            style={{
                              height: "30%",
                              marginTop: "auto",
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={[
                                styles.text_footer,
                                {
                                  marginTop: 15,
                                  marginLeft: 40,
                                },
                              ]}
                            >
                              Comment it here
                            </Text>
                            <TextInput
                              style={styles.inputComment}
                              onChangeComment={(text) => onChangeComment(text)}
                              value={value}
                            />
                            <Button onPress={() => setModalOpen1(false)}>
                              Add my Comment
                            </Button>
                          </View>
                        </Modal>
                        <Button
                          style={styles.feed}
                          icon={require("../../assets/profile-photo/Comment.png")}
                          color={"#189ad3"}
                          onPress={() => setModalOpen1(true)}
                        >
                          Comment
                        </Button>
                        <Button
                          icon={require("../../assets/profile-photo/share.png")}
                          onPress={onShare}
                          color={"#189ad3"}
                        >
                          Share
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
  )
};
export default PostComponent;

const styles = StyleSheet.create({
  feed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: 330,
    height: 450,
    margin: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    width: 340,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8,
  },
  inputComment: {
    borderWidth: 1,
    borderColor: "#777",
    width: 340,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
})

