import React, { Component } from "react";
import { View, TouchableOpacity, Text, BackHandler, Alert, SafeAreaView } from "react-native";
import { CommonActions } from "@react-navigation/native";
import TextField from "../../components/container/TextField";
import Lable from "../../components/container/Lable";
import images from "../../res/images";
import validate from "../../assets/validations/validate_wrapper";
import { styles } from './styles';
import { resetPassAction } from '../signUpScreen/actions';
import { connect } from 'react-redux';
import Button from "../../components/container/Button";
import { Loader } from '../../components';
import LinearGradient from 'react-native-linear-gradient';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.firstTime = false;
    this.state = {
      loading: false,
      appString: '',
      password: "",
      passwordError: "",
      confirm_password: "",
      confirm_passwordError: "",
      userEmailId: this.props?.route?.params?.email,
    };
  }

  componentDidMount() {

    if (this.props && this.props.getAppString && this.props.getAppString.data !== this.state.appString) {
      this.setState({ appString: this.props.getAppString.data })
    }
  }

  onPressResetPassword = () => {
    // console.log("ResetPassword", this.state.password);

    //***** For validate input fields */
    const passwordError = validate("password", this.state.password);
    const confirm_passwordError = validate(
      "confirm_password",
      this.state.confirm_password,
      this.state.password
    );

    this.setState({
      passwordError: passwordError,
      confirm_passwordError: confirm_passwordError
    });

    if (passwordError || confirm_passwordError) {
      // this.ResetPasswordBtn.shake();
    } else {

      const PostData = {
        email: this.state.userEmailId,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
      };
      // console.log("PostData----", PostData);
      this.props.resetPassword(PostData, this.state.appString);
    }
  };

  onBack = () => {
    const { appString } = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      "",
      [
        { text: appString && appString.lbl_no, onPress: () => { }, style: "cancel" },
        { text: appString && appString.lbl_yes, onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
    return true;
  };

  render() {
    const { appString } = this.state;
    const { isLoading } = this.props;
    return (
        <SafeAreaView style={styles.outerContainer}>
          <LinearGradient colors={['rgb(255, 123, 137)', 'rgb(138, 80, 130)']} style={{ flex: 1 }}>
            <Loader loading={isLoading} />
            {/* <Content> */}
              <View style={styles.loginContainer}>
                <Lable
                  style={styles.loginTitle}
                  size={36}
                  title={appString && appString.lbl_Reset_Password}
                />
              </View>
              <View style={styles.container}>
                <View style={styles.textFieldContainer}>
                  <TextField
                    error={this.state.passwordError}
                    image={images.padlock}
                    secureTextEntry={true}
                    placeholder={appString && appString.lbl_NewPass}
                    onChangeText={password => {
                      this.setState({
                        password: password,
                        passwordError: validate("password", password)
                      }, () => {
                        if (this.state.confirm_password != "") {
                          this.setState({
                            confirm_passwordError: validate(
                              "confirm_password",
                              this.state.confirm_password,
                              password
                            )
                          });
                        }
                      });
                      // if (this.state.confirm_password != "") {
                      //   this.setState({confirm_passwordError: validate("confirm_password",this.state.confirm_password,password)});
                      // }
                    }}
                    value={this.state.password}
                  />
                  <View style={{ marginTop: 16 }}>
                    <TextField
                      error={this.state.confirm_passwordError}
                      image={images.padlock}
                      secureTextEntry={true}
                      placeholder={appString && appString.lbl_ConfirmPass}
                      onChangeText={confirm_password => this.setState({
                        confirm_password: confirm_password,
                        confirm_passwordError: validate(
                          "confirm_password",
                          confirm_password,
                          this.state.password
                        )
                      })
                      }
                      value={this.state.confirm_password}
                    />
                  </View>
                </View>

                <View style={styles.btnStyle}>
                  <Button
                    label={appString && appString.lbl_Submit}
                    onPress={this.onPressResetPassword} />
                  {/* <TouchableOpacity style={styles.buttonFree} onPress={this.onPressResetPassword}>
                    <Text style={styles.btntxt}>{appString && appString.lbl_Submit}</Text>
                </TouchableOpacity> */}

                  <View style={styles.login_note_view} >
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes:[
                          {name: 'Login'}
                        ]
                    }))}>
                      <Text style={styles.resend_txt}>{appString && appString.lbl_back_login}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
          </LinearGradient>
        </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    getLearningLang: state.signUpReducer.getLearningLanguages,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (data, appString) => {
      dispatch(resetPassAction(data, appString))
    },

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)
