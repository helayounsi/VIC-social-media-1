import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity 
        style={styles.loginBtn}
        onPress={()=> this.props.navigation.navigate('Profile')}>
          <Text 
          style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
const styles = StyleSheet.create({
loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }
});