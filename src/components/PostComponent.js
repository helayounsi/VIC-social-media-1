import  React, { Component } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Share, Image} from 'react-native'
import { Video, } from 'expo-av';



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

class PostComponent extends Component {
  constructor (props){
    super(props);
    this.state={
      media: ["https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320", "https://bloximages.chicago2.vip.townnews.com/mymcr.net/content/tncms/assets/v3/editorial/a/6c/a6c39bd0-b325-11ea-9027-334715b6d420/5eee587f1da77.image.jpg?resize=1200%2C922","https://cdn.pizap.com/pizapfiles/images/photo_effects_filters_app05.jpg", "https://photolemur.com/img/home/top-slider/after-1440.jpg","https://photolemur.com/uploads/blog/unnamed.jpg","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"],
      mediaList:""
    }



  }

  render(){
    mediaList=media.map(media => {mediaList})
    console.log(mediaList);
    if(this.state.mediaList.includes('.jpg')||mediaList.includes('.jpeg')||mediaList.includes('.png')||mediaList.includes('.gif')){
      return(
    <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Cover source={{uri: this.state.mediaList}} />
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
    }else{
  return (
  <SafeAreaView>
    <ScrollView>
    <View style={{justifyContent: 'center'}}>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    
    <Video
  source={{ uri: this.state.mediaList}}
  rate={1.0}
  volume={1.0}
  isMuted={true}
  resizeMode="cover"
  shouldPlay
  isLooping
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
  </View>
  </ScrollView>
  </SafeAreaView>
)
  }
}
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
});
