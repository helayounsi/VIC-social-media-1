import React, { useState } from "react";
import PropTypes from 'prop-types'
import ChatScreen from './ChatScreen'
import { List } from 'react-native-paper'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import DATA from './DummyMessages'
import Navigator from '../../navigation/Navigator';


  
  const ChatListScreen = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(null);

    const Item = ({ item, style}) => (
        <TouchableOpacity onPress={()=>navigation.navigate('chatUser')} style={[styles.item, style]}>
          <Text style={styles.message}>{item.message}</Text>
        </TouchableOpacity>
      );
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          style={{ backgroundColor }}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    message: {
      fontSize: 32,
    },
  });
  
  export default ChatListScreen;