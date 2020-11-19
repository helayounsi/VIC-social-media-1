import React, { Component } from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <SafeAreaView style={styles.container}>       
         <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
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
             <Ionicons name="ios-add" size={48} color="#DFD8D8" style={{marginTop: 6, marginLeft: 2}}></Ionicons>
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

     </SafeAreaView>
    );
  }
}

export default profile;

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
    width: 150,
    height: 200,
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
