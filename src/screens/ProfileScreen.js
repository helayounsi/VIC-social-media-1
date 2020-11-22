import React, { Component, useState, useEffect } from 'react';
import {TextInput,Button} from 'react-native-paper'
import {StyleSheet, View, Text, SafeAreaView, Image,
 ScrollView, TouchableOpacity, UIManager, findNodeHandle, Modal} from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//import ImagePicker from '../components/ImagePicker'
//import ImagePicker from 'react-native-image-picker';

class ProfileScreen extends Component {
  static propTypes = {
    // array of strings, will be list items of Menu
    // actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    // onPress: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
      modalVisible: useState(false),
      setModalVisible: useState(false),
    };
  }



  onError () {
    console.log('Popup Error')
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }
  nRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
  

  pickFromGallery = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
          
          }
    else{
       Alert.alert("you need to give up permission to work")
    }
 }


 pickFromCamera = async ()=>{
  const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
  if(granted){
       let data =  await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
  }else{
     Alert.alert("you need to give up permission to work")
  }
}


  // openImagePickerAsync = async () => {
  //   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   console.log(pickerResult);
  // }
  // useEffect=(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  // pickImage = async () => {
    
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
    
   
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };


  render() {
    return (
     <SafeAreaView style={styles.container}>       
         <View style={styles.titleBar}>
          {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D" ></Ionicons> */}
          <TouchableOpacity onPress={this.onPress}>
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
          </TouchableOpacity>
         </View>
         <ScrollView showVerticalScrollIndicator={false}>
         <View style={{alignSelf: 'center'}}>
           <View style={styles.profileImage}>
             <Image source={require("../../assets/profile-pic/profile.jpg")} style={styles.image}  resizeMode="center"></Image>
           </View>
           <View style={styles.dm}>
             <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
           </View>
           <View style={styles.active}></View>
           <View style={styles.add}>
             <Ionicons name="ios-add" size={48} color="#DFD8D8" style={{marginTop: 6, marginLeft: 2}} onPress={()=>setModalVisible(!modalVisible)}></Ionicons>
           </View>
         </View>
         <View style={styles.infoContainer}>
           <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}>User Name</Text>
           <Text style={[styles.text, {color: "#AEB5BC", fontSize: 14}]}>description</Text>
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
         <View style={{marginTop: 32}}>
           {/* <ScrollView > */}
           <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/profile-photo/1.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
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
             </View>
             </View>

           {/* </ScrollView> */}
         </View>
       </ScrollView>
       <Modal
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             onRequestClose={()=>{
              Alert.alert('Modal has been closed.');
             }}
             >
              <View style={styles.modalView}>
                  <View style={styles.modalButtonView}>
                        <Button icon="camera"
                        
                         mode="contained"
                         onPress={() => pickFromCamera()}>
                                camera
                        </Button>
                        <Button 
                        icon="image-area"
                         mode="contained"
                         
                          onPress={() => pickFromGallery()}>
                                gallery
                        </Button>
                  </View>
                <Button 
                
                onPress={() => setModal(false)}>
                        cancel
                </Button>
              </View>
             </Modal>
     </SafeAreaView>
    );
  }
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
    width: 290,
    height: 210,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  med:{
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
  }
})
