import React, { useEffect, useState } from 'react';
import DemoOne from '../screens/demo/demoOne/DemoOne';
import { SafeAreaView } from 'react-native';
import LessonSentence from '../screens/lessons/lessonSentence/LessonSentence';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import LessonOverviewDownload from '../screens/lessonOverview/lessonOverviewDownload/LessonOverviewDownload';
import LessonOverviewChoose from '../screens/lessonOverview/lessonOverviewChoose/LessonOverviewChoose';
import Dashboard from '../screens/dashBoard/Dashboard';
import AppInfo from '../screens/login/AppInfo';
import MethodVideo from '../screens/methodVideo/MethodVideo';

const Stack = createNativeStackNavigator();

export default LessonOverviewStack = (props) => {
    return(
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"LessonOverviewChoose"}>
        <Stack.Screen name={'LessonOverviewChoose'} component={LessonOverviewChoose} />
        <Stack.Screen name={'LessonOverviewDownload'} component={LessonOverviewDownload} />
        <Stack.Screen name={'Dashboard'} component={Dashboard} />
        <Stack.Screen name={'DemoOne'} component={DemoOne} />
        <Stack.Screen name={'MethodVideo'} component={MethodVideo} />
        <Stack.Screen name={'LessonSentence'} component={LessonSentence} />
      </Stack.Navigator>
    )
}
