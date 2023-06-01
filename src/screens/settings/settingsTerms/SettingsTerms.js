import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from './styles';
import SubscriptionBtn from '../../../components/container/SubscriptionBtn';
import {getTermAction} from '../settingAction';
import LinearGradient from 'react-native-linear-gradient';

import {BottomTab, SettingHeaderTitle} from '../../../components';
import AutoHeightWebView from '../../../components/autoheight_webview/autoHeightWebView';
class SettingsTerms extends Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {
      termsConditionDetails: '',
      appString: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getTermsAndCondition();
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: this.props.getAppString.data});
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.termCondition &&
      newProps.termCondition.termConditionDetails &&
      newProps.termCondition.termConditionDetails[0].description
    ) {
      this.setState({
        termsConditionDetails:
          newProps.termCondition.termConditionDetails[0].description,
      });
    }
  }

  getTermsAndCondition = () => {
    AsyncStorage.getItem('language', (err1, item1) => {
      if (item1 != null) {
        var language = JSON.parse(item1);
        const privacyData = {
          slug: 'term-condition',
          language_id: language.language_id,
          device: 'web',
        };

        this.props.getTermsCondition(privacyData, this.state.appString);
      } else {
      }
    });
  };

  render() {
    const {appString} = this.state;
    if (this.state.termsConditionUrl != '' && this.state.loading) {
      this.setState({loading: false});
    }
    var htmlCode = this.state.termsConditionDetails;

    let title = appString && appString.lbl_terms_use;
    var NewTitle = title.replace('-', '\n');

    return (
      <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={colors.backGround} style={{flex: 1}}>
        <SettingHeaderTitle
          title={NewTitle}
          navigation={this.props.navigation}
          fSize={ Dimensions.get('window').width > 670 ?40:22}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <View style={styles.titleView}>
          <Text style={styles.title}>{NewTitle}</Text>
        </View>
        <AutoHeightWebView
          startInLoadingState={true}
          customStyle={`p {font-size: ${this.fontsize}px;}`}
          style={{
            width: Dimensions.get('window').width - 40,
            marginTop: 16,
            marginLeft: 20,
            //backgroundColor: "white"
          }}
          // customScript={`document.body.style.background = 'white';`}
          onSizeUpdated={(size) => console.log(size.height)}
          // or uri
          source={{
            html: `<p>${htmlCode}</p>`,
          }}
          zoomable={false}
        />

        {/* <BottomTab
          tabNum={2}
          navigation={this.props.navigation}
          appString={appString}
        /> */}
      </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    termCondition: state.termCondition.termConditionDetails,
    getAppString: state.appLanguage.getAppString,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTermsCondition: (userId) => {
      dispatch(getTermAction(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTerms);
