//***** import libraries */
import React, { Component, useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';


//***** Common component for handling back button in android */
const HandleBack = (props) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  // console.log('navigation', navigation);
  // console.log('route', route);
 
  // useEffect(() => {
  //     const subs = BackHandler.addEventListener("hardwareBackPress", onBack);
  //     console.log('subs', subs);
  //   // );
  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", onBack)
  //   }
  // }, [])

  // const onBack = () => {
  //   if(route.name="lessonOverviewChoose"){
  //     props.onBack();
  //   }else{
  //     // navigation.goBack();
  //   }
  // };
  return props.children;
}

export default HandleBack;
