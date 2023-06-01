import React from 'react';
import DemoOne from '../screens/demo/demoOne/DemoOne';
import LessonSentenceDownloads from '../screens/downloads/lessonSentenceDownloads/LessonSentenceDownloads';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DownloadsList from '../screens/downloads/downloadsList/DownloadsList';
import DownloadsOffline from '../screens/downloads/downloadsOffline/DownloadsOffline';

const Stack = createNativeStackNavigator();

export default DownloadsStack = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}} >
    <Stack.Screen name={'DownloadsList'} component={DownloadsList} />
    <Stack.Screen name={'DownloadsOffline'} component={DownloadsOffline} />
    <Stack.Screen name={'LessonSentenceDownloads'} component={LessonSentenceDownloads} />
  </Stack.Navigator>
  )
}