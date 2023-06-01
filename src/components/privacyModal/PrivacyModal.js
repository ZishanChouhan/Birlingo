import * as React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {images} from '../../Theme';
import Button from '../container/Button';

import AutoHeightWebView from '../../components/autoheight_webview/autoHeightWebView';
export class PrivacyModal extends React.Component {
  constructor(props) {
    super(props);
    this.fontsize = 18;
    this.state = {
      visible: true,
    };
  }

  goToAccount = () => {
    console.log('settingsAccount from PrivacyModal');
    this.props.onDisable();
    this.props.navigation.navigate('SettingsAccount');
  };

  render() {
    var {appString, privacyDetails} = this.props;
    var htmlCode = privacyDetails;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.onDisable()}
            style={styles.close_view}>
            <Image source={images.closeIcon} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {appString && appString.lbl_privacy_policy}
            </Text>
          </View>

          <AutoHeightWebView
            startInLoadingState={true}
            customStyle={`p {font-size: ${this.fontsize}px;}`}
            style={{
              width: Dimensions.get('window').width - 40,
              marginTop: 16,
              marginLeft: 20,
              backgroundColor: 'white',
            }}
            // customScript={`document.body.style.background = 'white';`}
            onSizeUpdated={size => console.log(size.height)}
            // or uri
            source={{
              html: `<p>${htmlCode}</p>`,
            }}
            zoomable={false}
          />
        </View>
      </Modal>
    );
  }
}

export default PrivacyModal;
