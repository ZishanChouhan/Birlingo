import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
  TextInput,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {colors, images} from '../../../Theme';
import {styles} from './styles';
import {
  Loader,
  SettingHeaderTitle,
} from '../../../components';
import validate from '../../../assets/validations/validate_wrapper';
import {
  updateProfileAction,
  getUserProfileAction,
  removeProfileAction,
} from './actions';
import LinearGradient from 'react-native-linear-gradient';
import { doPost } from '../../../actions/fetchApiActions';
import { apiUrls } from '../../../api/constants/constants';
import { showDangerToast } from '../../../assets/utility/ToastMessage';

class SettingsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 0,
      radio_props: [{label: 'Mr.', value: 0}, {label: 'Ms.', value: 1}],
      userId: '',
      languageId: '',
      appString: '',
      surname: '',
      surnameError: '',
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      userDetails: {},
      update: 0,
    };
  }

  componentDidMount() {
    this.onLoad();
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({appString: this.props.getAppString.data});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.userDetails && newProps.userDetails.userDetails) {
      this.setState({
        userId:
          this.state.update == 0
            ? newProps.userDetails.userDetails.id
            : this.state.userId,
        languageId:
          this.state.update == 0
            ? newProps.userDetails.userDetails.language_id
            : this.state.languageId,
        //surname: this.state.update == 0 ? newProps.userDetails.userDetails.surname : this.state.surname,
        name:
          this.state.update == 0
            ? newProps.userDetails.userDetails.username
            : this.state.name,
        email:
          this.state.update == 0
            ? newProps.userDetails.userDetails.email
            : this.state.email,
        initialEmail: newProps.userDetails.userDetails.email,
      });
    }
  }

  onLoad = () => {
    AsyncStorage.getItem('authUser', (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        //console.log("userDetails----", userDetails._id);
        this.props.getUserDetails(userDetails._id);
      } else {
      }
    });
  };

  _updateProfile = async () => {
    const userData = await AsyncStorage.getItem('authUser');
    var userDetails = JSON.parse(userData);
    const nameError = validate('name', this.state.name);
    //  const surnameError = validate("surname", this.state.surname);
    const emailError = validate('email', this.state.email);

    if (nameError || emailError) {
    } else {
      // if(this.state.email != this.state.initialEmail){
      //   const updateProfileData = {
      //     username: this.state.name,
      //     user_id: userDetails._id,
      //     language_id: this.state.languageId,
      //     email: this.state.email,
      //   };
      //   this.setState({isLoading : true})
      //   doPost(`${apiUrls.updateManageAccount}`, updateProfileData).then(res => {
      //     console.log("ress", res);
      //     this.setState({isLoading : false})
      //     if(res.success){
      //       this.props.navigation.navigate('VerifyOtp', {email: this.state.email, screen: "SettingsProfile"});
      //     }else{
      //       showDangerToast(res.message);
      //     }
      //   }).catch(err => console.log('err',err));
      // } else{
        const updateProfileData = {
          username: this.state.name,
          user_id: userDetails._id,
          language_id: this.state.languageId,
          email: this.state.email,
        };
        console.log('updateProfileData =>', updateProfileData);
        this.setState(
          {
            update: 1,
          },
          () => {
            this.props.updateProfile(updateProfileData, this.state.appString, this.state.initialEmail);
          },
        );
      }
    // }
  };

  check = f => {
    this.setState({gender: f});
  };

  _logout = profile => {
    Alert.alert(
      '',
      this.state?.appString.lbl_delete_confirm_msg,
      [
        {
          text: this.state.appString.lbl_no,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: this.state.appString.lbl_yes,
          onPress: () => {
            this.props.removeProfile(profile);
          },
        },
        // {
        //   text: 'OK',
        //   onPress: () => {
        //     setAgreeLogout(true);
        //   },
        //   },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {isLoading} = this.props;
    const {appString} = this.state;
    console.log('this.state', this.state);
    return (
      <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={colors.backGround} style={{flex: 1}}>
          <Loader loading={isLoading} />
          
          <SettingHeaderTitle
            title={appString && appString.lbl_profile}
            navigation={this.props.navigation}
            fSize={ Dimensions.get('window').width > 670 ?40:22}
            goBack={() => {
              this.props.navigation.goBack();
            }}
          />
          <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 30 : 14}
            >
            <ScrollView contentContainerStyle={{paddingBottom: 20}}>
              <View style={styles.subTitleView}>
                <View style={styles.subTitleInnerView}>
                  <Text style={styles.subTitle}>
                    {appString && appString.lbl_profile_subTitle}
                  </Text>
                </View>
              </View>
          {/* <Content> */}
            {/* <View style={styles.formContainer}>
              <TextField
                auto={true}
                borderWidth={2}
                error={this.state.nameError}
                style={styles.input}
                placeholder={appString && appString.lbl_name}
                placeholderColor="#fff"
                borderColor="#fff"
                onChangeText={name =>
                  this.setState({
                    name: name,
                    nameError: validate('name', name),
                  })
                }
                value={this.state.name}
              />
               <ScrollView
                horizontal={true}
                style={styles.mail_view}
                showsHorizontalScrollIndicator={true}>
                <Text numberOfLines={1} style={styles.mailText}>
                  {this.state.email}
                </Text>
              </ScrollView> 
            </View> */}
            {/* <View style={styles.formContainer} /> */}
            <Text style={styles.subTitle2}>{appString.lbl_email_address}</Text>
            <View style={styles.view22}>
              <TextInput
                value={this.state.email}
                placeholderTextColor={'#fff'}
                placeholder={appString && appString.lbl_email_address}
                style={{
                  color: colors.code_fff,
                  fontSize:Dimensions.get('window').width > 670 ?40: 18,
                  // alignSelf: 'center',
                  // backgroundColor: 'red',
                  width: '90%',
                }}
                onChangeText={email => {
                  this.setState({
                    email: email,
                    emailError: validate('email', email),
                  })
                }}
              />
              <Image
                style={{
                  alignSelf: 'center',
                  // marginRight: 16,
                  width: 20,
                  height: 20,
                }}
                source={images.edit_icon}
                resizeMode={'contain'}
              />
            </View>
            {this.state.emailError != '' && (
              <Text
                style={{
                  fontSize: 11,
                  color: colors.red,
                  marginHorizontal: 20,
                  marginTop: 8,
                }}>
                {this.props.getAppString.data[this.state.emailError]}
              </Text>
            )}
            <Text style={styles.subTitle2}>{appString.lbl_first_name}</Text>
            <View style={styles.view31}>
              <TextInput
                // selectTextOnFocus={true}
                selectionColor="#98AFC7"
                // style={{flex: 1}}
                placeholderTextColor={'#fff'}
                placeholder={appString && appString.lbl_name}
                style={[
                  {
                    flex: 1,
                    fontSize:Dimensions.get('window').width > 670 ?40: 18,
                    color:colors.code_fff
                  },
                ]}
                value={this.state.name}
                onChangeText={name =>
                  this.setState({
                    name: name,
                    nameError: validate('name', name),
                  })
                }
              />

              <Image
                style={{
                  alignSelf: 'center',
                  // marginRight: 16,
                  width: 20,
                  height: 20,
                }}
                source={images.edit_icon}
                resizeMode={'contain'}
              />
            </View>
            {this.state.nameError != '' && (
              <Text
                style={{
                  fontSize: 11,
                  color: colors.red,
                  marginHorizontal: 40,
                  marginTop: 8,
                }}>
                {this.props.getAppString.data[this.state.nameError]}
              </Text>
            )}

            <View style={styles.btn_view}>
              <TouchableOpacity
                style={styles.buttonFree}
                onPress={() => {
                  this._updateProfile(), Keyboard.dismiss();
                }}>
                <Text style={styles.btntxt}>
                  {appString && appString.lbl_update}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.delete_note1} />

            <TouchableOpacity
              style={styles.transaction}
              onPress={() =>
                this.props.navigation.navigate('TransactionHistory')
              }>
              <View
              // style={styles.titleView}
              >
                <Text style={styles.lbl}>
                  {appString && appString.lbl_transaction_history}
                </Text>
              </View>
              {/* <View style={styles.arrowView}>
                <Image source={images.arrowRightBlue} style={styles.arrow} />
              </View> */}
            </TouchableOpacity>

            <View style={styles.delete_note1} />
            
            <View style={styles.delete_note}>
              {/* <Text style={{ fontSize: 16, color: '#fff' }}>
                                {appString && appString.lbl_note}
                            </Text> */}

            
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize:Dimensions.get('window').width > 670 ?40:  18,
                    color: '#fff',
                    marginTop: 2,
                  }}>
                  {appString && ' ' + appString.lbl_delete_profile}
                </Text>
              </View>
            </View>

            <View style={styles.btn_view}>
              <TouchableOpacity
                style={styles.redButtonFree}
                onPress={() => {
                  this._logout(this.state.appString);
                  Keyboard.dismiss();
                }}>
                <Text style={styles.btntxt}>
                  {appString && appString.lbl_delete_profiles}
                </Text>
              </TouchableOpacity>
            </View>
          {/* </Content> */}
          </ScrollView>
          {/* <BottomTab
            tabNum={2}
            navigation={this.props.navigation}
            appString={appString}
          /> */}
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails.userDetails,
    getAppString: state.appLanguage.getAppString,
    getLearningLang: state.signUpReducer.getLearningLanguages,
    isLoading: state.serviceReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: userId => {
      dispatch(getUserProfileAction(userId));
    },
    updateProfile: (data, appString, initialEmail) => {
      dispatch(updateProfileAction(data, appString, initialEmail));
    },
    removeProfile: appString => {
      dispatch(removeProfileAction(appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsProfile);
