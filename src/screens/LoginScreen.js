import React, {useState, useEffect} from 'react';
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
     
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import tracker from '../api/tracker';

import { useTheme } from 'react-native-paper';

// import { AuthContext } from '../components/context';

// import Users from '../model/users';

const LoginScreen = ({navigation}) => {

    const [data, setData] = useState({
        username: '',
        password: '',
        email : '',
        phonenumber: null,
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);
   
    const textInputChange = (val) => {
        if( val.length !== 0 && val.includes('@')=== false ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });

        }else if(val.includes('@')=== true) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                
            });        
        }else if(typeof(val) === "number"){
            setData({
                ...data,
                phoneNumber: val,
                check_textInputChange: true,
                
            });     
        } 

    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } 
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }


    // const checkUser = async () =>{
    //     const res= null;
    //     try{
    //     const config = {
    //         headers: {
    //             "Content-Type": "Application/json",
    //         },
    //     };
    //     const body = JSON.stringify({
    //       phoneNumber:data.phonenumber, 
    //       email:data.email,
    //       userName:data.username,
    //       password: data.password 
    //     });
    //     // console.log(body);
    //     // console.log(data);          
    //      res = await tracker.post("/user/login", body, config)
    //     console.log(res.data)
    //     navigation.navigate('Root')
             
          
          
          
    //     }catch(err) {            
    //         console.log (err.message);            
    //     }
    //     AsyncStorage.setItem('idUser',res.data);
    // }

    const checkUser = () =>{
        const config = {
                    headers: {
                        "Content-Type": "Application/json",
                    },
                };
                const body = JSON.stringify({
                  phoneNumber:data.phonenumber, 
                  email:data.email,
                  userName:data.username,
                  password: data.password 
                });
                tracker.post("/user/login", body, config)
                .then((res)=>{
                    console.log(res.data)
                    navigation.navigate('Root')
                    AsyncStorage.setItem('UserId',res.data.id.toString());
                    
                })
                .catch((err)=>{
                    console.log(err.message)
                })
    }

    return (
      <View style={styles.container}>
          
          <StatusBar  barStyle="light-content"/>
          <ScrollView>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Username/e-mail/phone number"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
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
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#189ad3', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    // onPress={() => {loginHandle( data.username, data.password )}}
                    onPress={() => checkUser() }
                >
                    
                <LinearGradient
                    colors={['#189ad3', '#71c7ec']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
            
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={[styles.signIn, {
                        borderColor: '#189ad3',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#189ad3'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        <View style={styles.iconContainer}>            
            <View style={{width: '100%', flexDirection: 'column'}}>
            <SocialIcon
              //Social Icon using react-native-elements
              button
              //To make a button type Social Icon
              title="Sign In facebook"
              //Title of Social Button
              type="facebook"
              //Type of Social Icon
            //   onPress={() => {
                //Action to perform on press of Social Icon
                // alert('facebook');
            //   }}
            />
          </View>
          <View style={{width: '100%', flexDirection: 'column'}}>
            <SocialIcon
              title="Sign In twitter"
              button
              type="twitter"
              
            //   onPress={() => {
            //     alert('twitter');
            //   }}
            />
          </View>
          </View>
        </Animatable.View>
        </ScrollView>
      </View>
          );
};

export default LoginScreen;

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
        paddingVertical: 49
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
    },
    iconContainer: {
        marginTop:10
    }
  });



      // const handleValidUser = (val) => {
    //     if( val.trim().length >= 4 ) {
    //         setData({
    //             ...data,
    //             isValidUser: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             isValidUser: false
    //         });
    //     }
    // }

    // const loginHandle = (userName, password) => {

    //     const foundUser = Users.filter( item => {
    //         return userName == item.username && password == item.password;
    //     } );

    //     if ( data.username.length == 0 || data.password.length == 0 ) {
    //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     if ( foundUser.length == 0 ) {
    //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }
    //     signIn(foundUser);
    // }