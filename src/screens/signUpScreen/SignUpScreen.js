import React, { useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import CustomSearchableDropDown from '../../components/container/CustomSearchableDropDown';
import { CommonActions } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import {images} from '../../Theme';
import Lable from '../../components/container/Lable';
import fonts from '../../res/fonts';
import colors from '../../res/colors';
import Checkbox from '../../components/container/Checkbox';
import {styles} from './styles';
import { Formik } from "formik";
import {connect} from 'react-redux';
import {getLearningLangAction, userRegistrationAction, getCountriesAction} from './actions';
import {getPrivacyPolicyAction} from '../settings/settingAction';
import {facebookLoginAction, googleLoginAction} from '../login/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader, PrivacyModal} from '../../components';
import Button from '../../components/container/Button';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from "yup"; 
import { doGet } from '../../actions/fetchApiActions';
import { apiUrls } from '../../api/constants/constants';
import { showDangerToast } from '../../assets/utility/ToastMessage';

const SignUpScreen = (props) => {
  const [toggle, setToggle]    = useState(false);
  const [loading, setLoading]  = useState(false);
  const userData = props.userData;
  const appString = props.getAppString.data;
  const [nativeLanguages, setNativeLanguages] = useState([]);
  const [languageItems , setLanguageItems] = useState([]);
  const [selectingType, setSelectingType] = useState('');
  const [countryItems, setCountryItems] = useState();
  const [name, setName] = useState();
  const [check, setCheck] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSearchableDropDown, setShowSearchableDropDown] = useState(false);
  const [dataForCustomSearchDropDown, setDataForCustomSearchDropDown] = useState([]);
  const [language, setLanguage] = useState();
  const [country, setCountry] = useState();
  const formikRef = useRef();

  console.log("props", props);
  console.log("languageItems", languageItems);
  // console.log("dataForCustomSearchDropDown", dataForCustomSearchDropDown);

  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('language', (err1, item1) => {
      console.log('item1', item1);
      var language  = JSON.parse(item1);
      if (language != null) {
        const languageData = [];
        doGet(`${apiUrls.learningLanguages}/${language.language_id}`).then(res => {
          console.log('res',res);
          if(res.success){
            res.data.map(data => {
              languageData.push({
                id: data._id,
                value: appString[data.term],
                label: appString[data.term]
              })
            })
            setDataForCustomSearchDropDown(languageItems);
            setLanguageItems(languageData);
          }else{
            showDangerToast(res.message)
          }
          setLoading(false);
        }).catch(err => console.log('err', err))
        props.getCountries();
        // props.getLearningLanguage(userDetails.language_id);
        setNativeLanguages(language.language_id);
        const privacyData = {
          language_id: language.language_id,
          slug: 'agb',
          device: 'web',
        };
        props.getPrivacyPolicy(privacyData, props.getAppString);
      }
    });
  }, []);

  useEffect(() => {
    if(props.countriesData?.countries){
      const countryData = [];
      props.countriesData.countries.map((item,index) => {
        countryData.push({
          id: index,
          value: item.code,
          label: appString[item.term],
          name: item.name,
          code: item.code,
          term: item.term
        })
      })
      setCountryItems(countryData);
    }
  }, [props.countriesData]);


  const initialNameValue = {
    name: "",
    language: "",
    country: "",
  }

  const initialValues = {
    email: "",
    password: ""
  }

  const validationNameSchema = yup.object().shape({
    name: yup
    .string()
    .strict(false)
    .trim()
    .required(appString && appString["err_enter_name"]),
    language: yup
    .string()
    .strict(false)
    .trim()
    .required("This field is required"),
    country: yup
    .string()
    .strict(false)
    .trim()
    .required("This field is required")
  })

  const validationSchema = yup.object().shape({
    email: yup
    .string()
    .strict(false)
    .trim()
    .required(appString['err_valid_email'])
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      appString['err_valid_email'],
    ),
    password: yup
    .string()
    .trim()
    .required(appString['err_enter_password'])
    .min(8, appString['err_pass_length'])
    .max(20, appString['err_pass_length']),
  }); 

  
  const onSignUp = (values) => {
    setName(values.name);
    setToggle(true);
  };
  
  const checkHandler = () => {
    setCheck(!check);
  };
    
  const onModalDisable = () => {
    setVisible(false);
  };

  const handleCustomSearchableDropDown = (type) => {
    setSelectingType(type)
    if(type == "language"){
      setDataForCustomSearchDropDown(languageItems);
    }else {
      setDataForCustomSearchDropDown(countryItems);
    }
    setShowSearchableDropDown(true);
  };

  const handleSelectedValueOfCustomSearchDropDown = data => {
    console.log("data", data);
    if(selectingType == "language"){
      formikRef.current.setFieldValue('language', data.label);
      setLanguage(data)
    }else{
      formikRef.current.setFieldValue('country', data.label);
      setCountry(data)
    }
    setShowSearchableDropDown(!showSearchableDropDown)
  };

  const onSignUpUser = (values) => {
      console.log("called");
      setCheckValue(true);
    // const langData = languageItems.find(lang => lang.value === language.value) 
    // console.log(langData);
    // const countryObj = countryItems.find(item => item.value == countryValue)
    // console.log('countryObj', countryObj);
    if(!check){
      return;
    }else{
      AsyncStorage.getItem('language', (err, item) => {
        if (err == null) {
          const countryData = {name: country.name, term: country.term, code: country.code};
          const lang = JSON.parse(item);
          console.log("lang", lang);
          const postData = {
            username: name,
            email: values.email.toLowerCase(),
            password: values.password,
            learning_language_id: language.id,
            // learning_language_id: this.state.language,
            version: global.version,
            language_id: lang.language_id,
            country: countryData,
            platform: Platform.OS
          };
          console.log('postData====',postData)
          props.signUp(postData, 'registration', appString);
        }
        // }
      });
    }
  };

  return (
      <SafeAreaView style={{ 
        flex: 1,
        backgroundColor: colors.code_82c2,
        marginBottom : Platform.OS == "ios" ? -50: 0
      }}>
        <LinearGradient
          colors={['rgb(255, 123, 137)', 'rgb(138, 80, 130)']}
          style={{flex: 1}}>
          <PrivacyModal
            visible={visible}
            onDisable={onModalDisable}
            // _yes={this._yesThird}
            // _no={this._noThird}
            privacyDetails={props?.privacyPolicyDetails?.privacyPolicyDetails[0]?.description}
            appString={appString}
          />
          <Loader loading={loading} />
          <Formik 
            innerRef={formikRef}
            initialValues={toggle ? initialValues : initialNameValue}
            validationSchema={toggle ? validationSchema : validationNameSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              toggle ? onSignUpUser(values) : onSignUp(values);
            }}>
            {({
              values,
              errors,
              setFieldTouched,
              setFieldValue,
              touched,
              handleChange,
              handleSubmit,
            }) => (<>
          
            <View style={styles.login_note_view}>
              {toggle ? (
                <TouchableOpacity
                  style={{flexDirection: 'row', justifyContent: 'center'}}
                  onPress={() => setToggle(false)}>
                  <Image
                    source={images.backArrow}
                    style={styles.backArrowImg}
                  />
                  <Text style={styles.login_note}>
                    {appString && appString.lbl_Go_Back}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.loginContainer}>
              <Lable
                style={styles.title}
                font={fonts.medium}
                size={36}
                title={ userData
                    ? appString.lbl_complete_profile
                    : appString?.lbl_signup
                }
              />

              {toggle == false ? (
                <View style={{marginTop: 20}}>
                  {nativeLanguages.length > 1 ? (
                    <View>
                      <Text style={styles.applangTitle}>
                        {appString && appString.lbl_choose_app_language_title}
                      </Text>
                    </View>
                  ) : null}

                  <Text style={styles.learningTitle}>{appString && appString.lbl_learning_language}</Text>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor:"#fff", 
                      paddingHorizontal: 10, 
                      borderRadius: 8, 
                      flexDirection: "row", 
                      paddingVertical: 16,
                      justifyContent: "space-between"
                    }}
                    onPress={() => {
                      handleCustomSearchableDropDown("language");
                    }}>
                    <Text>
                      {values.language ? values.language : "Welche Sprache möchten Sie lernen?"}
                    </Text>
                    <Entypo name={"chevron-thin-down"} size={15} />
                  </TouchableOpacity>
                  {errors.language && (
                    <Text style={{color:colors.red,fontSize:11,marginHorizontal:7,marginTop:5}}>Bitte Sprache auswählen</Text>
                  )}
                  <CustomSearchableDropDown 
                    visible={showSearchableDropDown}
                    searchData={dataForCustomSearchDropDown}
                    handleSelectedValueOfCustomSearchDropDown={data =>
                      handleSelectedValueOfCustomSearchDropDown(data)
                    }
                    onClose={() => setShowSearchableDropDown(!showSearchableDropDown)}
                    />

                  <Text style={[styles.learningTitle,{paddingTop: 10}]}>Bitte wählen Sie Ihr gewünschtes Land aus</Text>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor:"#fff", 
                      paddingHorizontal: 10, 
                      borderRadius: 8, 
                      flexDirection: "row", 
                      paddingVertical: 16,
                      justifyContent: "space-between"
                    }}
                    onPress={() => {
                      handleCustomSearchableDropDown();
                    }}>
                    <Text>
                      {values.country ? values.country : "Land auswählen"}
                    </Text>
                    <Entypo name={"chevron-thin-down"} size={15} />
                  </TouchableOpacity>

                  {errors.country && (
                    <Text style={{color:colors.red,fontSize:11,marginHorizontal:7,marginTop:5}}>Bitte Sprache auswählen</Text>
                  )}
                  <CustomSearchableDropDown 
                    visible={showSearchableDropDown}
                    searchData={dataForCustomSearchDropDown}
                    handleSelectedValueOfCustomSearchDropDown={data =>
                      handleSelectedValueOfCustomSearchDropDown(data)
                    }
                    onClose={() => setShowSearchableDropDown(!showSearchableDropDown)}
                  />

                  <View style={{borderBottomColor: "#cdcdcd", borderBottomWidth: 1, height: 45, marginTop: 30, paddingHorizontal: 12}}>
                    <TextInput
                      style={{color: '#fff', }}
                      autoCapitalize={true}
                      placeholderTextColor={"#fff"}
                      placeholder={appString && appString.lbl_name}
                      onChangeText={name => setFieldValue("name", name)}
                      value={values.name}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={{
                      fontSize: 12,
                      marginTop: 5,
                      // lineHeight: 16,
                      paddingLeft: 12,
                      textAlign: 'left',
                      color: "red"
                      }}>
                      {errors.name}
                    </Text>
                  )}

                  <View style={styles.btnStyle}>
                    <View style={{alignItems: 'center'}}>
                      <Button
                        label={appString && appString.lbl_next_step}
                        onPress={() => handleSubmit()}
                      />

                      <View style={styles.goLogin_view}>
                        <Text style={styles.account_note}>
                          {appString && appString.lbl_already_account + ' '}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.dispatch(
                              CommonActions.reset({
                                index: 0,
                                routes:[
                                  {name: 'Login'}
                                ]
                              })
                            )
                          }>
                          <Text style={styles.loginText}>
                            {appString && appString.lbl_login}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  
                </View>
              ) : null}

              {toggle == true ? (
                <View>
                  <View style={{borderBottomColor: "#cdcdcd", borderBottomWidth: 1, height: 50, marginTop: 20}}>
                    <TextInput 
                      keyboardType={'email-address'}
                      autoCapitalize={'none'}
                      placeholder={appString?.lbl_email_address}
                      placeholderTextColor={"#fff"}
                      value={values.email}
                      onChangeText={email => setFieldValue("email", email)}
                      style={{
                          color: '#fff',
                          // marginTop: marginAbove,
                          height: 50,
                          paddingHorizontal: 12,
                          flex: 1,
                          fontSize:Dimensions.get('window').width > 670 ?25:15,
                          textAlign: 'left'
                          // fontFamily: fonts.regular
                        }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={{
                      fontSize: 12,
                      marginTop: 5,
                      lineHeight: 16,
                      textAlign: 'left',
                      color: "red",
                      paddingHorizontal: 12
                      }}>
                      {errors.email}
                    </Text>
                  )}

                    <View style={{borderBottomColor: "#cdcdcd", borderBottomWidth: 1, height: 50, marginTop: 20}}>
                      <TextInput 
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        placeholder={appString?.lbl_password}
                        placeholderTextColor={"#fff"}
                        value={values.password}
                        onChangeText={password => setFieldValue("password", password)}
                        style={{
                            color: '#fff',
                            // marginTop: marginAbove,
                            height: 50,
                            paddingHorizontal: 12,
                            flex: 1,
                            fontSize:Dimensions.get('window').width > 670 ?25:15,
                            textAlign: 'left'
                            // fontFamily: fonts.regular
                          }}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={{
                        fontSize: 12,
                        marginTop: 5,
                        lineHeight: 16,
                        textAlign: 'left',
                        color: "red",
                        paddingHorizontal: 12
                        }}>
                        {errors.password}
                      </Text>
                    )}   

                        
                    <View style={styles.check2}>
                      <Checkbox
                        placeholder={appString && appString.msg_privacy_policy}
                        marginRight={10}
                        fontSize={14}
                        checked={check}
                        onPress={() => checkHandler()}
                      />

                      <TouchableOpacity
                        // style={{marginVertical: 10}}
                        onPress={() => setVisible(true)}
                        >
                        <Text style={styles.privacyPolicyLink}>
                          {appString && appString.lbl_privacy_policy}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {!check && checkValue && (
                      <Text style={{color: "red", marginTop: 10, paddingHorizontal: 12}}>{appString && appString['err_terms_condition']}</Text>
                    )}

                  <View style={styles.btn_view}>
                    <Button
                      label={ userData
                        ? appString?.lbl_Submit
                        : appString?.lbl_signup
                      }
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              ) : null}
            </View>
            </>
        )}
            </Formik>
      </LinearGradient>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    privacyPolicyDetails: state.privacyPolicy.privacyPolicyDetails,
    getAppString: state.appLanguage.getAppString,
    getLearningLang: state.signUpReducer.getLearningLanguages,
    isLoading: state.serviceReducer.isLoading,
    getAppLanguage: state.appLanguage.getAppLanguage,
    countriesData: state.signUpReducer.countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLearningLanguage: langId => {
      dispatch(getLearningLangAction(langId));
    },
    signUp: (data, nav, appString) => {
      dispatch(userRegistrationAction(data, nav, appString));
    },
    loginWithFacebook: (data, json, appString, lastNav) => {
      dispatch(facebookLoginAction(data, json, appString, lastNav));
    },
    loginWithGoogle: (data, google, appString, lastNav) => {
      dispatch(googleLoginAction(data, google, appString, lastNav));
    },
    getPrivacyPolicy: userId => {
      dispatch(getPrivacyPolicyAction(userId));
    },
    getCountries: () => {
      dispatch(getCountriesAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
