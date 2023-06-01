import * as React from "react";
import { Modal, View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styles from "./styles";
import { images } from '../../Theme';
import LinearGradient from 'react-native-linear-gradient';

export class ConformationModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    // goToAccount = () => {
    //     this.props.onDisable();
    //     this.props.navigation.navigate('settingsAccount');
    // }

    render() {
        var { appString, label, isModal } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}>
                <TouchableWithoutFeedback style={styles.close_view}>
                    <LinearGradient colors={['rgb(83,179,214)', 'rgb(48,75,195)']} style={{ flex: 1, }}>
                        <View style={styles.container}>
                            <View style={styles.nav_view} >

                                <View style={styles.text_view}>
                                    <Text style={styles.text}>
                                        {label}
                                    </Text>
                                    {isModal != 2 ?
                                        <View style={styles.btn_view}>
                                            <TouchableOpacity style={styles.btn_no} onPress={() => this.props._no()} >
                                                <Text style={styles.text_yes_no}>{appString.lbl_no}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btn_yes} onPress={() => this.props._yes()}>
                                                <Text style={styles.text_yes_no}>{appString.lbl_yes}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.btn_view_1}>

                                            <TouchableOpacity style={styles.btn_yes} onPress={() => this.props._ok()}>
                                                <Text style={styles.text_yes_no}>{appString.lbl_ok}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

export default ConformationModal