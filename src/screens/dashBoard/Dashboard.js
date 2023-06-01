import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Alert,
  BackHandler,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HandleBack from '../../components/container/Back';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {metrics, colors, fonts} from '../../Theme';
import {Loader} from '../../components';
import {showToast, showDangerToast} from '../../assets/utility/ToastMessage';
import { getLessonFamilyAction } from '../lessonOverview/actions';
import { apiUrls } from '../../api/constants/constants';
import { doGet, doPost } from '../../actions/fetchApiActions';
const height = metrics.screenHeight;
const width = metrics.screenWidth;

var isDissbled = false;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: this.props?.getAppString?.data,
      visible: false,
      netConnected: true,
      isLoading: false,
      demoData: '',
      systemSetting: '',
    };
  }

  componentDidMount() {
    
    AsyncStorage.getItem('system_setting', (err1, item1) => {
      if (item1 != null) {
        var systemSetting = JSON.parse(item1);
        this.setState({systemSetting: systemSetting});
      } else {
      }
    });
    this._sub2 = this.props.navigation.addListener(
        'focus',
      this.viewWillAppear.bind(this)
    );

  }

  componentDidUpdate(props){
    console.log("hfjhf");
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: this.props.getAppString.data});
    }
  }

  viewWillAppear() {
    this.getDemoLesson();
  }

  getDemoLesson = () => {
    this.setState({isLoading: true});

    doGet(`${apiUrls.demoLessonOnly}`).then(res => {
    // getService('demoLessonOnly')
      // .then(res => {
        console.log('res.data', res)
        if (res?.success == true) {
          console.log("in");
          this.setState({demoData: res.data});
        } else {
          showDangerToast(res.message);
        }
        this.setState({isLoading: false});
        this.props.getLessonFamily()
      })
      .catch(e => {
        this.setState({isLoading: false});
        console.log('e ====>', e);
      });
  };

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

  handleClick = async key => {
    const {appString} = this.state;

    if (isDissbled) {
      return;
    }
    isDissbled = true;

    doGet(`${apiUrls.welcomeProceeded}`).then(res => {
      console.log('res.data.data' , res);
      if (res.statuscode == 200) {

        console.log('this.state.demoData  1111111 ===>', this.state.demoData);
        if (key == 1) {
          console.log('this.state.demoData ===>', this.state.demoData);
          this.props.navigation.navigate('DemoOne', {
            demoDetails: this.state.demoData,
            isFirst: true,
            screenFrom: 'Dashboard',
            familyName: appString[this.state.demoData.term],
          });
        } else if (key == 2) {
          this.props.navigation.navigate('LessonOverviewDownload', {
            lessonfamily_id: this.state.demoData.lessonfamily_id,
            familyName: appString[this.state.demoData.term],
          });
        } else if (key == 3) {
          console.log('settingsAccount from dashboard');
          this.props.navigation.navigate('SettingsAccount');
        }
      } else {
        showDangerToast(res.message);
      }
      this.setState({isLoading: false});
    });

    setTimeout(() => {
      isDissbled = false;
    }, 2000);
  };

  render() {
    console.log("this.props", this.props);
    const {appString} = this.state;
    return (
      <HandleBack onBack={this.onBack}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <LinearGradient
          colors={colors.backGround}
          style={{flex: 1, justifyContent: 'center'}}>
          <Loader loading={this.state.isLoading} />
          <View style={{marginHorizontal: 30, marginBottom: 50}}>
            <View>
              <Text style={styles.title}>
                {appString && appString.lbl_here_we_go}
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.subTitle}>
                {appString && appString.lbl_want_to_start}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => {
                this.handleClick(1);
              }}
              style={styles.nextButton}>
              <Text style={styles.nextText}>
                {appString && appString.lbl_demo_explain}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.handleClick(2);
              }}
              style={styles.nextButton}>
              <Text style={styles.nextText}>
                {appString && appString.lf_kostenlose_lektionen}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </HandleBack>
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
    getLessonFamily: (data) => {
        dispatch(getLessonFamilyAction(data))
    },
    getubScriptionStatus: () => {
        dispatch(getSubscriptionStatusAction())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

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
    height: width * (50 / 375),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * (25 / 375),
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
