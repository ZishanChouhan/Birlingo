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
import Button from "../container/Button";
export class SecondRatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  goToAccount = () => {
    this.props.onDisable();
    this.props.navigation.navigate("SettingsAccount");
  };

  render() {
    var { appString, _title, _lbl_no, _lbl_yes } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback style={styles.close_view}>
          <View style={styles.container}>
            <View style={styles.text_view}>
              <Text style={styles.text}>{appString.lbl_review_title}</Text>
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
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default SecondRatingModal;
