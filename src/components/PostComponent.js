import React, { Component, useState, useEffect, useCallback } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
  Share,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  Alert,
  Easing
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";
import { Video } from "expo-av";
import { AsyncStorage, RefreshControl } from "react-native";
import Loading from "./Loading";
import tracker from "../api/tracker";
import * as Animatable from 'react-native-animatable'
import {AntDesign}from '@expo/vector-icons'

const PostComponent = ({ navigation }) => {
  const [imageCam, setImageCam] = useState(null);
  const [posts, setPosts] = useState(null);
  const [Postid, setPostid] = useState(null);
  const [comment, setComment] = useState(null);
   const [comments, setComments] = useState(null);
     //toggel a model
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  
  const [counter, setCounter] = useState(-2);
  
  const [refreshing, setRefreshing] = useState(false);
  // const currentValue = new Animated.Value(1)
  let opacity = new Animated.Value(0);

  //toggel like dislike
  const [liked, setliked]=useState(false);



  useEffect(() => {
    getPosts()
    getComments()
},[])


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    tracker
      .get("/post")
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data.sort((a, b) => a.createdAt < b.createdAt));
        setRefreshing(false);
      })
      .catch((err) => {
        //console.log(123);
        console.log(err);
      });
  }, []);

  const [userid, setUserid] = useState(null);

  //catch the current user id
  useEffect(() => {
    AsyncStorage.getItem("UserId", (err, data) => {
      setUserid(data);
      // console.log(userid)
    });
  });

  const LeftContent = (img) =>
    img ? (
      <Avatar.Image size={45} source={{ uri: img }} />
    ) : (
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

 //animating heart
 const animate = easing => {
  opacity.setValue(0);
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: true,
    easing
  }).start();
};
const size = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 80]
});

