import React, { Component, useState, useEffect } from 'react';
import {TextInput, Button, Paragraph, Menu, Divider, Provider} from 'react-native-paper';
import {StyleSheet, View, Text, SafeAreaView, Image,
 ScrollView, TouchableOpacity, UIManager, findNodeHandle, Alert, Modal} from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import tracker from "../api/tracker";
import Loading from "../components/Loading";
//import Modal from 'react-native-modal';
//import ImagePicker from '../components/ImagePicker'
//import ImagePicker from 'react-native-image-picker';
import UpdateScreen from '../screens/UpdateScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';


const ProfileScreen = ({navigation}) => {
  const [Icon, setIcon, image, setImage] = useState(null);
  const [imageCam, setImageCam]= useState("");
  const [user, setUser]=useState(null);
  const [Posts, setPosts]=useState(null);
  
  
//catch the current user id
  useEffect(() => {
    getProfile()
    // getUserposts()
},[])

const getProfile = () =>{
  AsyncStorage.getItem('UserId', (err, Data)=>{
    console.log(Data)
    tracker
    .get(`/user/${Data}`)
    .then((res) => {
      // console.log(res.data);
      setUser(res.data);
    })
    .catch((err) => {
      
      console.log(err);
    });

    tracker
    .get(`/myPost/${Data}`)
    .then((res) => {
      console.log(res.data);
      setPosts(res.data);
    })
    .catch((err) => {
      
      console.log(err);
    });
    
})
}

// const getUserposts = () => {
//   AsyncStorage.getItem('UserId', (err, data)=>{
//     // console.log(data)
//     tracker
//     .get(`Post/userPost/${data}`)
//     .then((res) => {
//       console.log(res.data);
//       setUserposts(res.data);
//     })
//     .catch((err) => {
      
//       console.log(err);
//     });
    
// })
// }

  // let [Icon, setIcon] = useState(null);

  //  onError = () => {
  //   console.log('Popup Error')
  // }

  // onPress = () => {
  //   if (this.state.icon) {
  //     UIManager.showPopupMenu(
  //       findNodeHandle(this.state.icon),
  //       this.props.actions,
  //       this.onError,
  //       this.props.onPress
  //     )
  //   }
  // }
//   nRef = (icon) => {
//     if (!{Icon}) {
//       setIcon(icon)
//     }
//   }
  

// Pick image from gallery
useEffect (() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
 // getProfileImag();
}, []);


const pickImage = async () => {
  let data = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true,
  });

  setImageCam(data);
  //console.log(data);

  if (!data.cancelled) {
   // handelProfileImage();
  }
};

// Pick image from camera
const pickFromCamera = async ()=>{
  const {status} =  await Permissions.askAsync(Permissions.CAMERA)
  if(status=='granted'){
       let data =  await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5,
            base64: true,
        })
        await setImageCam(data);
        if (!data.cancelled) {
         // handelProfileImage ();
        }
  }else{
     Alert.alert("you need to give up permission to work")
  }
}

