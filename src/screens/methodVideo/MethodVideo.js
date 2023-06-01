import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Alert,
  BackHandler,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {
  NetMoadal,
  SettingHeaderTitle,
} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {metrics, colors, fonts} from '../../Theme';
import {Loader} from '../../components';
import YoutubePlayer from 'react-native-youtube-iframe';
import { apiUrls } from '../../api/constants/constants';
import { doGet } from '../../actions/fetchApiActions';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

class MethodVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: this.props?.getAppString?.data,
      visible: false,
      netConnected: true,
      isLoading: true,
      demoData: '',
      systemSetting: '',
      screenFrom: this.props?.route?.params?.screenFrom,
      loading: false,
      videoFullScreen: false,
      play: true
    };
  }

  componentDidMount() {
    // console.log("global.methodUrl.substr(global.methodUrl.indexOf('=')+1)",global.methodUrl?.substr(global.methodUrl.indexOf('=')+1));
    
    this.subs = this.props.navigation.addListener("focus", () => this.viewWillAppear())

    this.subs = this.props.navigation.addListener("blur", () => {
      console.log("djfh");
      this.setState({play: false})
      // this.props.navigation.goBack();
    })
  }

  componentWillUnmount(){
    this.setState({play: false})
  }

  viewWillAppear() {
    doGet(`${apiUrls.getStoreUrl}`).then(res => {
      console.log('res from getService', res);
      this.setState({
        ...this.state,
        systemSetting: res && res.data,
      });
      console.log("global?.methodUrl", global?.methodUrl);
    }).catch(err => console.log("err", err));
    this.state.videoId = global?.methodUrl?.substr(global.methodUrl.indexOf('=')+1);
    // this.state.videoId = global.methodUrl?.substr(global.methodUrl.indexOf('='));
    console.log("global.methodUrl.substr(global.methodUrl.indexOf('='))",global.methodUrl?.substr(global.methodUrl.indexOf('=')));
  }

  //**** For handling back button in android /
  onBack = () => {
    const {appString} = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      '',
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  handleClick = () => {
    const {appString} = this.state;

    this.props.navigation.replace('Dashboard');
  };

  onStateChange = (state) => {
    if(state == "playing"){
      this.setState({play: true})
    }else if(state == "paused"){
      this.setState({play: false})
    }
  }

  render() {
    const {appString} = this.state;
    console.log(appString);
    console.log('this.state.screenfrom', this.state.screenFrom);
    return (
      <SafeAreaView style={{flex: 1, color: colors.backGround}}>
          <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
        <ScrollView>
          {this.state.screenFrom == 'settings' ? (
            <SettingHeaderTitle
              title={appString && appString.lbl_method}
              navigation={this.props.navigation}
              fSize={ Dimensions.get('window').width > 670 ?40:22}
              goBack={() => {
                this.props.navigation.navigate('SettingsMenu');
              }}
            />
          ) : null}

          <Loader loading={this.state.loading} />
          <View style={{marginHorizontal: 30, marginTop: 50}}>
            <View>
              <Text style={styles.title}>
                {appString && appString.lbl_video_title}
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.subTitle}>
                {appString && appString.lbl_video_text}
              </Text>
            </View>
          </View>
          
          {global.methodUrl && global.methodUrl != null ? (
            <View
              style={{
                height: height * (100 / 375),
                marginHorizontal: Platform.OS == "android" ? width * (5 / 375) : width * (0 / 375),
                marginTop: 10,
                alignItems:'center',
                // backgroundColor:'red'
              }}>
  
              {this.state.isLoading &&
              <View style={{
                height:height * (100 / 375),
                width: Platform.OS=='ios'?'95%':'95%',
                position: "absolute",
                paddingTop: 90,
                backgroundColor: "#000"
              }}>
                <ActivityIndicator
                  animating={this.state.isLoading}
                  color={"#fff"}
                  size={'large'}
                />
              </View>
              }
              <YoutubePlayer  
                play={this.state.play} 
                videoId={this.state.videoId} 
                height={height * (400 / 375)} 
                width={Platform.OS=='ios'?'95%':'95%'}
                onReady={(e) => this.setState({isLoading: false})}
                onChangeState={(state) => this.onStateChange(state)}  
              />
            </View>
          ) : null}

          {this.state.screenFrom != 'settings' ? (
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity
                onPress={() => {
                  this.handleClick();
                }}
                style={styles.nextButton}>
                <Text style={styles.nextText}>
                  {appString && appString.lbl_here_we_go}
                </Text>
              </TouchableOpacity>
            </View>)
          : null} 
          
            </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessonFamilyList: state.lessonFamily.lessonFamilyList,
    getAppString: state.appLanguage.getAppString,
    checkNet: state.netReducer.checkNet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getLessonFamily: (data, appString) => {
    //     dispatch(getLessonFamilyAction(data, appString))
    // },
    // getubScriptionStatus: () => {
    //     dispatch(getSubscriptionStatusAction())
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MethodVideo);

export const styles = StyleSheet.create({
  title: {
    fontSize: width * (32 / 375),
    color: colors.code_fff,
    fontFamily: fonts.type.ACaslonPro_Bold,
  },
  subTitle: {
    fontSize: width * (18 / 375),
    color: colors.code_fff,
    fontFamily: fonts.type.Regular,
  },
  nextButton: {
    backgroundColor: colors.maroon,
    height: width * (60 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * (45 / 375),
    marginBottom: width * (15 / 375),
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  nextText: {
    color: colors.code_fff,
    fontSize: width * (16 / 375),
    fontFamily: fonts.type.Akkurat_Bold,
  },
});
