import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

const UpdateScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        firstname:'',
        lastname:'',
        username: '',
        city:'',
        country:'',
        description:'',
        phonenumber:'',
        check_usernameChange: false,
        check_firstnameChange: false,
        check_lastnameChange: false,
        check_bioChange: false,
        check_citynameChange: false,
        check_countrynameChange: false,
        check_phonenumberChange: false,
    });

    const { colors } = useTheme();

    const usernameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_usernameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_usernameChange: false,
                isValidUser: false
            });
        }
    }


    const firstnameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                firstname: val,
                check_firstnameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_firstnameChange: false,
                isValidUser: false
            });
        }
    }


    const lastnameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                check_lastnameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_lastnameChange: false,
                isValidUser: false
            });
        }
    }

    const bioChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                description: val,
                check_bioChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                description: val,
                check_bioChange: false,
                isValidUser: false
            });
        }
    }



    const citynameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                bio: val,
                check_citynameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                bio: val,
                check_citynameChange: false,
                isValidUser: false
            });
        }
    }

    const countrynameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                bio: val,
                check_countrynameChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                bio: val,
                check_countrynameChange: false,
                isValidUser: false
            });
        }
    }

    const phonenumberChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                bio: val,
                check_phonenumberChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                bio: val,
                check_phonenumberChange: false,
                isValidUser: false
            });
        }
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
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
          phoneNumber: data.phoneNumber,
          description: data.description,
          profileImage: data.profileImage,
          coverImage: data.coverImage,
          isActif: data.isActif,
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode 

        });
        console.log(body);
        console.log(data);
        tracker.put(`/user/${userId}`, body, config)
       .then((res) => {
            console.log(res.data)
        }).catch((err) => {
            
            console.log(err)
        })

    }
    
    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#189ad3' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Edit profile !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >


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
                    onChangeText={(val) => usernameChange(val)}
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
                    onChangeText={(val) => firstnameChange(val)}
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
                    onChangeText={(val) => lastnameChange(val)}
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
                    onChangeText={(val) => bioChange(val)}
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
                    onChangeText={(val) => citynameChange(val)}
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
                    onChangeText={(val) => countrynameChange(val)}
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
                    onChangeText={(val) => phonenumberChange(val)}
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
        fontSize: 30
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
    }
  });