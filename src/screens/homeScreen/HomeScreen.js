import React, { Component } from "react";
import { View, Text, TouchableOpacity,StatusBar } from "react-native";
import { connect } from "react-redux";
import { logoutAction } from "../signUpScreen/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = () => {
    AsyncStorage.getItem("authUser", (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        data = {
          user_id: userDetails && userDetails._id,
        };
        this.props.logout(data);
      }
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "cyan",
        }}
      >
          <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={{ fontSize: 30 }}> homeScreen </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    getAppLanguage: state.appLanguage.getAppLanguage,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
  };
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
)(HomeScreen);
