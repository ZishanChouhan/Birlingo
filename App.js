import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import {enableScreens } from 'react-native-screens';
import AppStack from './src/navigation/AppContainer';
import {Provider, connect} from 'react-redux';
import store from './src/reducer';
import {navigatorRef} from './src/actions/navigationHelpers';
// import { , Box } from "native-base";
import {NavigationContainer, DefaultTheme, DarkTheme, CommonActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import _checkLanguage from './src/navigation/AuthLoading';
import {BlueButton, NetMoadal} from './src/components';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrls, baseApiUrl } from './src/api/constants/constants';
import { doGet } from './src/actions/fetchApiActions';
import { saveHistoryApi } from './src/api/demoActions';
import { getVersion } from 'react-native-device-info';
import VersionModal from './src/components/VersionModal/VersionModal';
import RNRestart from 'react-native-restart';
import { setNetConnected, setVisible } from './src/navigation/AppReducer';
import analytics from '@react-native-firebase/analytics';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

global.Terms = '';
global.active = 'Langsam';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      netConnected: true,
      appString: '',
      isShow: false,
      version_status_msg: "",
      apple_url: "",
      google_url:"",
      version_status:"",
      isfirst: false,
    };
  }

  componentDidMount = () => {
    try{
      enableScreens(false);
      setTimeout(() => {
        SplashScreen.hide();
      }, 2500)

      NetInfo.fetch().then(state => {
        console.log('stat', state);
        this.setState({netConnected: state.isConnected})
        if(!state.isConnected){
          this.setState({isfirst: true})
        }
      }).catch(err => console.log(err));
      this.subscribe = NetInfo.addEventListener(state => {
        // console.log("state",state);
        // alert(JSON.stringify(state));
        this.handleFirstConnectivityChange(state.isConnected)
      });
      let version = getVersion()
      let versionArr = version.split(".");
      if(versionArr.length >2 ){

      }else{
        version = version + ".0"
      }
    
      AsyncStorage.getItem('appTerms', (err1, item1) => {
        // console.log("item1", item1);
        if (item1 != null) {
          var appTerms = JSON.parse(item1);
          global.Terms = appTerms;
          this.setState({appString: appTerms});
        }
      });

      global.version = version
      // console.log("version", version);
      doGet(`${baseApiUrl}/getSettingData?app_version=${version}&platform=${Platform.OS}`).then(async res => {
        global.methodUrl = res && res.data && res.data.method_video_url; 
        console.log('res', res);
        if(res.version_status == 2){
          this.setState({isShow: false, version_status: res.version_status});
            await AsyncStorage.setItem(
              'system_setting',
              JSON.stringify(res.data),
            );
            
        } else if(res.version_status == 1){
          // console.log("Date.now()", new Date());
          AsyncStorage.getItem('versionOneTime', async (err1, item1) => {
            const item = JSON.parse(item1);
            console.log("item", item)
            if (item == null) {
              var startTime = new Date();
              await AsyncStorage.setItem("versionOneTime", JSON.stringify(startTime));
              // this.setState({isShow: false, version_status: res.data.version_status});
              this.setState({isShow: true, version_status_msg: res.version_status_msg, apple_url: res.data.apple_url, google_url: res.data.play_url, version_status: res.version_status});
            }else{

              const endDate = new Date();
              const difference = this.getDifferenceBetweenTwoDates(item, endDate)
              // 86400
              if(difference <= 86400){
                this.setState({isShow: false, version_status: res.version_status});
              }else{
                var startTime = new Date();
                
                await AsyncStorage.setItem("versionOneTime", JSON.stringify(startTime));
                this.setState({isShow: true, version_status_msg: res.version_status_msg, apple_url: res.data?.apple_url, google_url: res.data.play_url, version_status: res.version_status});
              }
            }
          });
          
          // this.setState({isShow: true, version_status_msg: res.data.version_status_msg, apple_url: res.data.data?.apple_url, google_url: res.data.data?.play_url, version_status: res.data.version_status});
        }else if(res.version_status == 0){
          this.setState({isShow: true, version_status_msg: res.version_status_msg, apple_url: res.data?.apple_url, google_url: res.data?.play_url, version_status: res.version_status});
        } else if(res.version_status == 3){
          this.setState({isShow: true, version_status_msg: res.version_status_msg, apple_url: res.data?.apple_url, google_url: res.data?.play_url, version_status: res.version_status});
        }
      }).catch(err => console.log(err));

      AsyncStorage.getItem('appLanguage').then(lang => {
        var alpha = JSON.parse(lang);

        if(alpha == null){
          global.active = 'Langsam'
        }else{
          global.active = alpha
        }
    });

    }catch(err){
      console.log("err", err);
    }
  };

  getDifferenceBetweenTwoDates = function (startDate, endDate) {
    startDate 	= new Date(startDate);
    endDate = endDate ? new Date(endDate) : new Date();
    
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffInSeconds = Math.ceil(timeDiff / 1000);
    // var diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return diffInSeconds;
  }; //end getDifferenceBetweenTwoDates();

  handleFirstConnectivityChange = isConnected => {
    // setTimeout(() => {
        console.log("in", isConnected);
        // this.setState({netConnected: isConnected });
        this.props.setNetConnectedFunc(isConnected)
      // }, 4000)
      if (isConnected) {
        if(this.state.isfirst){
          this.setState({isfirst: false})
          RNRestart.Restart();
        }
        global.isConnected = true;
        AsyncStorage.getItem('learnedLesson').then(value => {
          let val = JSON.parse(value);
          if(val){
            const historyData = {
              lesson_id: val.lesson_id,
              lessonfamily_id: val.lessonfamily_id,
              current: val.current,
              is_demo: val.is_demo,
              time_loop: val.time_loop,
              active: val.active,
              passive: val.passive,
              speak: val.speak,
              repeat: val.repeat,
              level_id: val.level_id,
            };
            saveHistoryApi(historyData);
          }
        AsyncStorage.removeItem('learnedLesson')
      });

      AsyncStorage.getItem('learnedLessonToBeUpdated').then(data => {
        let newVal = JSON.parse(data);
        if(newVal){
          const historyData = {
            lesson_id: newVal.lesson_id,
            lessonfamily_id: newVal.lessonfamily_id,
            current: newVal.current,
            is_demo: newVal.is_demo,
            time_loop: newVal.time_loop,
            active: newVal.active,
            passive: newVal.passive,
            speak: newVal.speak,
            repeat: newVal.repeat,
            level_id: newVal.level_id,
          };
          saveHistoryApi(historyData);
        }
        AsyncStorage.removeItem('learnedLessonToBeUpdated')
      });

      AsyncStorage.getItem('learnedLessonHistory').then(data => {
        let newDataParsed = JSON.parse(data);
        if(newDataParsed){
          const historyData = {
            lesson_id: newVal.lesson_id,
            lessonfamily_id: newVal.lessonfamily_id,
            current: newVal.current,
            is_demo: newVal.is_demo,
            time_loop: newVal.time_loop,
            active: newVal.active,
            passive: newVal.passive,
            speak: newVal.speak,
            repeat: newVal.repeat,
            level_id: newVal.level_id,
          };
          saveHistoryApi(historyData);
        }
        AsyncStorage.removeItem('learnedLessonHistory');
      })
    } else {
      global.isConnected = false;
    }
  };

  isConnected = async () => {
    await fetch('https://www.google.com/')
      .then(response => {
        if (response.ok) {
          global.isConnected = true;
          // this.setState({netConnected: true});
          this.props.setNetConnectedFunc(true)
          navigatorRef.navigate("LessonOverview",{screen:'LessonOverviewChoose'});
        } else {
          
        }
        // Do stuff with the response
      })
      .catch(error => {
        return false;
      });
  };

  componentWillUnmount() {
    // NetInfo.removeEventListener(
    //   'connectionChange',
    //   this.handleFirstConnectivityChange,
    // );
  }

  goToDownloads = () => {
    this.props.setVisiblity(false)
    navigatorRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Downloads"}
        ]
      })
    )
    // this.setState({
    //   netConnected: true,
    // });
  };

  render() {
    const {appString} = this.state;
    console.log("this.props", this.props);
    // console.log("navigatorRef", navigatorRef);
    // console.log("getCurrentRoute", navigatorRef.getCurrentRoute());
    return (
      // <Provider store={store}>
        <>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="rgb(255,255,255)"
          />
          <NavigationContainer ref={navigatorRef} >
            <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
              <Stack.Screen name="RootStack" component={AppStack} />
            </Stack.Navigator>
          </NavigationContainer>
          <NetMoadal
            visible={this.props.visible}
            appString={appString}
            download={this.goToDownloads}
            isConnected={this.isConnected}
          />
          <VersionModal
            visible={this.state.isShow}
            appString={appString}
            download={this.goToDownloads}
            isConnected={this.isConnected}
            msg={this.state.version_status_msg}
            appleUrl={this.state.apple_url}
            googleUrl={this.state.google_url}
            continue={()=>this.setState({isShow: false})}
            versionStatus={this.state.version_status}
          />
          <FlashMessage position="top" />
        </>
      // </Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.isNetConnected.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNetConnectedFunc: (isConnected) => {
      dispatch(setNetConnected(isConnected));
    },
    setVisiblity: (visible) => {
      dispatch(setVisible(visible));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
