import React, {Component} from 'react';
import {View, Text, StatusBar,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {
  getLastInsertedTermDateAction,
  selectLanguageAction,
} from '../screens/selectLanguage/actions';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {Bubbles} from 'react-native-loader';
import { doGet } from '../actions/fetchApiActions';
import { apiUrls } from '../api/constants/constants';

const currentDate = new Date().toISOString();
global.logout = '';
global.AuthToken = '';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTermDate: '',
      applanguage: [],
      flag: false,
    };
  }
  componentWillMount() {
    this.checkConnectivity();
  }

  checkConnectivity = () => {
    NetInfo.fetch().then(state => {
      this.handleFirstConnectivityChange(state.isConnected)
    });
  };

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  handleFirstConnectivityChange = (isConnected) => {
    console.log("isConnected", isConnected);
    if (isConnected) {
      global.isConnected = true;
      doGet(`${apiUrls.getLanguages}`).then((res) => {
        console.log('response in ', res);
        let getNativeLang = [];
        if (res !== this.state.languages) {
          res.data.map((data, key) => {
            getNativeLang.push({_id: data._id});
          });
        }

        this.setState({applanguage: getNativeLang,});
        this._checkLanguage();
      });
    } else {
      global.isConnected = false;
    }
  };

  _checkLanguage = async () => {
    const langSelect = await AsyncStorage.getItem('language');
    console.log("langSelect", langSelect);
    const introComplete = await AsyncStorage.getItem("introComplete");
    if (!langSelect) {
      console.log("if no langSelect");
      if (this.state.applanguage.length > 1) {
        // languageId = {
        //   language_id: '5bd9ae3c9e254aecf7f031a9',
        // };
        // this.props.selectLanguage(languageId, 'selectLanguage');
      } else {
        this.setState({flag: true});
        this.state.applanguage.map((data) => {
          languageId = {
            language_id: data._id,
          };
          global.language = data._id;
          AsyncStorage.multiSet(
            [
              ['language', JSON.stringify(languageId)],
              ['changeDate', currentDate],
            ],
            (err, item3) => {},
          );

          this.props.selectLanguage(languageId, 'AppInfo');
        });
      }

      if(introComplete){
        this.props.navigation.navigate("Login");
      } else{
        this.props.navigation.navigate("AppInfo");
      }
    } else {
      const lang = JSON.parse(langSelect);
      global.language = lang.language_id;
      console.log("lang", lang);
      languageId = {
        language_id: lang && lang.language_id,
      };

      const item1 = await AsyncStorage.getItem('appTerms');
      // console.log("item1", item1);
      if (item1 != null) {
        var appTerms = JSON.parse(item1);
        global.Terms = appTerms;
      }
      this.props.selectLanguage(languageId, 'AppInfo');

      if(introComplete){
        this.props.navigation.navigate("Login");
      } else{
        this.props.navigation.navigate("AppInfo");
      }
    }
  };

  render() {
    return (
      
      <LinearGradient
        colors={['rgb(255, 123, 137)', 'rgb(138, 80, 130)']}
        style={{
          flex: 1,
          backgroundColor: '#4882c2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
           <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        {/* <Image
          source={images.ringLoader}
          style={{ width: width * (70 / 375), height: width * (70 / 375) }}
        /> */}
        <Bubbles size={10} color="#FFF" />
        <Text style={{color: '#fff', fontSize: Dimensions.get('window').width > 670 ?30:16,}}>Loading...</Text>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLastTermDate: state.lastTermDateReducer.getLastTermDate,
    getAppString: state.appLanguage.getAppString,
    getAppLanguage: state.appLanguage.getAppLanguage,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
    checkNet: state.netReducer.checkNet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getNativeLanguage: () => {
    //   dispatch(getNativeLanguageAction())
    // },
    selectLanguage: (languageId, navi) => {
      dispatch(selectLanguageAction(languageId, navi));
    },
    getLastInsertedTermDate: (languageId) => {
      dispatch(getLastInsertedTermDateAction(languageId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
