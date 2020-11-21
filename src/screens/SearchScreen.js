import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image,
  ScrollView, TouchableOpacity, UIManager, findNodeHandle} from 'react-native';
import { Searchbar } from 'react-native-paper';


const SearchScreen = props =>{
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
   <View style={styles.container}>
     <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     <ScrollView showVerticalScrollIndicator={false}>
    <View style={styles.tag} >
    <Text  style={{position: 'absolute',top: -30, right: 35}}># Domestic animals</Text>
    </View>
    <ScrollView horizontal={true} > 
    <View style={styles.med}>
             <View style={styles.mediaImagecontainer}>
               <Image source={require("../../assets/Anim/3.jpg")} style={styles.image} resizeMode= "cover"></Image>
             </View>
             <View style={styles.mediaImagecontainer}>
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
             </View>
             </View>
      </ScrollView>

      <View style={styles.tag} >
    <Text  style={{position: 'absolute',top: -30, right: 35}}>#Wildlife animals</Text>
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
      </ScrollView>

      <View style={styles.tag} >
    <Text  style={{position: 'absolute',top: -30, right: 35}}>#flowers</Text>
    </View>
    <ScrollView horizontal={true} > 
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
      </ScrollView>
      </ScrollView>
   </View>
    
  );
};
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginHorizontal: 10
  },
  med:{
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
  },
  tag:{
    marginTop: 50,
    textAlign: "left",
    marginRight: 10

  }
});


export default SearchScreen ; 


