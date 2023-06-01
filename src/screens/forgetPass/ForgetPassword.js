import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, SafeAreaView } from "react-native";
import Lable from "../../components/container/Lable";
import fonts from "../../res/fonts";
import validate from "../../assets/validations/validate_wrapper";
import { styles } from './styles';
import TextField from "../../components/container/TextField";
import { images } from '../../Theme';
import { connect } from 'react-redux';
import Button from "../../components/container/Button";
import { forgotPasswordAction } from '../signUpScreen/actions';
import LinearGradient from 'react-native-linear-gradient';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      appString: '',
      email: "",
      emailError: ""
    };

  }

  componentDidMount() {
    if (this.props && this.props.getAppString && this.props.getAppString.data !== this.state.appString) {
      this.setState({ appString: this.props.getAppString.data })
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps && newProps.isLoading !== this.state.loading) {
      this.setState({ loading: newProps.isLoading })
    }
  }

  onPressForgetPassword = () => {
    //***** For validate input fields */
    const emailError = validate("email", this.state.email);

    this.setState({
      emailError: emailError
    });

    if (emailError) {
      //this.ForgetPasswordBtn.shake();
    } else {
      const PostData = {
        email: this.state.email.toLowerCase()
      };
      console.log("PostData", PostData);
      this.props.forgotPassword(PostData, this.state.appString);
      //***** api calling */

    }
  };

  render() {
    const { appString } = this.state;

    return (
      <SafeAreaView style={styles.outerContainer}>
        <LinearGradient colors={['rgb(255, 123, 137)', 'rgb(138, 80, 130)']} style={{ flex: 1 }}>
          {/* <Content> */}
            <View style={styles.container}>
              <Lable
                style={styles.loginTitle}
                font={fonts.medium}
                size={36}
                title={appString && appString.lbl_forgot_password}
              />
              <View style={styles.textFieldContainer}>
                <TextField
                  error={this.state.emailError}
                  autoCapitalize='none'
                  keyboardType={"email-address"}
                  placeholder={appString && appString.lbl_email_address}
                  onEndEditing={() => { this.setState({ email: this.state.email.toLowerCase() }); }}
                  onChangeText={email => this.setState({ email: email, emailError: validate("email", email) })}
                  value={this.state.email ? this.state.email : ""}
                />
              </View>
              <View style={styles.btnStyle}>

                <Button
                  label={appString && appString.lbl_Submit}
                  onPress={() => this.onPressForgetPassword()} />
                {/* <TouchableOpacity style={styles.buttonFree} onPress={()=> this.onPressForgetPassword()}>
                    <Text style={styles.btntxt}>{appString && appString.lbl_Submit}</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.login_note_view} onPress={() => this.props.navigation.goBack()}>
                  <Image source={images.backArrow} style={styles.backArrowImg} />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.login_note}>{appString && appString.lbl_Go_Back}</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          {/* </Content> */}
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    // isLoading: state.serviceReducer.isLoading,
    // error: state.serviceReducer.error,
    // data: state.serviceReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (data, appString) => {
      dispatch(forgotPasswordAction(data, appString))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword)
