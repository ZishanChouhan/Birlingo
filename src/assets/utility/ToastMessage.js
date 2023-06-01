//***** import libraries */
import { showMessage } from "react-native-flash-message";

//***** Function for showing alert messages for 5 sec in whole app */
export function showToast(message, type = "success", btnText = "", appTerms) {
  // console.log("global.Terms 1 =>", global.Terms);
  showMessage({
    position: "top",
    message: global.Terms['lbl_success'],
    icon: "success",
    description: message,
    duration: 5000,
    type: type,
    backgroundColor: '#000',
    color: "#ffffff"
  });
}


//***** Function for showing long alert messages for 10 sec in whole app */
export function showToastLong(message, type = "success") {
  showMessage({
    position: "top",
    message: "Alert",
    icon: "success",
    description: message,
    duration: 4000,
    type: type
  });
}

//***** Function for showing danger(red) alert messages in whole app */
export function showDangerToast(message, type = "danger") {
  // console.log("global.Terms 2 =>", global.Terms);

  showMessage({
    position: "top",
    message: global.Terms["lbl_alert"],
    icon: "success",
    description: message,
    duration: 4000,
    backgroundColor: '#000',
    type: type
  });
}
