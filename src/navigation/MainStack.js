import React, { useEffect, useState } from "react";
import { Platform, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonOverviewStack from "./BottomTab";
import SettingStack from './SettingsStack';
import DownloadsStack from "./DownloadsStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from "react-redux";
import { showDangerToast } from "../assets/utility/ToastMessage";
import { setNetConnected, setVisible } from '../navigation/AppReducer';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
export default TabNavigator = () => {
  const [terms, setTerms] = useState();
  const netConnected = useSelector(item => item.isNetConnected.isConnected)
  const setVisiblity =  useDispatch();
  const hasNotch = DeviceInfo.hasNotch();
  console.log("hasNotch ", hasNotch );
  useEffect(() => {
    getTerms();
  }, [])

  // console.log("terms", terms);
  const getTerms = async () => {
    const termData = await AsyncStorage.getItem('appTerms');
    // console.log("termData", termData);
    setTerms(JSON.parse(termData))
  }

  return(
  <Tab.Navigator
    initialRouteName={"LessonOverview"}
    animationEnabled={true}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        // console.log("route", route, focused);
        let iconName;

        if (route.name === "LessonOverview") {
            return(
              <Image 
                source={require('../assets/images/SubscriptionNav/lesson_overview_black.png')} 
                style={{
                  width: 21,
                  height: 21,
                  tintColor: 'black',
                  resizeMode: 'contain',
                  opacity: focused ? 1 : 0.5
                }}/>
            )
          // }
        } else if (route.name === "Settings") {
            return(
              <Image 
                source={require('../assets/images/SubscriptionNav/settings_black.png')} 
                style={{
                  width: 21,
                  height: 21,
                  tintColor: 'black',
                  resizeMode: 'contain',
                  opacity: focused ? 1 : 0.5
                }}
                />
            )
        } else if (route.name === "Downloads") {
            return(
              <Image 
                source={require('../assets/images/SubscriptionNav/downloads_black.png')} 
                style={{
                  width: 21,
                  height: 21,
                  tintColor: "black",
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.5
                }}/>
            )
        }
      },
      tabBarHideOnKeyboard:true,
      // height: 100,
      // style:{paddingBottom: 10},
      tabBarStyle:{ backgroundColor: '#fff', paddingBottom: hasNotch && Platform.OS == "ios" ? 20 : 10, paddingTop: 11, height: hasNotch && Platform.OS == "ios" ? 80: 70,   },
      // pressColor: 'gray',//for click (ripple) effect color
      // style: {
      //   backgroundColor: 'white',//color you want to change
      // }
      tabBarActiveTintColor: "#000",
      tabBarLabelStyle:{height: 25, fontSize: 12, paddingTop: 5}
    })}
    >
    <Tab.Screen 
      name={'LessonOverview'} 
      options={({route}) => {
        const visibility = getTabBarVisibility(route)
        // console.log("visiblity", visibility);
        if(visibility){
          return {tabBarLabel: "Lektionen", tabBarStyle: visibility, tabBarButton: (props) => {
            if(netConnected){
              return (<Pressable {...props} />)

            }else{
              return (<Pressable {...props} onPress={() => setVisiblity(setVisible(true))} />)
            }
          }
        }
        }else{
          return {tabBarLabel: "Lektionen", tabBarButton: (props) => {
            if(netConnected){
              return (<Pressable {...props} />)

            }else{
              return (<Pressable {...props} onPress={() => setVisiblity(setVisible(true))} />)
            }
          }}
        }
      }
    } 
      component={LessonOverviewStack} />
    <Tab.Screen 
      name={'Settings'} 
      options={(route) => { 
        const visibility = getTabBarVisibility(route)
        // console.log("visiblity", visibility);
        if(visibility){
          return {tabBarLabel: "Einstellungen", tabBarStyle: visibility , tabBarButton: (props) => {
            if(netConnected){
              return (<Pressable {...props} />)
            }else{
              return (<Pressable {...props} onPress={() => setVisiblity(setVisible(true))} />)
            }
          }
        }
      }else{
          return {tabBarLabel: "Einstellungen", tabBarButton: (props) => {
            if(netConnected){
              return (<Pressable {...props} />)

            }else{
              return (<Pressable {...props} onPress={() => setVisiblity(setVisible(true))} />)
            }
          }}
        }
      }}
      component={SettingStack} />
    <Tab.Screen 
      name={'Downloads'} 
      options={({route}) => { 
        const visibility = getTabBarVisibility(route)
        // console.log("visiblity", visibility);
        if(visibility){
          return {tabBarLabel: "Downloads", tabBarStyle: visibility}
        }else{
          return {tabBarLabel: "Downloads"}
        }
      }} 
      component={DownloadsStack} />
  </Tab.Navigator>
  )
}

const preRoutes = [
  "DemoOne",
  "MethodVideo",
  "LessonSentence",
  "Dashboard",
  "LessonSentenceDownloads",
];
const getTabBarVisibility = (route) => {
  // console.log('route', route);

  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log('routeName', routeName);
  if (preRoutes.some((item) => routeName == item)) {
    // console.log(false);
    return {display: "none" };
  }
  return undefined;
};

// Lektionen
// Einstellungen
// Downloads