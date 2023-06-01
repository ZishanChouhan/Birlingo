import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { logoutAction } from "../screens/settings/settingAction";
global.setupHours = 24 * 60 * 60 * 1000;
global.setHours = 23.55 * 60 * 60 * 1000;

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentDidMount() {}

  logout = () => {
    AsyncStorage.getItem("authUser", (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        data = {
          user_id: userDetails && userDetails._id,
        };
        this.props.logout(data);
      } else {
      }
    });
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userInfo = await AsyncStorage.getItem("authUser");
    const user = JSON.parse(userInfo);
    console.log("AuthLoading_userInfo", user);

    if (user) {
      console.log("if_condition");
      // let userDetail = JSON.parse(userInfo);
      global.user_id = user._id;
      global.AuthToken = user.token;
      global.userLanguageId = user.language_id;
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //console.log("role_id", userDetail.role_id);
      const item1 = await AsyncStorage.getItem('appTerms');
      console.log("item1", item1);
      if (item1 != null) {
        var appTerms = JSON.parse(item1);
        global.Terms = appTerms;
      }

      if(user.role_id == 2){
        this.props.navigation.navigate("TabNavigator", {screen: "LessonOverview", params: {screen: "LessonOverviewChoose"}})
      }else{
        this.props.navigation.navigate("AuthStack", {screen: "Login"})
      }
    } else {
      // var now = new Date().getTime();
      // var setupTime = await AsyncStorage.getItem('setupTime');

      // console.log(now - parseInt(setupTime), global.setupHours)
      // if (setupTime == null) {
      //   console.log('if condition')
      //   AsyncStorage.setItem('setupTime', global.setupTime + "")
      // } else {
      //   if (now - (parseInt(setupTime)) > global.setupHours) {
      //     console.log('else 1 condition')
      //     AsyncStorage.setItem('setupTime', global.setupTime + "");
      //     this.logout();
      //   } else {
      //     console.log('else 2 condition')
      //     this.props.navigation.navigate("Auth");
      //   }
      // }
      introComplete = await AsyncStorage.getItem('introComplete')
      console.log("introComplete", introComplete);
      if(introComplete){
        this.props.navigation.navigate("AuthStack", {screen : "Login"});
      }else{
        // if(Platform.OS == "ios"){

        // }
        this.props.navigation.navigate("AuthStack", {screen : "Welcome"});
      }
      // const intro = JSON.parse(introComplete);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
         <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => {
      dispatch(logoutAction(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
