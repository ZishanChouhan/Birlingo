import React, { useEffect, useState } from "react";
import AuthStack from "./AuthNavigator";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from "./MainStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppStack = () => {

  var access_token = useSelector(item => item?.userTokenReducer?.USER_TOKEN);
  global.AuthToken = access_token;
  console.log("access_token", access_token);
  // const getUser = async () => {
  //   const userData = await AsyncStorage.getItem("authUser");
  //   console.log("userData", userData);
  //   setUser(userData);
  // }

  if(access_token){
    return(
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"MainStack"}>
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    )
  }else{
    return(
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"AuthStack"}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    )
  }
};

export default AppStack;

console.disableYellowBox = true;