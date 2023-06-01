import React, {PureComponent, Component} from 'react';
import {View, ActivityIndicator, Modal, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
//import styles from './styles'
import {colors, images, metrics} from '../../Theme';
import {Bubbles} from 'react-native-loader';

const height = metrics.screenHeight;
const width = metrics.screenWidth;

class AsyncOverlay extends Component {
  render() {
    const {visible} = this.props;
    if (this.props.visible === true) {
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={visible}
          onRequestClose={() => {}}>
          <View style={styles.modalBackground}>
            <Bubbles size={10} color="#FFF" />
            {/* <Image
              source={images.ringLoader}
              style={{ width: width * (70 / 375), height: width * (70 / 375) }}
            /> */}
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    visible: state.systemWorking.visible,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    //backgroundColor: "rgba(0,0,0, 0.4)"
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AsyncOverlay);
