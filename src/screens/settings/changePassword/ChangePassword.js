import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
  Image,
  SafeAreaView,
  Dimensions
} from "react-native";
import TextField from "../../../components/container/TextField";
import { colors, images } from "../../../Theme";
import validate from "../../../assets/validations/validate_wrapper";
import { styles } from "./styles";
import { changePassAction } from "./actions";
import { connect } from "react-redux";
import HandleBack from "../../../components/container/Back";
import { Loader, SettingHeaderTitle } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.firstTime = false;
    this.state = {
      loading: false,
      appString: "",
      oldPassword: "",
      oldPasswordErrror: "",
      password: "",
      passwordError: "",
      confirm_password: "",
      confirm_passwordError: "",
      userEmailId: this.props?.route?.params?.email,
    };
  }

  componentDidMount() {
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: this.props.getAppString.data });
    }
  }

  onChangePassword = () => {
    // console.log("ResetPassword", this.state.password);old_password

    //***** For validate input fields */
    const passwordError = validate("password", this.state.password);
    const oldPasswordErrror = validate("old_password", this.state.oldPassword);

    const confirm_passwordError = validate(
      "confirm_password",
      this.state.confirm_password,
      this.state.password
    );

    this.setState({
      passwordError: passwordError,
      confirm_passwordError: confirm_passwordError,
      oldPasswordErrror: oldPasswordErrror,
    });

    if (passwordError || confirm_passwordError || oldPasswordErrror) {
      // this.ResetPasswordBtn.shake();
    } else {
      AsyncStorage.getItem("authUser", (err1, item1) => {
        if (item1 != null) {
          var userDetails = JSON.parse(item1);

          const PostData = {
            user_id: userDetails._id,
            new_password: this.state.password,
            old_password: this.state.oldPassword,
          };
          // console.log("PostData----", PostData);
          this.props.changePassword(PostData, this.state.appString);
        } else {
        }
      });
    }
  };

  onBack = () => {
    const { appString } = this.state;
    Alert.alert(
      appString && appString.msg_app_close,
      "",
      [
        {
          text: appString && appString.lbl_no,
          onPress: () => {},
          style: "cancel",
        },
        {
          text: appString && appString.lbl_yes,
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  render() {
    const { appString } = this.state;
    const { isLoading } = this.props;
    return (
      <HandleBack onBack={this.onBack}>
        <SafeAreaView style={styles.outerContainer}>
          <LinearGradient colors={colors.backGround} style={{ flex: 1 }}>
            <Loader loading={isLoading} />

            <SettingHeaderTitle
              title={appString && appString.lbl_change_password}
              navigation={this.props.navigation}
              fSize={ Dimensions.get('window').width > 670 ?40:22}
              goBack={() => {
                this.props.navigation.goBack();
              }}
            />

            {/* <Content bounces={false}> */}
              <View style={styles.container}>
                <View style={styles.textFieldContainer}>
                  <TextField
                    error={this.state.oldPasswordErrror}
                    placeholderColor="#fff"
                    borderColor="#fff"
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    placeholder={appString && appString.lbl_old_password}
                    onChangeText={(oldPassword) => {
                      this.setState({
                        oldPassword: oldPassword,
                        oldPasswordErrror: validate(
                          "old_password",
                          oldPassword
                        ),
                      });
                    }}
                    value={this.state.oldPassword}
                  />
                  <View style={{ marginTop: Dimensions.get('window').width > 670 ?20:16 }}>
                    <TextField
                      error={this.state.passwordError}
                      placeholderColor="#fff"
                      borderColor="#fff"
                      secureTextEntry={true}
                      autoCapitalize={'none'}
                      placeholder={appString && appString.lbl_NewPass}
                      onChangeText={(password) => {
                        this.setState(
                          {
                            password: password,
                            passwordError: validate("password", password),
                          },
                          () => {
                            if (this.state.confirm_password != "") {
                              this.setState({
                                confirm_passwordError: validate(
                                  "confirm_password",
                                  this.state.confirm_password,
                                  password
                                ),
                              });
                            }
                          }
                        );
                      }}
                      value={this.state.password}
                    />
                  </View>
                  <View style={{marginTop: Dimensions.get('window').width > 670 ?20:16}}>
                    <TextField
                      error={this.state.confirm_passwordError}
                      placeholderColor="#fff"
                      borderColor="#fff"
                      secureTextEntry={true}
                      autoCapitalize={'none'}
                      placeholder={appString && appString.lbl_ConfirmPass}
                      onChangeText={(confirm_password) =>
                        this.setState({
                          confirm_password: confirm_password,
                          confirm_passwordError: validate(
                            "confirm_password",
                            confirm_password,
                            this.state.password
                          ),
                        })
                      }
                      value={this.state.confirm_password}
                    />
                  </View>
                </View>

                <View style={styles.btnStyle}>
                  <TouchableOpacity
                    style={styles.buttonFree}
                    onPress={() => this.onChangePassword()}
                  >
                    <Text style={styles.btntxt}>
                      {appString && appString.lbl_Submit}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            {/* </Content> */}
          </LinearGradient>
        </SafeAreaView>
      </HandleBack>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    getLearningLang: state.signUpReducer.getLearningLanguages,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data, appString) => {
      dispatch(changePassAction(data, appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
