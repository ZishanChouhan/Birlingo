import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Alert,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Text,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { connect } from "react-redux";
import { getAppGuideAction } from "./actions";
import { Loader } from "../../components";
import HandleBack from "../../components/container/Back";
import { AppIntroSlider } from "../../components";
import LinearGradient from "react-native-linear-gradient";
class AppInfo extends Component {
  constructor(props) {
    //console.log("App Info")
    super(props);

    this.firstTime = false;
    this.state = {
      appString: "",
      appGuide: [],
      loading: false,
      showRealApp: false,
    };
    // console.log("");
  }

  async componentDidMount() {
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: this.props.getAppString.data });
    }

    console.log("AppInfo");
    console.log("this.props.getAppString", this.props.getAppString);
    console.log("this.state.appString", this.state.appString);
    AsyncStorage.getItem("language", (err, item) => {
      if (err == null) {
        const lang = JSON.parse(item);
        languageId = {
          language_id: lang && lang.language_id,
        };

        this.props.getAppGuide(languageId);
      }
    });
    await AsyncStorage.setItem('introComplete', "done");
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.authReducer.getAppGuide &&
      newProps.authReducer.getAppGuide.data !== this.state.appGuide
    ) {
      this.setState({ appGuide: newProps.authReducer.getAppGuide.data });
    }
  }

  //***** For handling back button in android */
  onBack = () => {
    const { appString } = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      "",
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: "cancel",
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  _onDone = async () => {
    this.setState({ showRealApp: true });
    await AsyncStorage.setItem("introComplete", "done");
    this.props.navigation.navigate("Signup");
  };
  __onSkip = async () => {
    await AsyncStorage.setItem("introComplete", "done");
    this.props.navigation.navigate("Login");
  };

  _renderItem = ({ item }) => {
    //alert(JSON.stringify(item))
    return (
      <View style={styles.slides}>
        <Text style={styles.title}>{item.title} </Text>
        <Text style={styles.text}>{item.heading}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  _goToLogin = async () => {
    await AsyncStorage.setItem("introComplete", "done");
   
    this.props.navigation.navigate("Login");
  };

  _goToDemoLession = () => {
    this.props.navigation.navigate("DemoOne");
  };
  _goToSignUp = async () => {
    await AsyncStorage.setItem("introComplete", "done");
    this.props.navigation.navigate("Signup");
  };

  render() {
    const { appString, appGuide } = this.state;
    console.log("appString", appString);
    const { isLoading } = this.props;

    return (
      <HandleBack onBack={this.onBack}>
          <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <LinearGradient
          colors={["rgb(138, 80, 130)", "rgb(255, 123, 137)"]}
          style={{ flex: 1 }}
        >
          {/* <Loader loading={isLoading} /> */}

          <AppIntroSlider
            slides={appGuide}
            renderItem={this._renderItem}
            onDone={this._onDone}
            onSkip={this._onSkip}
            screenName={"AppInfo"}
            btnStyle={"AppInfoStyle"}
            doneLabel={appString && appString.lbl_done}
            nextLabel={appString && appString.lbl_next}
            showSkipButton={true}
            showNextButton={false}
            hidePagination={true}
            // skipLabel={appString && appString.lbl_skip}
            dotStyle={{ borderColor: "#fff", borderWidth: 1 }}
          />

          {/* <View style={styles.free}>
            

            <TouchableOpacity
              style={styles.loginText}
              onPress={() => this._goToLogin()}
            >
              <Text style={styles.login}>
                {appString && appString.lbl_login}
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.free}>
 <TouchableOpacity
              style={styles.loginText}
              onPress={() => this._goToSignUp()}
            >
              <Text style={styles.login}>
              Kostenlos testen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginText}
              onPress={() => this._goToLogin()}
            >
              <Text style={styles.login}>
                Einloggen
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </HandleBack>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer.getAppGuide,
    getAppString: state.appLanguage.getAppString,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppGuide: (languageId) => {
      dispatch(getAppGuideAction(languageId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInfo);
