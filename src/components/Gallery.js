import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';



export default ({captures=[]}) =>{ 
    
    return (
    <ScrollView 
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]} 
    >
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={ {uri} } style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
);
        }

const styles= StyleSheet.create({
galleryContainer: { 
    // backgroundColor: 'black'
    bottom: 100, 
},
galleryImageContainer: { 
    width: 75, 
    height: 75, 
    marginRight: 5 
},
galleryImage: { 
    width: 75, 
    height: 75 
}
});