import * as React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { images } from '../../../src/Theme';
import Button from "../../components/container/Button";
import LinearGradient from 'react-native-linear-gradient';
import TextField from "../../components/container/TextField";
import validate from "../../assets/validations/validate_wrapper";
export class CustomPromoCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            promoCode: "",
            promoCodeError: "",

        }
    }
    _submitPromoCode = async () => {
        var { appString } = this.props;
        const promoCodeError = validate("promoCode", this.state.promoCode);
        this.setState({
            promoCodeError: promoCodeError,

        });
        if (promoCodeError) {

        } else {
            this.props.applyCoupon(this.state.promoCode)
        }
        this.setState({ promoCodeError: '' })
    }

    render() {
        var { appString } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                navigation={this.props.navigation}>
                <View style={styles.container}>
                    <LinearGradient colors={['rgb(83,179,214)', 'rgb(48,75,195)']} style={{ flex: 1 }}>

                        <View style={styles.backOutrView}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.nav_view} onPress={this.props._goBack}>
                                <Image source={images.backArrow} style={styles.backArrowImg} />
                                <Text style={styles.navTitle}>{appString && appString.lbl_Go_Back}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>{appString && appString.lbl_enter_promo_code}</Text>
                        </View>

                        <View style={styles.formContainer}>

                            <TextField
                                autoCapitalize={'none'}
                                auto={true}
                                borderWidth={2}
                                error={this.state.promoCodeError}
                                style={styles.input}
                                placeholder={appString && appString.lbl_promo_code}
                                placeholderColor='#fff'
                                borderColor='#fff'
                                onChangeText={promoCode => this.setState({ promoCode: promoCode, promoCodeError: validate("promoCode", promoCode, "", true) })}
                                value={this.state.promoCode}
                            />
                            <Text style={{ marginTop: 10, color: 'red' }}>{this.state.promoCodeError != '' ? '' : this.props.codeError}</Text>
                        </View>

                        <View style={styles.btn_view}>
                            <TouchableOpacity style={styles.buttonFree} onPress={() => this._submitPromoCode()}>
                                <Text style={styles.btntxt}>{appString && appString.lbl_Submit}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.skip_outerView}>
                            <View style={styles.btn_view}>
                                <TouchableOpacity style={styles.buttonFree} onPress={this.props._skip}>
                                    <Text style={styles.btntxt}>{appString && appString.lbl_skip}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <TouchableOpacity style={styles.skip_touchable} onPress={this.props._skip}>
                                <Text style={styles.skipText}>
                                    {appString && appString.lbl_skip}
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </LinearGradient>
                </View>

            </Modal>
        );
    }
}

export default CustomPromoCode