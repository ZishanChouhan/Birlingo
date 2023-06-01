import React, {Component, useState, useRef} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  BackHandler,
  Platform,
  StatusBar,
  TextInput,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lable from '../../components/container/Lable';
import fonts from '../../res/fonts';
import colors from '../../res/colors';
import Checkbox from '../../components/container/Checkbox';
import {
  userLoginAction,
  facebookLoginAction,
  googleLoginAction,
} from './actions';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Loader} from '../../components';
import Button from '../../components/container/Button';
import LinearGradient from 'react-native-linear-gradient';
import { selectLanguageAction } from '../selectLanguage/actions'; 
import { Formik } from 'formik';
import * as yup from "yup";

const Login = (props) => {
  console.log('props', props);
  const [check, setCheck] = useState(false);
  const appString = props.getAppString.data;
  const formikRef = useRef();
  console.log("formikRef", formikRef);
const initialValues = {
  email: "",
  password: ""
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required(appString && appString['err_valid_email'])
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      appString && appString['err_valid_email'],
    ),
  password: yup
  .string()
  .trim()
  .required(appString && appString['err_enter_password'])
  // .max(50, "This field must contain maximum 50 characters.")
  // .required('Please enter password'),
});

  const onPressLogin = (values) => {

    AsyncStorage.getItem('language', (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        const postData = {
          email: values.email.toLowerCase(),
          password: values.password,
          language_id: userDetails.language_id,
          version: global.version,
          platform: "app"
        };

        // console.log("postData====", postData);
        props.loginUser(postData, appString, 'login');
       
      } else {
      }
    });
  }   

  const checkHandler = async () => {
    setCheck(!check);
    // this.setState({checked: !this.state.checked});
    console.log("formik", formikRef.current.values);
    if (check) {
      await AsyncStorage.setItem(
        'rememberMe',
        JSON.stringify({
          email: formikRef.current.values.email.toLowerCase(),
          password: formikRef.current.values.password,
          checked: check,
        }),
      );
    } else {
      await AsyncStorage.removeItem('rememberMe');
    }
  };

return (
  <SafeAreaView style={styles.outerContainer}>
    <StatusBar
      barStyle="dark-content"
      hidden={false}
      backgroundColor="rgb(255,255,255)"
    />
    {/* <Loader loading={props.isLoading} /> */}
    <LinearGradient
      colors={['rgb(138, 80, 130)', 'rgb(255, 123, 137)']}
      style={{flex: 1}}>

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          onPressLogin(values);
        }}>
        {({
          values,
          errors,
          setFieldTouched,
          setFieldValue,
          touched,
          handleChange,
          handleSubmit,
        }) => (
      
      <View style={styles.loginContainer}>
        <Lable
          style={styles.loginTitle}
          font={fonts.medium}
          size={36}
          title={appString && appString.lbl_login}
        />  
        
        <View
          style={styles.textFieldContainer}>

          <View style={{borderBottomColor: "#cdcdcd", borderBottomWidth: 1, height: 50}}>
            <TextInput 
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              placeholder={appString && appString.lbl_email_address}
              placeholderTextColor={"#fff"}
              value={values.email}
              onChangeText={email => setFieldValue("email", email)}
              //   this.setState({
              //     email: email,
              //     emailError: validate('email', email),
              //   })
              // }
              style={[
                {
                  color: '#fff',
                  // marginTop: marginAbove,
                  height: 50,
                  paddingHorizontal: 12,
                  flex: 1,
                  fontSize:Dimensions.get('window').width > 670 ?25:15,
                  textAlign: 'left'
                  // fontFamily: fonts.regular
                }
              ]}
            />
          </View>
            {touched.email && errors.email && (
              <Text style={{
                fontSize: 12,
                marginTop: 5,
                lineHeight: 16,
                textAlign: 'left',
                color: "red"
                }}>
                {errors.email}
              </Text>
            )}
          <View style={{borderBottomColor: "#cdcdcd", borderBottomWidth: 1, height: 50, marginTop: 16}}>
            <TextInput 
              autoCapitalize={'none'}
              secureTextEntry={true}
              placeholder={appString && appString.lbl_password_only}
              placeholderTextColor={"#fff"}
              value={values.password}
              onChangeText={password => setFieldValue("password", password)}
              // onChangeText={email =>
                // this.setState({
                //   email: email,
                //   emailError: validate('email', email),
                // })
              // }
              style={[
                {
                  color: '#fff',
                  // marginTop: marginAbove,
                  height: 50,
                  paddingHorizontal: 12,
                  flex: 1,
                  fontSize:Dimensions.get('window').width > 670 ?25:15,
                  textAlign: 'left'
                  // fontFamily: fonts.regular
                }
              ]}
            />
          </View>
            {touched.password && errors.password && (
              <Text style={{
                fontSize: 12,
                marginTop: 5,
                lineHeight: 16,
                textAlign: 'left',
                color: "red"
                }}>
                {errors.password}
              </Text>
            )}
          <View style={styles.rememberMe}>
            <Checkbox
              placeholder={appString && appString.lbl_remember_me}
              marginRight={10}
              fontSize={14}
              checked={check}
              onPress={() => checkHandler()}
            />
          </View>

          <View style={styles.btnStyle}>
            <View style={{alignItems: 'center'}}>
              <Button
                label={appString && appString.lbl_login}
                onPress={handleSubmit}
              />
              <View style={styles.login_note_view}>
                <Text style={styles.login_note}>
                  {appString && appString.lbl_donot_have_account + ' '}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Signup')}>
                  <Text style={styles.signUpText}>
                    {appString && appString.lbl_signup}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  marginVertical: 20,
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                }}
                onPress={() =>
                  props.navigation.navigate('ForgetPassword')
                }>
                <Lable
                  style={styles.forgot_note}
                  size={14}
                  title={appString && appString.lbl_forgot_password}
                />
              </TouchableOpacity>
            </View>
          </View>
            </View>
          </View>
        )}
          </Formik>
        </LinearGradient>
      </SafeAreaView>
    );
}

const mapStateToProps = state => {
  return {
    getAppString: state.appLanguage.getAppString,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (data, appString, lastNav) => {
      dispatch(userLoginAction(data, appString, lastNav));
    },
    loginWithFacebook: (data, json, appString, lastNav) => {
      dispatch(facebookLoginAction(data, json, appString, lastNav));
    },
    loginWithGoogle: (data, google, appString, lastNav) => {
      dispatch(googleLoginAction(data, google, appString, lastNav));
    },
    selectLanguage:(languageId) => {
      dispatch(selectLanguageAction(languageId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
