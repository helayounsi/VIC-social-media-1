import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image,
  ScrollView, TouchableOpacity, UIManager, findNodeHandle} from 'react-native';
import { Searchbar } from 'react-native-paper';


const SearchScreen = props =>{
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.ProfileScreen}>
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     </View>
  );
};
 


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default SearchScreen ; 