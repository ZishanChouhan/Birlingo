import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  Linking,
  Keyboard,
  SafeAreaView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { images, colors } from "../../../Theme";
import { styles } from "../commonStyle";
import { localStyle } from "./styles";
import {
  feedbackAction,
  // getAppUrlAction,
} from "../settingAction";
import {
  BlueButton,
  BottomTab,
  FirstRatingModal,
  SecondRatingModal,
  ThirdRatingModal,
  SettingHeaderTitle,
} from "../../../components";
import { apiUrls } from "../../../api/constants/constants";
import { doGet } from "../../../actions/fetchApiActions";
import validate from "../../../assets/validations/validate_wrapper";
import Lable from "../../../components/container/Lable";
import LinearGradient from "react-native-linear-gradient";

class SettingsRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleFirst: true,
      visibleSecond: false,
      visibleThird: false,
      onlyFeedback: false,
      feedback: "",
      feedbackError: "",
      feedback2: "",
      onlyfeedbackError: "",
      appString: "",
      title: "",
      yes: "",
      no: "",
      show: false,
      like: 0,
      starCount: 0,
      ratingError: "",
      ratingDetails: "",
      appUrlDetails: "",
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
    doGet(`${apiUrls.getStoreUrl}`).then(async res => {
      console.log('res', res);
    // getService("getSettingData").then((res) => {
      // if (res !== this.state.appUrlDetails) {
        this.setState({ appUrlDetails: res.data });
        // this.props.getAppUrl();
      // }
    });
  }

  componentWillReceiveProps(newProps) {}

  _yes = () => {
    this.setState({ visibleFirst: false, like: 1 });
    this.setState({ visibleSecond: true });
  };
  _no = () => {
    this.setState({ visibleFirst: false, visibleThird: true });
  };

  _goBack = () => {
    this.setState({ visibleFirst: false }, () => {
      this.props.navigation.goBack();
    });
  };

  _yesSecond = () => {
    if (Platform.OS === "ios") {
      Linking.openURL(this.state.appUrlDetails.apple_url);
    } else {
      Linking.openURL(this.state.appUrlDetails.play_url);
    }
  };
  _noSecond = () => {
    this.setState({ visibleThird: true, visibleSecond: false });
  };

  _yesThird = () => {
    this.setState({ visibleThird: false, onlyFeedback: true });
  };
  _noThird = () => {
    this.setState({ visibleThird: false });
    const data = {
      like: this.state.like,
      feedback: this.state.feedback,
      rating: this.state.starCount,
    };

    this.props.feedback(data, this.state.appString, "no");
  };

  submitFeedback2 = () => {
    Keyboard.dismiss();
    const feedbackError2 = validate("feedback2", this.state.feedback2);

    this.setState({
      onlyfeedbackError: feedbackError2,
    });
    if (feedbackError2) {
    } else {
      const data = {
        like: 0,
        feedback: this.state.feedback2,
        public: 0,
      };

      console.log("data =>", data);

      this.props.feedback(data, this.state.appString, "submit");
    }
  };
  _back = () => {
    this.props.navigation.goBack();
  };
  onStarRatingPress(rating) {
    // this.setState({ starCount: rating});
    this.setState({
      starCount: rating,
      ratingError: validate("rating", rating),
    });
  }
  render() {
    console.log("this.state", this.state);
    const { appString } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FirstRatingModal
          visible={this.state.visibleFirst}
          _yes={this._yes}
          _no={this._no}
          _goBack={this._goBack}
          appString={appString}
        />
        <SecondRatingModal
          visible={this.state.visibleSecond}
          _yes={this._yesSecond}
          _no={this._noSecond}
          appString={appString}
        />
        <ThirdRatingModal
          visible={this.state.visibleThird}
          _yes={this._yesThird}
          _no={this._noThird}
          appString={appString}
        />
        <View style={{ flex: 1 }}>
          <LinearGradient colors={colors.backGround} style={{ flex: 1 }}>
            <SettingHeaderTitle
              title={appString && appString.lbl_rate_birlingo}
              navigation={this.props.navigation}
              // fSize={26}
              goBack={() => {
                this.props.navigation.goBack();
              }}
            />
            <ScrollView>
            {this.state.onlyFeedback != true ? (
              <View>
                {/* <View style={styles.titleView}>
                  <Text style={localStyle.title}>
                    {appString && appString.lbl_rate_birlingo}
                  </Text>
                </View> */}

                <View style={styles.subTitleView}>
                  <View style={styles.subTitleInnerView}>
                    <Text style={styles.subTitle}>
                      {appString && appString.lbl_rating_subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            <View
              style={{ flex: 1, paddingBottom: 10
                // flexDirection: "row", 
                // alignSelf: "center" 
              }}
            >
              {this.state.onlyFeedback ? (
                // <Content style={{ flex: 1 }}>
                <>
                  <View style={styles.titleView}>
                    <Text style={localStyle.title}>
                      {appString && appString.lbl_feedback}
                    </Text>
                  </View>

                  <View style={styles.subTitleView}>
                    <View style={styles.subTitleInnerView}>
                      <Text style={styles.subTitle}>
                        {appString && appString.lbl_subtitle_feedback}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ marginTop: 10 }}>
                      <TextInput
                        textAlignVertical={"top"}
                        placeholderTextColor={colors.code_fff}
                        multiline={true}
                        placeholder={appString.lbl_your_experience}
                        onChangeText={(feedback2) =>
                          this.setState({
                            feedback2: feedback2,
                            onlyfeedbackError: validate("feedback2", feedback2),
                          })
                        }
                        value={this.state.feedback2}
                        style={localStyle.feedbackForm_2}
                      />
                    </View>

                    {this.state.onlyfeedbackError ? (
                      <Lable
                        style={localStyle.errView}
                        size={11}
                        color={colors.red}
                        title={appString[this.state.onlyfeedbackError]}
                      />
                    ) : null}
                    <BlueButton
                      bgcolor={colors.maroon}
                      title={appString && appString.lbl_Submit}
                      onClick={() => this.submitFeedback2()}
                    />
                  </View>
                </>
                
              ) : null}
            </View>
            </ScrollView>
          </LinearGradient>
        </View>
        {/* <BottomTab
          tabNum={2}
          navigation={this.props.navigation}
          appString={appString}
        /> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    //ratingDetails: state.rating.ratingDetails,
    //urlDetails: state.getUrlDetails.urlDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getRating: () => {
    //     dispatch(getRatingAction())
    // },
    // getAppUrl: () => {
    //   dispatch(getAppUrlAction());
    // },
    feedback: (data, appString, type, nav) => {
      dispatch(feedbackAction(data, appString, type, nav));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsRate);

//export default settingsRate;
