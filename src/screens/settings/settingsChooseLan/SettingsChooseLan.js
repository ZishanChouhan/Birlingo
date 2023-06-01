import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { images, colors } from "../../../Theme";
import { styles } from "../commonStyle";
import {
  LanguageList,
  Loader,
  BottomTab,
  SettingHeaderTitle,
} from "../../../components";
// import {   } from '../../signUpScreen/actions';
import {
  changeLearningLanguage,
  getAfterLoginLearningLangAction,
} from "./actions";
import LinearGradient from "react-native-linear-gradient";

import { localStyle } from "./styles";

class SettingsChooseLan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: false,
      languages: [],
      learningLanguages: [],
      appString: "",
      languageId: "",
      selectedLang: "",
      selectedLangIndex: "",
      languageSelect: "",
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
    this.onLoad();
  }

  onLoad = () => {
    AsyncStorage.getItem("language", (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        this.props.getAfterLoginLearningLanguage(userDetails.language_id);
      } else {
      }
    });
  };
  componentWillReceiveProps(newProps) {
    if (
      newProps &&
      newProps.getAppString &&
      newProps.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: newProps.getAppString.data });
    }

    let learningLang = [];
    if (
      newProps.getLearningLang.getLearningLangAfterLogin &&
      newProps.getLearningLang.getLearningLangAfterLogin.data !=
        this.state.learningLanguages
    ) {
      let selectLang =
        newProps.getLearningLang.getLearningLangAfterLogin.data.selected;
      this.setState({ languageSelect: selectLang, select: false });

      newProps.getLearningLang.getLearningLangAfterLogin &&
        newProps.getLearningLang.getLearningLangAfterLogin.data.languages.map(
          (data) => {
            if (data._id == selectLang) {
              learningLang.push({
                _id: data._id,
                language: this.props.getAppString.data[data.term],
                selected: 1,
              });
            } else {
              learningLang.push({
                _id: data._id,
                language: this.props.getAppString.data[data.term],
                selected: 0,
              });
            }
          }
        );
    }

    this.setState({
      languages: learningLang,
    });
  }

  selectLanguage = (lang, index) => {
    let data = this.state.languages;
    data.map((item, key) => {
      if (key == index) {
        item.selected = 1;
      } else {
        item.selected = 0;
      }
    });

    this.setState({
      languages: data,
      selectedLangIndex: index,
    });

    languageId = {
      learning_language_id: lang._id,
    };

    this.setState({ languageId: languageId });

    if (lang._id != this.state.languageSelect) {
      this.setState({ select: true });
    } else if (lang._id == this.state.languageSelect) {
      this.setState({ select: false });
    }
  };

  submitLanguage = () => {
    this.setState({
      selectedLang: this.state.selectedLangIndex,
    });
    this.props.changeLearningLanguage(languageId, this.state.appString);
  };

  render() {
    const { isLoading } = this.props;
    const { appString } = this.state;
    let title = appString && appString.lbl_learning_language;
    var NewTitle = title.replace("-", "\n");
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={colors.backGround} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Loader loading={isLoading} />

            <SettingHeaderTitle
              title={NewTitle}
              navigation={this.props.navigation}
              fSize={ Dimensions.get('window').width > 670 ?40:22}
              goBack={() => {
                this.props.navigation.goBack();
              }}
            />

            <View style={styles.subTitleView}>
              <Text style={localStyle.subTitle}>
                {appString && appString.lbl_choose_learning_language_subTitle}
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              style={localStyle.list}
              numColumns={2}
              data={this.state.languages}
              renderItem={({ item, index }) => (
                <LanguageList
                  languages={item}
                  index={index}
                  navigation={this.props.navigation}
                  selectLanguage={() => this.selectLanguage(item, index)}
                />
              )}
            />

            {this.state.select ? (
              <TouchableOpacity
                style={localStyle.nextButton}
                onPress={() => this.submitLanguage()}
              >
                <Text style={localStyle.nextText}>
                  {appString && appString.lbl_update}
                </Text>
              </TouchableOpacity>
            ) : null}
            {/* </> : null} */}
          </View>
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
    getAppString: state.appLanguage.getAppString,
    getLearningLang: state.afterLoginLearningLang.getLearningLangAfterLogin,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAfterLoginLearningLanguage: (langId) => {
      dispatch(getAfterLoginLearningLangAction(langId));
    },
    changeLearningLanguage: (languageId, appString) => {
      dispatch(changeLearningLanguage(languageId, appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChooseLan);
