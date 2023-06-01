import { StyleSheet } from 'react-native'
import { colors, metrics } from '../../Theme';

export default StyleSheet.create({
  blur: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    height: metrics.screenHeight,
    width: metrics.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
})