const animatedStyles = [
  styles.box,
  {
    opacity,
    width: size,
    height: size
  }
];

  //getting all posts
  const getPosts = () => {
    tracker
      .get("/post")
      .then((res) => {
        //objects
      console.log('data' + res.data);
        setPosts(res.data.sort((a, b) => a.createdAt < b.createdAt));
      })
      .catch((err) => {
        //console.log(123);
        console.log(err);
      });
  };
  
  
    //getting all comments by post
    const getComments = () => {
      tracker
        .get(`/comment/${Postid}`)
        .then((res) => {
          let resp=JSON.stringify(res.data)
          //  console.log(resp)
          // console.log('res:' + JSON.stringify(res.data));
            setComments(res.data.sort((a, b) => a.createdAt < b.createdAt));
          console.log('comments:' + comments);
        })
        .catch((error) => {
          console.log('err' +error);
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
    // getPosts();
  
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

  //setting input
  // const [commen, setComment] = useState("");
  const [value, setText] = useState("");

  //handeling the changes added in the commentInput
  const handelCommentChange = (val) => {
    //  console.log('val:' +val);
    setComment(val);

  };

  //onchange comment
  const handelComment = () => {
      // console.log('comment:' +comment);
    setModalOpen1(false);
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const body = JSON.stringify({
      content:comment,
      userId: userid,
      PostId: Postid,
    });
  
    tracker
      .post("comment/addComment", body, config)
      .then((res) => {
      //  console.log( 'postres:' + JSON.stringify(res.data));
        getComments();
      })
      .catch((err) => {
         console.log(err);
      });
  };

  //handel like 
 const handelLike=()=>{
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };
  const body = JSON.stringify({
    PostId:Postid,
    userId: userid,
    like : true,
  });

  tracker
    .post("like/addLike", body, config)
    .then((res) => {
      console.log(res);
    
    })
    .catch((err) => {
       console.log(err);
    });
 }


  //handel post changes
  const handelPost = () => {
    if (imageCam) {
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
            userId: userid,
            //this is the url from cloudinary that we have to send to the server then to the DB
            fileUrl: r.secure_url,
          });

          //send a post request to clever cloud DB
          tracker
            .post("/post/addPost", body, config)
            .then((res) => {
            //  console.log('postadd:' +res.data);
              getPosts();
            })
            .catch((err) => {
              console.log("err:" + err);
            });
        })
        .catch((err) => {
          console.log(err)
        }) ;
    }
  };




  return !posts ? (
    <Loading></Loading>
  ) : (  
    <ScrollView>
      {/* add a post input */}
      <View style={{ backgroundColor: "#fff" }}>
        {/* <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
              marginLeft: 40,
            },
          ]}
        >
          Share what is in your mind?
        </Text> */}

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
              onChangeText={(text) => setText(text)}
              value={value}
              placeholder="Add description"
            />
            <View style={styles.modalButtonView}>
              <Button color="#189ad3" icon="camera" onPress={pickFromCamera}>
                Image from camera
              </Button>
              <Button color="#189ad3" icon="image-area" onPress={pickImage}>
                Image from gallery
              </Button>
              <Button color="#189ad3" icon="video" onPress={pickDocument}>
                Video from gallery
              </Button>
            </View>
            <Button   title="Add my post"
          color="#189ad3"
          onPress={() => handelPost()}>Add my Post</Button>
            <Button 
          color="#189ad3" onPress={() => setModalOpen(false)}>Cancel</Button>
          </View>
        </Modal>
        {/* <Button color="#189ad3" style={styles.postInput} icon="pencil" onPress={() => setModalOpen(true)}>
          Add a post
        </Button> */}
        <ScrollView
          fadingEdgeLength={100}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
         
           <View style={{ justifyContent: "center" }}>
            {posts
              .filter((post) => post.fileUrl)
              .map((item, index) => {
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
                        left={() => LeftContent(item.User.profileImage)}
                      />
                      <Card.Cover key={index} source={{ uri: item.fileUrl }} />
                      <Card.Content >
                        <View style={styles.feed}>
                          {/* <Button
                            style={styles.feed}
                            icon={require("../../assets/profile-photo/like.png")}
                            color={"#189ad3"}
                          >
                            Like
                          </Button> */}


                          {/* </Button heart> */}
                          <Animated.View
                           onPress={()=>{
                            animate(Easing.bounce)
                           }}
                          >
                          <AntDesign 
                          name={liked && index==counter?'heart':'hearto'} 
                          size={15} 
                          color="#189ad3"
                          onPress={()=>{
                            setliked(!liked)
                            setCounter(Postid)
                            handelLike()
                          }}>  Like</AntDesign>
                          </Animated.View>
                         
                          <Modal
                            visible={modalOpen1}
                            animationType="slide"
                            transparent={true}
                          >
                           
                              <View
                                style={{
                                  height: "100%",
                                  marginTop: "auto",
                                  backgroundColor: "white",
                                }}
                              >
                                 <ScrollView>
                                <View>
                                  {!comments ? <View>
                                    <Text>waiting for your comment</Text>
                                    </View>: comments.map((element, index) => 
                                        // {{console.log('comments:'+comments[0].User)}}
                                        <View key={index}>
                                         <Card.Title title={element.User.userName}
                                         subtitle={element.content}
                                         left={() =>
                                          LeftContent(
                                            element.User.profileImage
                                          )
                                        }></Card.Title> 
                                        </View>
                                      ) }
                                </View>
                                </ScrollView>
                                <Text
                                  style={[
                                    styles.text_footer,
                                    {
                                      marginTop: 405,
                                      marginLeft: 80,
                                    },
                                  ]}
                                >
                                  Comment it here
                                </Text>
                                <TextInput
                                  placeholder="Comment"
                                  style={styles.inputComment}
                                  onChangeText={(val) =>
                                    handelCommentChange(val)
                                  }
                                />
                                <Button color="#189ad3" onPress={() => handelComment(comment)}>
                                
                                  Add My Comment
                                </Button>
                                <Button color="#189ad3" onPress={() => setModalOpen1(false)}>
                                  Cancel
                                </Button>
                              </View>
                            
                          </Modal>
                          <Button
                            style={styles.feed}
                            icon={require("../../assets/profile-photo/Comment.png")}
                            color={"#189ad3"}
                            onPress={() => {
                              setPostid(item.id);
                              // console.log(item.id);
                              setModalOpen1(true);
                            }}
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
                        title={item.User.userName}
                        subtitle={item.content}
                        left={() => LeftContent(item.User.profileImage)}
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
                                Comment it here
                              </Text>
                              <TextInput
                                style={styles.inputComment}
                                onChangeComment={(text) =>
                                  onChangeComment(text)
                                }
                                
                                value={value}
                              />
                              <Button onPress={() => handelComment()}>
                                Add my Comment
                              </Button>
                              <Button onPress={() => setModalOpen1(false)}>
                                Cancel
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
    </ScrollView>
  
            
  );
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
  postInput:{
    color:"#05375a",
  }
});



// let post = [
  //   "https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320",
  //   "https://bloximages.chicago2.vip.townnews.com/mymcr.net/content/tncms/assets/v3/editorial/a/6c/a6c39bd0-b325-11ea-9027-334715b6d420/5eee587f1da77.image.jpg?resize=1200%2C922",
  //   "https://cdn.pizap.com/pizapfiles/images/photo_effects_filters_app05.jpg",
  //   "https://photolemur.com/img/home/top-slider/after-1440.jpg",
  //   "https://photolemur.com/uploads/blog/unnamed.jpg",
  //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  // ];
