import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  BackHandler,
  StatusBar,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from './styles';
import {logoutAction} from '../settingAction';
import { apiUrls } from '../../../api/constants/constants';
import { doGet } from '../../../actions/fetchApiActions';
import LinearGradient from 'react-native-linear-gradient';
import {getNativeLanguageAfterLoginAction} from '../../selectLanguage/actions';

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: '',
      change: 2,
      systemSetting: '',
    };
  }

  componentDidMount() {

    this.subs = this.props.navigation.addListener("focus" , () => {
      this.viewWillAppear();
      // this.props.getNativeLanguage();
      this.backSubs = BackHandler.addEventListener("hardwareBackPress", this.onBack)
    });
    this.removeSubs = this.props.navigation.addListener("blur" , () => {
      console.log("dkfkfk");
      this.backSubs?.remove();
    })

    AsyncStorage.getItem('system_setting', (err1, item1) => {
      if (item1 != null) {
        var systemSetting = JSON.parse(item1);
        console.log("systemSetting",systemSetting);
        this.setState({systemSetting: systemSetting});
      } else {
      }
    });

    doGet(`${apiUrls.getStoreUrl}`).then(async res => {
      console.log("res from getService",res);
      global.methodUrl = res && res.data && res.data.method_video_url
    });
  }

  componentWillUnmount(){

  }

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

  viewWillAppear() {
      AsyncStorage.getItem('appTerms', (err1, item1) => {
        if (item1 != null) {
          var appTerms = JSON.parse(item1);
          this.setState({appString: appTerms});
        }
      });
    if (this.props && this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString) {
      this.setState({appString: this.props.getAppString.data});
    }
  }

  logout = () => {
    AsyncStorage.getItem('authUser', (err1, item1) => {
      console.log("item1",item1);
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        const data = {
          user_id: userDetails && userDetails._id,
        };
        this.props.logout(data);
      } else {
      }
    });
  };

  onLogoutButtonPress = () => {
    const {appString} = this.state;
    Alert.alert(
      appString && appString.msg_logout_confirm,
      '',
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: 'cancel',
        },
        {text: appString && appString.lbl_yes, onPress: () => this.logout()},
        // { text: appString && appString.lbl_yes, onPress: () => this.logout() }
      ],
      {cancelable: false},
    );
    return true;
  };

  render() {
    const {appString} = this.state;

    return (
      <SafeAreaView style={{flex:1, paddingBottom: Platform.OS == "ios" ? -15: 0}}>
         <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <View style={{flex: 1}}>
          <LinearGradient colors={colors.backGround} style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingTop: 5}}>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() =>
                  this.props.navigation.navigate('SettingsProfile')
                }>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_profile}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              {this.state.systemSetting != 0 ? (
                <TouchableOpacity
                  style={styles.tabView}
                  onPress={() =>
                    this.props.navigation.navigate('SettingsAccount')
                  }>
                  <View activeOpacity={0.8} style={styles.titleView}>
                    <Text style={styles.title}>
                      {appString && appString.lbl_account}
                    </Text>
                  </View>
                  <View style={styles.arrowView}>
                    <Image
                      source={images.arrowRightBlue}
                      style={styles.arrow}
                    />
                  </View>
                </TouchableOpacity>
              ) : null} 
              {this.state.change === 2 ? (
                <TouchableOpacity
                  style={styles.tabView}
                  onPress={() =>
                    this.props.navigation.navigate('ChangePassword')
                  }>
                  <View activeOpacity={0.8} style={styles.titleView}>
                    <Text style={styles.title}>
                      {appString && appString.lbl_change_password}
                    </Text>
                  </View>
                  <View style={styles.arrowView}>
                    <Image
                      source={images.arrowRightBlue}
                      style={styles.arrow}
                    />
                  </View>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.tabView}
                onPress={() =>
                  this.props.navigation.navigate('MethodVideo1', {screenFrom:"settings"})
                }>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_method}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() =>
                  this.props.navigation.navigate('SettingsChooseLan')
                }>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_change_learning_title}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tabView}
                onPress={() => this.props.navigation.navigate('SettingsTerms')}>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_terms_use}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() =>
                  this.props.navigation.navigate('SettingsPrivacy')
                }>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_privacy_policy}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() =>
                  this.props.navigation.navigate('SettingsSupport')
                }>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_Support}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() => this.props.navigation.navigate('SettingsRate')}>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_rate_birlingo}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabView}
                onPress={() => this.onLogoutButtonPress()}>
                <View activeOpacity={0.8} style={styles.titleView}>
                  <Text style={styles.title}>
                    {appString && appString.lbl_Logout}
                  </Text>
                </View>
                <View style={styles.arrowView}>
                  <Image source={images.arrowRightBlue} style={styles.arrow} />
                </View>
              </TouchableOpacity>
            </ScrollView>
        
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
    getAppLanguage: state.appLanguage.getAppLanguage,
    data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getNativeLanguage: languageId => {
    //   dispatch(getNativeLanguageAfterLoginAction(languageId));
    // },
    logout: data => {
      dispatch(logoutAction(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsMenu);
