import React from "react";

// import NotificationsScreen from "../src/screens/NotificationsScreen";
import SearchScreen from "../src/screens/SearchScreen";
import HomeScreen from "../src/screens/HomeScreen";
import ChatScreen from "../src/screens/ChatScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
// import OpenCameraScreen from "../src/screens/OpenCameraScreen";
// import EditProfileScreen from "../src/screens/EditProfileScreen";
import LoginScreen from "../src/screens/LoginScreen";
import LandingScreen from '../src/screens/LandingScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
// import RegisterScreen from "../src/screens/RegisterScreen";
import OpenCameraScreen from "../src/screens/CameraScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import ChatListScreen from '../src/screens/ChatListScreen'


// const ProfileStack = createStackNavigator();

// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen name="Profile" component={ProfileScreen}  options={{
//           headerRight: () => (
//             <Button
//               onPress={() => alert("This is a button!")}
//               icon="camera" mode="contained"
//             >h</Button>
//           ),
//         }}/>
//         <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
//     </ProfileStack.Navigator>
//   );
// }




const Tab = createBottomTabNavigator();
function Root() {
  if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Notifications") {
            iconName = "notification";
          } else if (route.name === "Search") {
            iconName = "search1";
          } else if (route.name === "Chat") {
            iconName = "wechat";
          } else if (route.name === "OpenCamera") {
            iconName = "camera";
          } else if (route.name === "ProfileStack") {
            iconName = "profile";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#189ad3",
        inactiveTintColor: "gray",
      }}
    >



      <Tab.Screen options={{headerShown:true}} name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="OpenCamera" component={OpenCameraScreen} />
      <Tab.Screen name="Chat" component={ChatListScreen}/> 
      <Tab.Screen name="ProfileStack" component={ProfileScreen} />
    </Tab.Navigator>
  );
}





const Stack = createStackNavigator();
export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Landing" component={LandingScreen} />
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen  options={{headerShown:false}}  name="Root" component={Root} />
        <Stack.Screen options={{headerShown:false}} name="chatUser" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
