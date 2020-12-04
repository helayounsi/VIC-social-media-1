import  React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image,
  ScrollView, TouchableOpacity, UIManager, findNodeHandle} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import tracker from '../api/tracker';
import Loading from "../components/Loading";


const SearchScreen = props =>{
  const [searchQuery, setSearchQuery] = useState('');
  const [userid, setUserid] = useState(null);
  const [userData, setUserdata] = useState(null)


  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    AsyncStorage.getItem('UserId', (err, data)=>{
      setUserid(data);
      // console.log(userid)
  })
  getUsers()
  }, []);
  const getUsers = () =>{ 
      
    tracker
    .get(`/user`)
    .then((res) => {
      console.log(res.data);
      setUserdata(res.data.filter(u => u.id!==userid))
    })
    .catch((err) => {
      
      console.log(err);
    });
    

}

  return ( !userData ? (
    <Loading></Loading>
  ) : (
   <View style={styles.container}>
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     <ScrollView >
    {/* <View style={styles.tag} > */}
    {/* <Text  style={styles.text}># Domestic animals</Text> */}
    {/* </View> */}
    {/* <ScrollView horizontal={true} >  */}
    {userData.map((user, index) =>{
      return (
        <View style={styles.med} key={index}>
             <View style={styles.mediaImagecontainer}>
               <Image source={{uri: user.profileImage}} style={styles.image} resizeMode= "cover"></Image>
             </View>
             {/* <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Anim/2.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Anim/4.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Anim/5.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Anim/6.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View> */}
             </View>
      )
    })
    
             }
      {/* </ScrollView> */}

      {/* <View style={styles.tag} >
    <Text  style={styles.text}>#Wildlife animals</Text>
    </View>
    <ScrollView horizontal={true} > 
    <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Animsauvage/1.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Animsauvage/7.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Animsauvage/3.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Animsauvage/5.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Animsauvage/6.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
      </ScrollView> */}

      {/* <View style={styles.tag} >
    <Text  style={styles.text}>#flowers</Text>
    </View> */}
    {/* <ScrollView horizontal={true} > 
    <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Flowers/1.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Flowers/2.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Flowers/3.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Flowers/5.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Flowers/4.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             </View>
      </ScrollView> */}
      </ScrollView>
   </View>
    
  )
  )
};
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  image:{
    flex: 1,
    width: undefined,
    height: undefined
  },
  mediaImagecontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 290,
    height: 210,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 10
  },
  med:{
    // flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
    
  },
  tag:{
    marginTop: 50,
    marginLeft: 40
  },
  text:{
    top: -30, 
    right: 35, 
    fontSize: 20
  }
});


export default SearchScreen ; 


