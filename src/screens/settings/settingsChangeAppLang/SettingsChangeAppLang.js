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
import { images } from "../../../Theme";
import { styles } from "../commonStyle";
import { LanguageList, Loader, BottomTab } from "../../../components";
import {
  getNativeLanguageAfterLoginAction,
  languageActionAfterLogin,
} from "../../selectLanguage/actions";
import { localStyle } from "./styles";
import LinearGradient from "react-native-linear-gradient";
const currentDate = new Date().toISOString();

class SettingsChooseAppLang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appString: "",
      languages: [],
      selectedLang: undefined,
    };
  }

  componentDidMount() {
    this.props.getNativeLanguage();
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: this.props.getAppString.data });
    }

    AsyncStorage.getItem("language", (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        this.setState({ selectedLang: userDetails.language_id });
      } else {
        this.setState({ selectedLang: undefined });
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.getAppString &&
      newProps.getAppString.data != this.state.appString
    ) {
      this.setState({ appString: newProps.getAppString.data });
    }

    let getNativeLang = [];

    this.setState({ select: false });
    AsyncStorage.getItem("language", (err1, item1) => {
      if (item1 != null) {
        var userDetails = JSON.parse(item1);
        this.setState({ selectedLang: userDetails.language_id });
      } else {
        this.setState({ selectedLang: undefined });
      }
    });

    newProps.getAppLanguage &&
      newProps.getAppLanguage.getAppLanguage.map((data, key) => {
        if (data._id == this.state.selectedLang) {
          getNativeLang.push({
            _id: data._id,
            language: this.state.appString[data.term],
            selected: 1,
          });
        } else {
          getNativeLang.push({
            _id: data._id,
            language: this.state.appString[data.term],
            selected: 0,
          });
        }
      });
    getNativeLang.map(async (item) => {
      let langId = this.state.languageId && this.state.languageId.language_id;
      if (item._id == langId) {
        await AsyncStorage.setItem(
          "languageValue",
          JSON.stringify(item.language)
        );
      }
    });

    this.setState({ languages: getNativeLang });
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

    languageId = {
      language_id: lang._id,
    };

    this.setState({ languageId: languageId });

    if (this.state.selectedLang === lang._id) {
      this.setState({ select: false });
    } else {
      this.setState({ select: true });
    }
  };

  submitLanguage = () => {
    this.setState({ languageId: languageId }, () => {
      AsyncStorage.multiSet(
        [
          ["language", JSON.stringify(this.state.languageId)],
          ["changeDate", currentDate],
        ],
        (err, item3) => {}
      );
    });

    this.props.selectLanguage(languageId, this.state.appString);
  };

  render() {
    const { isLoading } = this.props;
    const { appString } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["rgb(83,179,214)", "rgb(48,75,195)"]}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Loader loading={isLoading} />
            {!isLoading ? (
              <>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.nav_view}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Image
                      source={images.backArrow}
                      style={localStyle.backArrowImg}
                    />
                    <Text style={localStyle.navTitle}>
                      {appString && appString.lbl_Settings}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.titleView}>
                  <Text style={localStyle.title}>
                    {appString && appString.lbl_native_lang_title}
                  </Text>
                </View>
                <View style={styles.subTitleView}>
                  <View style={styles.subTitleInnerView}>
                    <Text style={localStyle.subTitle}>
                      {appString && appString.lbl_native_lang_subTitle}
                    </Text>
                  </View>
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ alignSelf: "center", marginTop: 15 }}
                  numColumns={2}
                  data={this.state && this.state.languages}
                  renderItem={({ item, index }) => (
                    <LanguageList
                      languages={item}
                      index={index}
                      data={this.state.languages}
                      navigation={this.props.navigation}
                      selectLanguage={() => this.selectLanguage(item, index)}
                    />
                  )}
                />

                {this.state.select ? (
                  <TouchableOpacity
                    onPress={() => this.submitLanguage()}
                    style={localStyle.nextButton}
                  >
                    <Text style={localStyle.nextText}>
                      {appString && appString.lbl_update}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : null}
          </View>
          <View style={{ bottom: 0 }}>
            {/* <BottomTab
              tabNum={2}
              navigation={this.props.navigation}
              appString={appString}
            /> */}
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAppString: state.appLanguage.getAppString,
    getAppLanguage: state.appLanguage.getAppLanguage,
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNativeLanguage: (languageId) => {
      dispatch(getNativeLanguageAfterLoginAction(languageId));
    },
    selectLanguage: (languageId, appString) => {
      dispatch(languageActionAfterLogin(languageId, appString));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsChooseAppLang);
