// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   SafeAreaView
// } from "react-native";
// import {createStackNavigator} from "react-navigation-stack";
// import {createDrawerNavigator} from "react-navigation-drawer";
// import {
//   createAppContainer,
//   DrawerItems
// } from "react-navigation";
// import { StackNavigatorHelper } from "react-navigation-helper";
// import AsyncStorage from "@react-native-community/async-storage";
// import { LoginManager } from "react-native-fbsdk";
// import fonts from "../res/fonts";
// import colors from "../res/colors";
// import images from "../res/images";

// import SubscriptionPlan from "../screens/Subscription/SubscriptionPlan";
// import Home from "../screens/App/Customer/Home";

// import DrawerMenu from "./DrawerMenu";
// import ParkingBooking from "../screens/App/Customer/Booking/ParkingBooking";
// import EditUserProfile from "../screens/App/Customer/EditUserProfile";
// import ChangePassword from "../screens/App/Commom/ChangePassword";

// const homeStack = createStackNavigator(
//   {
    
//     SubscriptionPlan: StackNavigatorHelper.paramsToProps(SubscriptionPlan),
//     Home: StackNavigatorHelper.paramsToProps(Home),
//     ParkingBooking: StackNavigatorHelper.paramsToProps(ParkingBooking),    
//     EditUserProfile: StackNavigatorHelper.paramsToProps(EditUserProfile)
//   },
//   {
//     initialRouteName: "Home",
//     headerMode: "none"
//   }
// );

// const MyDrawerNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: homeStack
//     },
//     EditUserProfile: {
//       screen: StackNavigatorHelper.paramsToProps(EditUserProfile)
//     },
//     ChangePassword: {
//       screen: StackNavigatorHelper.paramsToProps(ChangePassword)
//     }
//   },
//   {
//     initialRouteName: "Home",
//     contentComponent: props => <DrawerMenu {...props} />,
//     drawerBackgroundColor: "#ffffff",
//     drawerOpenRoute: "DrawerOpen",
//     drawerCloseRoute: "DrawerClose",
//     drawerPosition: "left",
//     drawerToggleRoute: "DrawerToggle",
//     contentOptions: {
//       activeTintColor: colors.white,
//       activeBackgroundColor: "transparent",
//       inactiveTintColor: colors.white,
//       itemsContainerStyle: {
//         //marginTop: 20,
//       },
//       iconContainerStyle: {
//         opacity: 1
//       },
//       itemStyle: {
//         height: 50,
//         borderBottomWidth: 1,
//         borderBottomColor: "#rgba(232,232,232,0.3)"
//       },
//       labelStyle: {
//         // color: "red",  //ohter content style
//         // fontSize: 14
//       }
//     },
//     tabBarOptions: {
//       activeTintColor: "#fff",
//       inactiveTintColor: colors.white,
//       style: {
//         opacity: 0.5
//       },
//       indicatorStyle: {
//         color: "#fff"
//       }
//     }
//   },
//   {
//     style: {
//       opacity: "0.7",
//       flex: 1,
//       marginTop: 20
//     }
//   }
// );

// export const CustomerAppStack = createAppContainer(MyDrawerNavigator);
