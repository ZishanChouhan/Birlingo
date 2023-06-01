import * as React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { images } from "../../Theme";
export class FirstRatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  // goToAccount = () => {
  //     this.props.onDisable();
  //     this.props.navigation.navigate('settingsAccount');
  // }

  render() {
    var { appString } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback style={styles.close_view}>
          <View style={styles.container}>
            <View style={styles.nav_view}>
              <TouchableOpacity
                onPress={() => this.props._goBack()}
                style={styles.crossIcon}
              >
                <Image source={images.closeIcon} style={styles.crossImg} />
              </TouchableOpacity>

              <View style={styles.text_view}>
                <Text style={styles.text}>{appString.lbl_like_birlingo}</Text>
                <View style={styles.btn_view}>
                  <TouchableOpacity
                    style={styles.btn_no}
                    onPress={() => this.props._no()}
                  >
                    <Text style={styles.text_yes_no}>{appString.lbl_no}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btn_yes}
                    onPress={() => this.props._yes()}
                  >
                    <Text style={styles.text_yes_no}>{appString.lbl_yes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default FirstRatingModal;
