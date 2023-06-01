import * as React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  StatusBar
} from 'react-native';
import styles from './styles';
import {images, colors} from '../../Theme';
import {BlueButton} from '../../../src/components';
import LinearGradient from 'react-native-linear-gradient';
export class PrivacyModal extends React.Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {
      visible: true,
    };
  }

  goToAccount = () => {
    this.props.onDisable();
    this.props.navigation.navigate('SettingsAccount');
  };
  goToDownloads = () => {
    this.props.navigation.navigate('DownloadsList');
    this.setState({
      netConnected: true,
    });
  };

  isConnected = () => {
    this.props.isConnected();
  };

  _goDownload = () => {
    this.props.download();
    // console.log('methiss >>>>>',this.props)
  };
  render() {
    var {appString, privacyDetails, visible, download} = this.props;
    var htmlCode = privacyDetails;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          BackHandler.exitApp();
        }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="rgb(255,255,255)"
        />
        <LinearGradient
          colors={colors.backGround}
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={images.appLogo}
            style={{marginBottom: 80, tintColor: colors.code_fff}}
          />
          <View style={{marginHorizontal: 20, alignItems: 'center'}}>
            <Text
              style={{
                //  alignSelf: "flex-start",
                //marginLeft: 24,
                fontSize: 20,
                fontWeight: '600',
                color: colors.code_fff,
              }}>
              {global.Terms
                ? global.Terms.lbl_connection_failed
                : appString ? appString.lbl_connection_failed : " Verbindung fehlgeschlagen!"}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                //alignSelf: "flex-start",
                // marginLeft: 24,
                marginTop: 16,
                marginBottom: 24,
                fontSize: 16,
                fontWeight: '400',
                color: colors.code_fff,
              }}>
              {global.Terms
                ? global.Terms.lbl_i_tried
                : appString && appString.lbl_i_tried}
             </Text>
            <View style={{width: '40%'}}>
              <View style={{marginBottom: '10%'}}>
                <BlueButton
                  blackColor={colors.maroon}
                  onClick={() => this._goDownload()}
                  title={global.Terms ? global.Terms.lbl_goto_download : appString ? appString.lbl_goto_download : "Gehen Sie zu Downloads"}
                />
              </View>
             <TouchableOpacity
                style={{padding: 5, alignItems: 'center'}}
                // onPress={async () => {
                //   this.isConnected();
                // }}
                onPress={() => this.isConnected()}>
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.code_fff,
                    fontWeight: 'normal',
                    textDecorationLine: 'underline',
                  }}>
                  {global.Terms ? global.Terms.lbl_retry : appString ? appString.lbl_retry : "Nochmal versuchen"}
                </Text> 
              </TouchableOpacity>
            </View> 
          </View>
        </LinearGradient> 
      </Modal>
    );
  }
}

export default PrivacyModal;
