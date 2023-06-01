import { getLessionApi, saveHistoryApi } from "../../../api/demoActions";
import { setLessonSentence } from "./lessonReducer";
import { navigate, replace } from "../../../actions/routing";

export const lessonAction = (data, appString) => {
  return async function(dispatch) {
    try {
      console.log('data-------',data)
      const response = await getLessionApi(data);
      dispatch(setLessonSentence(response.data));
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const saveHistoryAction = (data, type,familyName) => {
  console.log("screen----",data, type,);
  return async function(dispatch) {
    try {
      const response = await saveHistoryApi(data);
      if (response) {
        if(type == 2){
          dispatch(navigate("LessonOverviewChoose"))
        }else{
          dispatch(replace('DownloadsList'))
        }
      }
    } catch (error) {
      console.log("err lessonAction=====>>>>>>", error);
    }
  };
};
