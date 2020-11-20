import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import { Video } from 'expo-av';


const LeftContent = () => (
  <Avatar.Image size={24} source={require('../../assets/profile-photo/me.png')} />
);

const PostComponent = () => (
  <SafeAreaView>
    <ScrollView>
    <View style={{justifyContent: 'center'}}>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={styles.card}
/>
<Card.Content>

<View style={styles.feed}>
<Button style={styles.feed} icon={require('../../assets/profile-photo/like.png')}>
 Like
</Button>
<Button style={styles.feed} icon={require('../../assets/profile-photo/Comment.png')}>
 Comment
</Button>
<Button icon={require('../../assets/profile-photo/share.png')}>
 Share
</Button>

</View>
</Card.Content>
  </Card>
  
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={styles.card}
/>
<Card.Content>
<View style={styles.feed}>
<Button style={styles.feed} icon={require('../../assets/profile-photo/like.png')}>
 Like
</Button>
<Button style={styles.feed} icon={require('../../assets/profile-photo/Comment.png')}>
 Comment
</Button>
<Button icon={require('../../assets/profile-photo/share.png')}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Video
  // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={styles.card}
/>
<Card.Content>
<Paragraph>Your comment here !</Paragraph>
<View style={styles.feed}>
<Button style={styles.feed} icon={require('../../assets/profile-photo/like.png')}>
 Like
</Button>
<Button style={styles.feed} icon={require('../../assets/profile-photo/Comment.png')}>
 Comment
</Button>
<Button icon={require('../../assets/profile-photo/share.png')}>
 Share
</Button>
</View>
</Card.Content>
  </Card>
  </View>
  </ScrollView>
  </SafeAreaView>
);

export default PostComponent;

const styles = StyleSheet.create({
  feed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: 330,
    height: 450, 
    margin: 10
  }
});
