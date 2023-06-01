import axios from "axios";
import { BASEURL } from "./Constant";

/************************ MUTLIPART FORM DATA ************************/

export default function uploadImageWithData(formData, url = "createGroup") {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: BASEURL + url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${global.authToken}`
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
