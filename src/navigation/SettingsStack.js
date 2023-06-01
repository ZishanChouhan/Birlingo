import React from "react";
import SettingsMenu from '../screens/settings/settingsMenu/SettingsMenu';
import SettingsProfile from '../screens/settings/profile/SettingsProfile';
import SettingsAccount from '../screens/settings/settingsAccount/SettingsAccount';
import MethodVideo from "../screens/methodVideo/MethodVideo";
import TransactionHistory from "../screens/settings/transactionHistory/TransactionHistory";
import SettingsTerms from '../screens/settings/settingsTerms/SettingsTerms';
import SettingsPrivacy from '../screens/settings/settingsPrivacy/SettingsPrivacy';
import SettingsChooseLan from '../screens/settings/settingsChooseLan/SettingsChooseLan';
import SettingsSupport from '../screens/settings/settingsSupport/SettingsSupport';
import SettingsRate from '../screens/settings/settingsRate/SettingsRate';
import SettingsPayment from '../screens/settings/settingsPayment/SettingsPayment';
import SettingsChangeAppLang from '../screens/settings/settingsChangeAppLang/SettingsChangeAppLang';
import ChangePassword from '../screens/settings/changePassword/ChangePassword';
// import ChooseSubscription from '../screens/settings/settingChooseSubscription/ChooseSubscription';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyOtp from "../screens/verification/VerifyOtp";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return(
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"SettingsMenu"}>
    <Stack.Screen name={'SettingsMenu'} component={SettingsMenu} />
    <Stack.Screen name={'SettingsProfile'} component={SettingsProfile} />
    <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
    <Stack.Screen name={'SettingsAccount'} component={SettingsAccount} />
    <Stack.Screen name={'MethodVideo1'} component={MethodVideo} />
    <Stack.Screen name={'SettingsPayment'} component={SettingsPayment} />
    {/* <Stack.Screen name={'ChooseSubscription'} component={ChooseSubscription} /> */}
    <Stack.Screen name={'TransactionHistory'} component={TransactionHistory} />
    <Stack.Screen name={'SettingsTerms'} component={SettingsTerms} />
    <Stack.Screen name={'SettingsPrivacy'} component={SettingsPrivacy} />
    <Stack.Screen name={'SettingsChooseLan'} component={SettingsChooseLan} />
    <Stack.Screen name={'SettingsChangeAppLang'} component={SettingsChangeAppLang} />
    <Stack.Screen name={'SettingsSupport'} component={SettingsSupport} />
    <Stack.Screen name={'SettingsRate'} component={SettingsRate} />
    <Stack.Screen name={'VerifyOtp'} component={VerifyOtp} />
  </Stack.Navigator>
  )
}

export default SettingStack;