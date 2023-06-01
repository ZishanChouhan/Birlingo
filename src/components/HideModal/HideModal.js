import * as React from "react";
import { Modal, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styles from "./styles";
import { images } from '../../Theme';
import LinearGradient from 'react-native-linear-gradient';

export class HideModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    render() {
        var { appString, label, isModal } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}>

                <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0)', marginTop: 90 }}>

                </View>

            </Modal>
        );
    }
}

export default HideModal
//'rgba(255,255,255,0)'