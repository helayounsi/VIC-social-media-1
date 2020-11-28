import  React, { Component, useState, useEffect  } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Share, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import { Video, } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



const LeftContent = () => (
  <Avatar.Image size={45} source={require('../../assets/profile-photo/me.png')} />
);

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'React Native | A framework for building native apps using React',
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

useEffect (() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
}, []);


const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);
  if (!result.cancelled) {
    setImage(result.uri);
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
            quality:0.5
        })
  }else{
     Alert.alert("you need to give up permission to work")
  }
}
 //toggel a model 
 const [modalOpen, setModalOpen]=useState(false);
 

class PostComponent extends Component {
  constructor (props){
    super(props);
    this.state={
      media: ["https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320", "https://bloximages.chicago2.vip.townnews.com/mymcr.net/content/tncms/assets/v3/editorial/a/6c/a6c39bd0-b325-11ea-9027-334715b6d420/5eee587f1da77.image.jpg?resize=1200%2C922","https://cdn.pizap.com/pizapfiles/images/photo_effects_filters_app05.jpg", "https://photolemur.com/img/home/top-slider/after-1440.jpg","https://photolemur.com/uploads/blog/unnamed.jpg","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
    }
  }
//  mediaList=()=>{
//    return this.state.media.map(item=>{
    
//    })
//  }


  render(){  
    const [modalOpen, setModalOpen]=useState(false);    
      return(
        <SafeAreaView>
    <ScrollView>
      {/* add a post input */}
      <View>
      <Text style={[styles.text_footer, {
                marginTop: 20
            }]}>Share what is in your mind?</Text>
            <Modal visible={modalOpen} animationType ='slide'  transparent={true} >
               <View style={{height: '20%', marginTop: 'auto', backgroundColor:'white'}}>
             
               <View style={styles.modalButtonView}>
                 hello
                       </View>
               </View>
           </Modal>
        <View style={styles.action}>
        <FontAwesome name="pencil-square-o" size={28} color="black" />
      <TextInput 
                    placeholder="Add your post here"
                    placeholderTextColor="#666666"
                    style={[styles.textInput]}
                    autoCapitalize="none"
                    onChangeText={(val) => usernameChange(val)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    onPress={()=> setModalOpen(true)}/>
        </View>
    <View style={{justifyContent: 'center'}}>
    {this.state.media.reverse().map((item , index)=>{
      if(item.includes('.jpg')||item.includes('.jpeg')||item.includes('.png')||item.includes('.gif')){
        return(
    <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />    
      
      <Card.Cover key={index.item} source={{uri:item}} />
      
      <Card.Content>
<View style={styles.feed}>
<Button style={styles.feed} icon={require('../../assets/profile-photo/like.png')} color={'#189ad3'}>
 Like
</Button>
<Button style={styles.feed} icon={require('../../assets/profile-photo/Comment.png')} color={'#189ad3'}>
 Comment
</Button>
<Button icon={require('../../assets/profile-photo/share.png')} onPress={onShare} color={'#189ad3'}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
  )
     }else if(item.includes('.mp4')){       
       return(
        <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Video
      key={index.item}
      source={{ uri: item}}
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
<Button style={styles.feed} icon={require('../../assets/profile-photo/like.png')} color={'#189ad3'}>
 Like
</Button>
<Button style={styles.feed} icon={require('../../assets/profile-photo/Comment.png')} color={'#189ad3'}>
 Comment
</Button>
<Button icon={require('../../assets/profile-photo/share.png')} onPress={onShare} color={'#189ad3'}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
    )
  }      

  })}
  </View>
      </View>
  
  </ScrollView>
  </SafeAreaView>
      )

};

};

export default PostComponent;

const styles = StyleSheet.create({
  feed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    
  },
  card: {
    width: 330,
    height: 450, 
    margin: 10
  },
  image:{
    flex: 1,
    width: undefined,
    height: undefined
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
text_footer: {
  color: '#05375a',
  fontSize: 18
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
});
