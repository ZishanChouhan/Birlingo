import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from '../settingsTerms/styles';
import { doPost } from '../../../actions/fetchApiActions';
import { apiUrls } from '../../../api/constants/constants';
import {getPrivacyPolicyAction} from '../settingAction';
import {BottomTab, Loader, SettingHeaderTitle} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import HTML from 'react-native-render-html';
import { showDangerToast } from '../../../assets/utility/ToastMessage';

class SettingsPrivacy extends Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {
      appString: '',
      privacyPolicyDetails: '',
      appString: '',
      loading: false,
    };
  }

  componentDidMount() {
    // this.getPrivacyPolicy();
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.setState({loading: true});
      AsyncStorage.getItem('language', (err1, item1) => {
        if (item1 != null) {
          var language = JSON.parse(item1);
          const privacyData = {
            slug: 'privacy-policy',
            language_id: language.language_id,
            device: 'web',
          };

          doPost(`${apiUrls.privacy_policy}`, privacyData).then(res => {
            console.log("res", res);
            this.setState({loading: false});
            if(res.success){
              this.setState({privacyPolicyDetails: res?.data[0]?.description})
            }else{
              // showDangerToast(global?.Terms[res.message]);
              showDangerToast(res.message);
            }
          }).catch(err => {
            console.log(err)
            this.setState({loading: false})
          })
        }
      })
      if (this.props?.getAppString?.data !== this.state.appString) {
        this.setState({appString: this.props.getAppString.data});
      }
    })
  }

  render() {
    const {appString} = this.state;
    var htmlCode = this.state.privacyPolicyDetails;
    let NewTitle = appString && appString.lbl_privacy_policy;
    console.log('=========htmlCode', htmlCode);

    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
          <Loader loading={this.state.loading} />
          <SettingHeaderTitle
            title={NewTitle}
            navigation={this.props.navigation}
            fSize={ Dimensions.get('window').width > 670 ?40:22}
            goBack={() => {
              this.props.navigation.goBack();
            }}
          />
          <ScrollView style={{flex: 1, paddingHorizontal: 15}}>
            <HTML
              source={{html: htmlCode}}
              tagsStyles={{
                p: {
                  color: 'white',
                  // lineHeight: 26,
                },
                span: {
                  color: 'white',
                  // lineHeight: 26,
                },
              }}
            />
          </ScrollView>

        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    privacyPolicyDetails: state.privacyPolicy.privacyPolicyDetails,

    //privacyPolicyDetails: state.privacyPolicy.privacyPolicyDetails.privacyPolicyDetails,
    getAppString: state.appLanguage.getAppString,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPrivacyPolicy: userId => {
      dispatch(getPrivacyPolicyAction(userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPrivacy);
