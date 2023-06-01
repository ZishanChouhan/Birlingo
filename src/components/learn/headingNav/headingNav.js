import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {styles} from './styles';
import {colors, images} from '../../../Theme';

const {height, width} = Dimensions.get('window');

class HeadingNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      backgroundColor: '#fff',
    };
  }
  onClose = index => {
    this.props.onExit(index);
  };

  _goToSentence = () => {
    this.props.goToSentence();
  };

  render() {
    const {
      currentIndex,
      totalIndex,
      onScreen,
      bgColor = '#fff',
      type,
      title,
    } = this.props;

    return (
      <View style={{backgroundColor: bgColor}}>
        <View style={styles.statusBarContainer}>
          <TouchableOpacity
            onPress={() => this.onClose(currentIndex)}
            activeOpacity={0.8}
            style={styles.closeView}>
            <Image source={images.close} style={styles.closeImg} />
          </TouchableOpacity>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>
              {30 ? this.props.lessonID : ''}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.arrowDownView}>
            {/* {currentIndex != totalIndex && onScreen != 'demo' ? <Image source={require('../../../assets/images/arrow/DropdownIcon/down3x.png')} style={styles.downImg} /> : null
                    } */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: colors.code_fff,
            marginHorizontal: 15,
          }}
        />
      </View>
    );
  }
}

export default HeadingNav;
