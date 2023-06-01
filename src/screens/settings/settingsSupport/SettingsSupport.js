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
import { colors, images } from "../../../Theme";
import { styles } from "../commonStyle";
import { getSupportAction } from "../settingAction";
import { Loader, BottomTab, SettingHeaderTitle } from "../../../components";
const { height, width } = Dimensions.get("window");
import AutoHeightWebView from "../../../components/autoheight_webview/autoHeightWebView";
import LinearGradient from "react-native-linear-gradient";

class SettingsSupport extends Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {
      appString: "",
      supportDetails: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.getSupportDetails();
    if (
      this.props &&
      this.props.getAppString &&
      this.props.getAppString.data !== this.state.appString
    ) {
      this.setState({ appString: this.props.getAppString.data });
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.support &&
      newProps.support.supportDetails[0].description != this.state.supportUrl
    ) {
      this.setState({
        supportDetails: newProps.support.supportDetails[0].description,
      });
    }
  }

  getSupportDetails = () => {
    AsyncStorage.getItem("language", (err1, item1) => {
      if (item1 != null) {
        var language = JSON.parse(item1);
        const privacyData = {
          slug: "support",
          language_id: language.language_id,
          device: "web",
        };

        this.props.getSupportDetails(privacyData, this.state.appString);
      } else {
      }
    });
  };

  render() {
    const { appString } = this.state;
    if (this.state.supportUrl != "" && this.state.loading) {
      this.setState({ loading: false });
    }
    console.log("supportDetails =>", this.state.supportDetails);
    var htmlCode = this.state.supportDetails;

    return (
      <SafeAreaView style={{flex: 1}}>
      <LinearGradient colors={colors.backGround} style={{ flex: 1 }}>
        <Loader loading={this.state.loading} />

        <SettingHeaderTitle
          title={appString && appString.lbl_Support}
          navigation={this.props.navigation}
          fSize={ Dimensions.get('window').width > 670 ?40:22}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <AutoHeightWebView
          startInLoadingState={true}
          customStyle={`p {font-size: ${this.fontsize}px;}`}
          style={{
            width: Dimensions.get("window").width - 40,
            marginTop: 16,
            marginLeft: 20,
          }}
          onSizeUpdated={(size) => console.log(size.height)}
          // or uri
          source={{
            html: `<p>${htmlCode}</p>`,
          }}
          zoomable={false}
        />
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
    support: state.support.supportDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSupportDetails: (languageId) => {
      dispatch(getSupportAction(languageId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsSupport);
