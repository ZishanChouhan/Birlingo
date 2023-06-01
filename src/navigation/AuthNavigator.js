import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectLanguage from "../screens/selectLanguage/selectLanguage";
import Login from "../screens/login/Login";
import AppInfo from "../screens/login/AppInfo";
import Signup from "../screens/signUpScreen/SignUpScreen";
import ForgetPassword from "../screens/forgetPass/ForgetPassword";
import ResetPassword from "../screens/resetPass/ResetPassword";
import VerifyOtp from "../screens/verification/VerifyOtp";
import Welcome from "./welcome";
import HomeScreen from "../screens/homeScreen/HomeScreen";
import MethodVideo from "../screens/methodVideo/MethodVideo";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  console.log("global.logout" , global.logout);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={global.logout == 1 ? "Login": "Welcome"}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Welcome'} component={Welcome} />
      <Stack.Screen name={'AppInfo'} component={AppInfo} />
      <Stack.Screen name={'SelectLanguage'} component={SelectLanguage} />
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'ForgetPassword'} component={ForgetPassword} /> 
      <Stack.Screen name={'MethodVideo'} component={MethodVideo} />
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
      <Stack.Screen name={'VerifyOtp'} component={VerifyOtp} />
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AuthStack;