const handelProfileImage = () =>{
  //console.log('img:'+ imageCam.uri);

  let base64Img = `data:image/jpg;base64,${imageCam.base64}`;
 // console.log('img'+base64Img);
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
        console.log(r);
        setModalOpen(false);

        const config = {
          headers: {
            "Content-Type": "Application/json",
          },
        };
        const body = JSON.stringify({
          

          profileImage: r.secure_url,
         
        });
 
        tracker
          .put(`/user/${user.id}`,body,config)
          .then((res) => {
            console.log(res.data);
            //getProfileImag()
    getProfile()

          })
          .catch((err) => {
           
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };
  
  // const getProfileImag = () => {
  //   tracker
  //     .get("/:id")
  //     .then((res) => {
  //       console.log(res.data);
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
        
  //       console.log(err);
  //     });
  // };

//   console.log(imageCam)
//   const fd = new FormData()
//   fd.append('photo',imageCam)
// return  axios.put(`http://localhost:3000/uploadImage`,fd,{
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }}); 


 //toggel a model 
 const [modalOpen, setModalOpen]=useState(false);
 const [modalOpen1, setModalOpen1]=useState(false);


    return !user ? <Loading></Loading> :  (
     <SafeAreaView style={styles.container}>       
         <Provider>
          <View style={styles.titleBar}>
          <TouchableOpacity>
                    <Menu
            visible={modalOpen1}
            onDismiss={() => setModalOpen1(false)}
            anchor={
              <Ionicons name="md-more" size={40} color="#52575D"  style={{paddingHorizontal:20}} onPress={()=> setModalOpen1(true)}></Ionicons>
            }>      
            <Menu.Item  onPress={() => navigation.navigate('UpdateScreen')} title="Edit profile"/>
            <Menu.Item onPress={async() => { await AsyncStorage.clear(); navigation.navigate('LandingScreen')}} title="Log out"/>
          </Menu>
          </TouchableOpacity>
      </View>
        
         <ScrollView showVerticalScrollIndicator={false}>
         <View style={{alignSelf: 'center'}}>
           <View style={styles.profileImage}>
             <Image source={{uri:user.profileImage}}  style={styles.image}  resizeMode="center"></Image>
           </View>
           <View style={styles.dm}>
             <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
           </View>
           <View style={styles.active}></View>
           
           <Modal visible={modalOpen} animationType ='slide'  transparent={true} >
               <View style={{height: '30%', marginTop: 'auto', backgroundColor:'white'}}>
             
               <View style={styles.modalButtonView}>
                        <Button icon="camera" onPress={pickFromCamera}>
                                camera
                        </Button>
                        <Button  icon="image-area" onPress={pickImage}>
                                gallery
                        </Button>
                  </View>
                <Button onPress={()=> setModalOpen(false)}>
                        cancel
                </Button>
                <Button  onPress={()=> handelProfileImage()} >
                        Add profile Image
                </Button>
               </View>
           </Modal>
           
           <View style={styles.add}>
             <MaterialIcons name="add" size={48} color="#DFD8D8" style={{marginTop: 6, marginLeft: 2}} onPress={()=> setModalOpen(true)}></MaterialIcons>
           </View>
         </View>
         <View style={styles.infoContainer}>
          <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}>{user.userName}</Text>
           <Text style={[styles.text, {color: "#AEB5BC", fontSize: 14}]}>{user.description}</Text>
         </View>

         <View style={styles.statsContainer}>
           <View style={styles.statsBox}>
             <Text style={[styles.text, {fontSize: 24}]} >1500</Text>
             <Text style={[styles.text, styles.subText]}>Following</Text>
           </View>
           <View style={[styles.statsBox, {borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
             <Text style={[styles.text, {fontSize: 24}]} >43.200</Text>
             <Text style={[styles.text, styles.subText]}>Follower</Text>
           </View>
           <View style={styles.statsBox}>
             <Text style={[styles.text, {fontSize: 24}]} >10.000</Text>
             <Text style={[styles.text, styles.subText]}>Likes</Text>
           </View>
         </View>
         {Posts.map((post, index) =>
         <View style={{marginTop: 32}}>         
           <ScrollView >             
           <View key={index} style={styles.med} >
             <View style={styles.mediaImagecontainer}>
               <Image source={{uri:post.fileUrl}} style={styles.image} resizeMode= "cover"></Image>
             </View>             
            </View>           
           </ScrollView>            
         </View>
          )} 
       </ScrollView>
       </Provider>
     </SafeAreaView>
    );
 
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    // fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  image:{
    flex: 1,
    width: undefined,
    height: undefined
  },
  titleBar: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage:{
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm:{
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer:{
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer:{
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox:{
    alignItems: "center",
    flex: 1,
  },
  mediaImagecontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 160,
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  med:{
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  modalContent:{
    flex: 1,
    backgroundColor: 'grey',
    padding: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }

})




{/* <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/2.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
             <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/3.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/4.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
             <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/5.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/6.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
             <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/7.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/8.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
             <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/9.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View> */}