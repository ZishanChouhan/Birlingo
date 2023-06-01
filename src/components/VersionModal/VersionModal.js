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
import { showToast } from '../../assets/utility/ToastMessage';
import { Linking } from 'react-native';
import { Platform } from 'react-native';
export class VersionModal extends React.Component {
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
  _goStore = () => {
   if(Platform.OS == 'ios'){
    Linking.openURL(this.props?.appleUrl)
   } else{
    Linking.openURL(this.props?.googleUrl)
   }
    // console.log('methiss >>>>>',this.props)
  };
  render() {
    var {appString, privacyDetails, visible, appString, download,msg, versionStatus} = this.props;
    var htmlCode = privacyDetails;
    console.log('visible', visible, msg);
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
              {msg}
            </Text>
            {/* <Text
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
              {global.appString
                ? global.appString.msg_connection_failed
                : appString && appString.lbl_i_tried}
            </Text> */}
            <View style={{width: '40%'}}>
              <View style={{marginBottom: '10%'}}>
                {versionStatus != 3 && <BlueButton
                  blackColor={colors.maroon}
                  onClick={() => this._goStore()}
                  title={appString && appString.lbl_go_to_store ? appString.lbl_go_to_store : "Go to store"}
                />}
              </View>
             {versionStatus ==1  && <TouchableOpacity
                style={{padding: 5, alignItems: 'center'}}
                // onPress={async () => {
                //   this.isConnected();
                // }}
                onPress={() => this.isConnected()}>
                <Text
                onPress={this.props.continue}
                  style={{
                    fontSize: 18,
                    color: colors.code_fff,
                    fontWeight: 'normal',
                    textDecorationLine: 'underline',
                  }}>
                  {appString && appString.lbl_continue ?  appString.lbl_continue : "Fortfahren"}
                </Text>
              </TouchableOpacity>}
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  }
}

export default VersionModal;
