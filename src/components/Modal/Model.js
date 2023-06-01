import * as React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles from './styles';
import {images, colors} from '../../../src/Theme';
import Button from '../../components/container/Button';
import LinearGradient from 'react-native-linear-gradient';
export class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  goToAccount = () => {
    this.props.onDisable();
    Platform.OS == 'ios'
      ? setTimeout(() => {
          this.props.navigation.navigate("Settings",{screen:'SettingsAccount', initial: false});
        }, 400)
      : this.props.navigation.navigate("Settings",{screen:'SettingsAccount', initial: false});
  };

  render() {
    var {appString, systemSetting} = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <LinearGradient colors={colors.backGround} style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => this.props.onDisable()}
                style={styles.close_view}>
                <Image source={images.closeIcon} style={styles.image} />
              </TouchableOpacity>

              <View style={styles.text_view}>
                <Text style={styles.text}>
                  {systemSetting != 0
                    ? appString.lbl_upgrade_subscribe
                    : appString.lbl_website_payment}
                </Text>
                <View style={styles.btn_view}>
                  {systemSetting != 0 ? (
                    <Button
                      label={appString.lbl_see_pricing}
                      onPress={this.goToAccount}
                    />
                  ) : null}
                </View>
              </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default CustomModal;
