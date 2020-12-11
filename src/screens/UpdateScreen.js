import React, { useState, useEffect, useCallback} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ScrollView,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AsyncStorage, RefreshControl } from "react-native";
import tracker from "../api/tracker";
import ProfileScreen from "../screens/ProfileScreen";
import Loading from "../components/Loading";

const UpdateScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [user, setUser]=useState(null);
    const [userid, setUserid] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [data, setData] = React.useState({
        firstName:'',
        lastName:'',
        userName: '',
        city:'',
        country:'',
        phoneNumber:'',
        description:'',
        check_usernameChange: false,
        check_firstnameChange: false,
        check_lastnameChange: false,
        check_bioChange: false,
        check_citynameChange: false,
        check_countrynameChange: false,
        check_phonenumberChange: false,
    });

    
     //catch the current user id
     useEffect(() => {
        AsyncStorage.getItem("UserId", (err, data) => {
          setUserid(data);
          //  console.log(userid)
        });
      });

       //catch the current user id
  useEffect(() => {
    getProfile()
},[])

const getProfile = () =>{
    AsyncStorage.getItem('UserId', (err, Data)=>{
      console.log(Data)
      tracker
      .get(`/user/${Data}`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        console.log(user);
      })
      .catch((err) => {
        
        console.log(err);
      });
  })
  }

   

 
    const usernameChange = (username) => {
        // console.log(val)
        if( username.length !== 0 ) {
            setData({
                ...data,
                userName: username,
                check_usernameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                userName: username,
                check_usernameChange: false,
                isValidUser: false
            });
            
        }
        // console.log(val)
        // setusername(username)
    }


    const firstnameChange = (firstname) => {
        if( firstname.length !== 0 ) {
            setData({
                ...data,
                firstName: firstname,
                check_firstnameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                firstName: firstname,
                check_firstnameChange: false,
                isValidUser: false
            });
        }
        // setfirstname(firstname)
    }


    const lastnameChange = (lastname) => {
        if( lastname.length !== 0 ) {
            setData({
                ...data,
                lastName: lastname,
                check_lastnameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                lastName: lastname,
                check_lastnameChange: false,
                isValidUser: false
            });
        }
        // setlastname(lastname)
    }

    const bioChange = (bio) => {
        if( bio.length !== 0 ) {
            setData({
                ...data,
                description: bio,
                check_bioChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                description: bio,
                check_bioChange: false,
                isValidUser: false
            });
        }
        // setbio(bio)
    }



    const citynameChange = (cityname) => {
        if( cityname.length !== 0 ) {
            setData({
                ...data,
                city: cityname,
                check_citynameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                city: cityname,
                check_citynameChange: false,
                isValidUser: false
            });
        }
        // setUser(val)
    }

    const countrynameChange = (countryname) => {
        if( countryname.length !== 0 ) {
            setData({
                ...data,
                country: countryname,
                check_countrynameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                country: countryname,
                check_countrynameChange: false,
                isValidUser: false
            });
        }
        // setUser(val)
    }

    const phonenumberChange = (phonenumber) => {
        if( phonenumber.length !== 0 ) {
            setData({
                ...data,
                phoneNumber:phonenumber ,
                check_phonenumberChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                phoneNumber: phonenumber,
                check_phonenumberChange: false,
                isValidUser: false
            });
        }
        // setphonenumber(phonenumber)
    }

    const onSubmitEditing = () =>{
        // console.log(data.password)
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };
        const body = JSON.stringify({
          firstName:data.firstName,
          lastName: data.lastName,
          userName:data.userName,
          phoneNumber: data.phoneNumber,
          description: data.bio,
          profileImage: data.profileImage,
          isActif: data.isActif,
          address: data.address,
          city: data.city,
          country: data.country

        });
        // console.log(body);
         console.log(body);
        tracker.put(`/user/${userid}`, body, config)
       .then((res) => {
            console.log('res:' +JSON.stringify(res.data))
            console.log('userid' +userid)
            getProfile()
        }).catch((err) => {
            
            console.log(err)
        })

    }

    const onRefresh = useCallback(() => {
        AsyncStorage.getItem('UserId', (err, Data)=>{
        setRefreshing(true);
        tracker
        .get(`Post/userPost/${Data}`)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => {
          
          console.log(err);
        });
      })
      }, []);
    
    
    return !user?  <Loading></Loading> : (
      <View style={styles.container}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <StatusBar backgroundColor='#189ad3' barStyle="light-content"/>
       
            <Text style={styles.text_header}>Edit profile !</Text>
            <View style={{alignSelf: 'center'}}>
           <View style={styles.profileImage}>
             <Image source={{uri:user.profileImage}}  style={styles.image}  resizeMode="center"></Image>
           </View>
         </View>
       
          <Text style={[styles.text, {fontWeight: "100", fontSize: 25, alignSelf: 'center' }]}>Hello! {user.userName} </Text>
    
     
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        <ScrollView>
              {/* edit username */}
              <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your new username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(username) => usernameChange(username)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                
                {data.check_usernameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }


             {/* edit first name */}
             <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change first name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your new first name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(firstname) => firstnameChange(firstname)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_firstnameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>first name must be 4 characters long.</Text>
            </Animatable.View>
            }
            
            
             {/* edit last name */}
             <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change last name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your new last name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(lastname) => lastnameChange(lastname)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_lastnameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>last name must be 4 characters long.</Text>
            </Animatable.View>
            }
           
             {/* edit description */}
             <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change your Bio</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="edit"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your new bio"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(bio) => bioChange(bio)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_bioChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Bio must be 50 characters long.</Text>
            </Animatable.View>
            }

             {/* edit your city */}
             <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change your city name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="map-marker"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your new city"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(cityname) => citynameChange(cityname)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_citynameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>City name must be 10 characters long.</Text>
            </Animatable.View>
            }

              {/* edit country */}
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change your country name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="globe"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your country name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(countryname) => countrynameChange(countryname)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_countrynameChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Country name must be 4 characters long.</Text>
            </Animatable.View>
            }


             {/* edit phone number */}
             <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Change your phone number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="+216"
                    placeholderTextColor="#666666"
                    keyboardType='number-pad'
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(phonenumber) => phonenumberChange(phonenumber)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_phonenumberChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Phone number must be 9 characters long.</Text>
            </Animatable.View>
            }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {onSubmitEditing( data.firstname, data.lastname, data.username, data.city, data.country, data.description, data.phonenumber )}}
                >
              
                <LinearGradient
                    colors={['#189ad3', '#71c7ec']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Confirm changes</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>

          
        </Animatable.View>
      </View>
    );
};

export default UpdateScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#189ad3'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    image:{
        flex: 1,
        width: undefined,
        height: undefined,

      },
      profileImage:{
        width: 110,
        height: 110,
        borderRadius: 100,
        overflow: "hidden"
      }
  });