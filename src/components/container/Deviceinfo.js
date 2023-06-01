import DeviceInfo from 'react-native-device-info';

export const device_id = DeviceInfo.getUniqueId();

export default hasNotch = DeviceInfo.hasNotch();
