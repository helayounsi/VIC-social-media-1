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
      message: 'oussama send you a message',
      titel: "test",
      url: "https://www.youtube.com/c/KMRScript/videos"
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

const PostComponent = () =>{

 
  
  return (
  <SafeAreaView>
    <ScrollView>
    <View style={{justifyContent: 'center'}}>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    
    <Video
  source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }}
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

  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Cover source={require("../../assets/profile-photo/4.jpg")} />
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
  
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Video
  source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }}
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
<Button icon={require('../../assets/profile-photo/share.png')}  onPress={onShare} color={'#189ad3'}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Video
  source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' }}
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
<Button icon={require('../../assets/profile-photo/share.png')}  onPress={onShare} color={'#189ad3'}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
  </View>
  </ScrollView>
  </SafeAreaView>
)

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
