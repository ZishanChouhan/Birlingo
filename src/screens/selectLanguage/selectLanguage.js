import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { images } from "../../Theme";
import { styles } from "./styles";
import { LanguageList, Loader, NetMoadal } from "../../components";
import HandleBack from "../../components/container/Back";
import { connect } from "react-redux";
import { getNativeLanguageAction, selectLanguageAction } from "./actions";
import LinearGradient from "react-native-linear-gradient";
import { showToast, showDangerToast } from "../../assets/utility/ToastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const currentDate = new Date().toISOString();

class SelectLanguage extends Component {
  constructor(props) {
    showToast("SelectLanguage");
    super(props);
    this.state = {
      select: false,
      appString: "",
      getAppLanguage: "",
      languageValue: "",
      languageId: "",
      //languages: [{key: 'English'},{key: 'Spanish'},{key: 'French'},{key: 'Chinese'}]
      languages: [],
      selectedLang: undefined,
    };
  }

  static navigationOptions = {
    tabBarLabel: " ",
    tabBarIcon: () => <Image source={images.menuImg} style={styles.tabImage} />,
  };

  componentDidMount() {
    console.log("SelectLanguage");
    this.props.getNativeLanguage();
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: this.props.getAppString.data });
    }

    let getNativeLang = [];
    if (
      newProps.getAppLanguage &&
      newProps.getAppLanguage.getAppLanguage !== this.state.languages
    ) {
      newProps.getAppLanguage &&
        newProps.getAppLanguage.getAppLanguage.map((data, key) => {
          if (key == this.state.selectedLang) {
            getNativeLang.push({
              _id: data._id,
              language: this.props.getAppString.data[data.term],
              selected: 1,
            });
          } else {
            getNativeLang.push({
              _id: data._id,
              language: this.props.getAppString.data[data.term],
              selected: 0,
            });
          }
        });
    }

    this.setState({
      languages: getNativeLang,
    });
  }

  //***** For handling back button in android */
  onBack = () => {
    const { appString } = this.state;

    Alert.alert(
      appString ? appString.msg_app_close : "Do you want to exit the app?",
      "",
      [
        {
          text: appString ? appString.lbl_no : "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: appString ? appString.lbl_yes : "Yes",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  };

  selectLanguage = (lang, index) => {
    console.log("lang", lang);
    let data = this.state.languages;

    this.setState({
      languages: data,
      selectedLang: index,
    });

    languageId = {
      language_id: lang._id,
    };

    this.setState({ languageId: languageId, languageValue: lang._id });
    this.props.selectLanguage(languageId);
    this.props.selectLanguage(languageId);
    this.setState({ select: true });
  };

  _getLanguageString() {
    this.state.languages.map((item) => {
      if (item._id == this.state.languageValue) {
        AsyncStorage.multiSet(
          [
            ["language", JSON.stringify(this.state.languageId)],
            ["languageValue", JSON.stringify(item.language)],
            ["changeDate", currentDate],
          ],
          (err, item3) => {}
        );
        this.props.navigation.navigate("AppInfo");
      }
    });
  }

  render() {
    const { isLoading } = this.props;
    const { appString } = this.state;
    // console.log("languages---", this.state.languages);

    return (
      <HandleBack onBack={this.onBack}>
        <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
          <LinearGradient
            colors={["rgb(83,179,214)", "rgb(48,75,195)"]}
            style={{ flex: 1 }}
          >
            <Loader loading={isLoading} />

            <View style={styles.titleView}>
              <Text style={styles.title}>
                {appString && appString.lbl_choose_app_language}
              </Text>
              <Text style={styles.subTitle}>
                {appString && appString.lbl_choose_app_language_title}
              </Text>
            </View>
            <View style={styles.list_view}>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={this.state.languages}
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
            </View>

            {this.state.select ? (
              <TouchableOpacity
                onPress={() => this._getLanguageString()}
                style={styles.nextButton}
              >
                <Text style={styles.nextText}>
                  {appString && appString.lbl_next}
                </Text>
              </TouchableOpacity>
            ) : null}
            {/* <NetMoadal
            visible={!false}
            appString={appString} /> */}
          </LinearGradient>
        </View>
      </HandleBack>
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
    getNativeLanguage: () => {
      dispatch(getNativeLanguageAction());
    },
    selectLanguage: (languageId) => {
      dispatch(selectLanguageAction(languageId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectLanguage);
