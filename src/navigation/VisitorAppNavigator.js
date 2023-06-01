import React,{ Component } from "react";
// import {createAppContainer} from "react-navigation"
// import { createStackNavigator } from "react-navigation-stack";
// import { StackNavigatorHelper } from "react-navigation-helper";
import Home from "../screens/App/Customer/Home";
import MyAccount from "../screens/App/Visitor/MyAccount";
import DrawerMenu from "./DrawerMenu";
// import { createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import fonts from "../res/fonts";
import colors from "../res/colors";
 const visitorStack = createStackNavigator(   
        {        
                Home: StackNavigatorHelper.paramsToProps(Home),
                MyAccount: StackNavigatorHelper.paramsToProps(MyAccount),
        
        },
        {
        initialRouteName: "MyAccount",
        headerMode: "none",
       
        }
);

const MyDrawerNavigator = createDrawerNavigator(
        {
                Home:{
                        screen:visitorStack
                },
                MyAccount:{
                        screen:StackNavigatorHelper.paramsToProps(MyAccount)
                }
        },
        {
                initialRouteName: "Home",
                contentComponent: props => <DrawerMenu {...props} />,
                drawerBackgroundColor: "#ffffff",
                drawerOpenRoute: "DrawerOpen",
                drawerCloseRoute: "DrawerClose",
                drawerPosition: "left",
                drawerToggleRoute: "DrawerToggle",
                contentOptions: {
                  activeTintColor: colors.white,
                  activeBackgroundColor: "transparent",
                  inactiveTintColor: colors.white,
                  itemsContainerStyle: {
                    //marginTop: 20,
                  },
                  iconContainerStyle: {
                    opacity: 1
                  },
                  itemStyle: {
                    height: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: "#rgba(232,232,232,0.3)"
                  },
                  labelStyle: {
                    // color: "red",  //ohter content style
                    // fontSize: 14
                  }
                },
                tabBarOptions: {
                  activeTintColor: "#fff",
                  inactiveTintColor: colors.white,
                  style: {
                    opacity: 0.5
                  },
                  indicatorStyle: {
                    color: "#fff"
                  }
                }
              },
              {
                style: {
                  opacity: "0.7",
                  flex: 1,
                  marginTop: 20
                }
              }
        
)
export const Visitor = createAppContainer(MyDrawerNavigator);