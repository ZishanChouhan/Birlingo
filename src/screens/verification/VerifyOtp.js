import React, { Component, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import { connect, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loader } from "../../components";
import Button from "../../components/container/Button";
import LinearGradient from "react-native-linear-gradient";
import TextField from "../../components/container/TextField";
import { doPost } from "../../actions/fetchApiActions";
import { apiUrls } from "../../api/constants/constants";
import { showDangerToast, showToast } from "../../assets/utility/ToastMessage";
import { userToken } from "../../reducer/modules/userTokenAction";
import { Formik } from "formik";
import OtpInputs from 'react-native-otp-inputs';
import * as yup from "yup";
import { useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign';

const VerifyOtp = (props) => {
  const [loading, setLoading] = useState(false);
  const formikRef = useRef();
  const OtpInputsRef = useRef();
  const token = useDispatch();
  // console.log("formikRef", formikRef);
  // console.log("OtpInputsRef", OtpInputsRef);
  let access_token = useSelector(item => item?.userTokenReducer?.USER_TOKEN);
  const initialValues = {
    otp: "",
  };

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .strict(false)
      .trim()
      .required(global.Terms.err_enter_otp)
      .matches(
        /^[0-9]+$/,
        global.Terms.err_valid_otp,
      )
      .min(4, global.Terms.err_valid_otp)
      .max(4, global.Terms.err_valid_otp),
  });

  const resendOtp = () => {
    // formikRef.current.setFieldValue("otp", "");
    OtpInputsRef.current.reset();
    const postData = {
      email: props.route.params.email,
      slug: "new_email_verification"
    };
    setLoading(true);
    console.log("resendOtp===", postData);
    doPost(`${apiUrls.resendotp}`, postData).then(res => {
      console.log("resend res", res);
      setLoading(false);
      if(res.success){
        showToast(global.Terms && global.Terms[res.message])
      }else{
        showDangerToast(global.Terms && global.Terms[res.message])
      }
    }).catch(err => {
      setLoading(false)
      console.log("err", err);
    })
  };

  const onPressVerifyOtp = (values) => {
    setLoading(true)
    let postData;
    if(props.route.params.initialEmail){
      postData = {
        email: props.route.params.initialEmail,
        otp: values.otp,
        slug: "new_email_verification"
      };
    }else{
      postData = {
        email: props.route.params.email,
        otp: values.otp,
      };
    }
    console.log("postDataotp===", postData);
    doPost(`${apiUrls.verifyOtp}`, postData).then(async response => {
      console.log('response', response);
      setLoading(false)
      if(response?.success){
        if (props?.route?.params?.screen === "forgotPass") {
          console.log(" if condition");
          showToast(global.Terms && global.Terms[response.message]);
          props.navigation.navigate("ResetPassword",{email: response.data.email });
        } else if(props?.route?.params?.screen === "SettingsProfile"){
          console.log(" if condition");
          showToast(global.Terms && global.Terms[response.message]);
          props.navigation.navigate("SettingsMenu");
        }
        else{
          token(userToken(response?.data.token));
          await AsyncStorage.setItem("authUser", JSON.stringify(response.data));
          await AsyncStorage.setItem("learning_language_id", JSON.stringify(response.data.learning_language_id));
          
          global.AuthToken = response.data.token;
          // dispatch(navigate({name: "MethodVideo" }));
          props.navigation.navigate("LessonOverview", {screen:"MethodVideo"});
        }
      }else{
        showDangerToast(global.Terms &&global.Terms[response.message])
      }
    }).catch(err => console.log(err))
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Loader loading={loading}/>
      <LinearGradient
        colors={["rgb(255, 123, 137)", "rgb(138, 80, 130)"]}
        style={{ flex: 1 }}
      >
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={{paddingLeft: 20 , paddingTop: 16}}>
        <AntDesign name='left' size={20} color={'#fff'}/>
      </TouchableOpacity>
        <Formik
          initialValues={initialValues}
          // enableReinitialize
          validationSchema={validationSchema}
          enableReinitialize={true}
          innerRef={formikRef}
          onSubmit={values => {
            onPressVerifyOtp(values);
        }}>
          {({values, errors, setFieldValue, touched, handleSubmit, resetForm }) => (
            <>
            { console.log(errors)}
            { console.log(values)}
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.title}>
                {global.Terms && global.Terms.lbl_otp}
              </Text>
              <Text style={styles.subTitle}>
                {global.Terms && global.Terms.lbl_otp_subtitle}{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  {props?.route?.params?.email}
                </Text>
              </Text>
            </View>
            <View style={styles.textFieldContainer}>
            
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <OtpInputs
                  name="otp"
                  ref={OtpInputsRef}
                  handleChange={(code) => setFieldValue('otp', code)}
                  numberOfInputs={4}
                  style={{height: 50, flexDirection: "row", justifyContent: "space-between", flex: 1}}
                  inputContainerStyles={{}}
                  inputStyles={[{
                    height:52,
                    borderWidth: 1,
                    textAlign: 'center',
                    width: 75.41,
                    borderColor: '#E4E9F1',
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    fontSize: 24,
                    color: '#000000',
                    // fontFamily: font.RobotoBold,
                    paddingTop: 5,
                    paddingHorizontal: 15},
                    {
                      borderColor:
                        touched.otp && errors.otp
                          ? "#EF5050"
                          : touched.otp && errors.otp == undefined
                          ? '#3AB467'
                          : '#E4E9F1',
                    },
                  ]}
                />
              </View>
              {errors.otp && (
                <Text style={{
                  color: "red",
                  fontSize: 14,
                  marginTop: 5,
                  // lineHeight: 16,
                  textAlign: 'left',
                }}>{errors.otp}</Text>
              )}
            </View>

            <View style={styles.btnStyle}>
              <Button
                label={global.Terms && global.Terms.lbl_Submit}
                onPress={handleSubmit}
              />

              <View style={styles.login_note_view}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.login_note}>
                    {global.Terms && global.Terms.lbl_didnot_receive_otp + " "}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    resetForm(initialValues), resendOtp(), Keyboard.dismiss();
                  }}
                >
                  <Text style={styles.resend_txt}>
                    {global.Terms && global.Terms.lbl_resend}
                  </Text>
                </TouchableOpacity>
              </View>
              

              {!access_token && <View style={styles.login_note_view}>
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
                  }
                >
                  <Text style={styles.resend_txt}>
                    {global.Terms && global.Terms.lbl_back_login}
                  </Text>
                </TouchableOpacity>
              </View>
              }
            </View>
          </View>
          </>
          )}
        </Formik>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default VerifyOtp;