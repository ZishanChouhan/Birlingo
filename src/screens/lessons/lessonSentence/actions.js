import { getLessionApi, saveHistoryApi } from "../../../api/demoActions";
import { setLessonSentence } from "./lessonReducer";
import * as ActionTypes from "../../../actions/actionTypes";
import { navigate } from "../../../actions/routing";

export const lessonAction = (data, appString) => {
  return async function(dispatch) {
    try {
      // dispatch(addAsyncWorkingRequest())
      // console.log('lessonAction data ', data)
      console.log('data-------',data)
      const response = await getLessionApi(data);
      // console.log('lessonAction response', response.data)
      dispatch(setLessonSentence(response.data));
    } catch (error) {
      console.log("err", error);
    } finally {
      // console.log("finally ");
      // dispatch(removeAsyncWorkingRequest())
    }
  };
};

export const saveHistoryAction = (data, type,familyName) => {
  console.log("screen----",data);
  return async function(dispatch) {
    try {
      // console.log('lessonAction lesson data ', data)
      const response = await saveHistoryApi(data);
      //console.log('saveHistoryAction response', response.data)
      if (response) {
        // const postData = {
        //   lessonfamily_id: response.data.lessonfamily_id
        // }
        //const responseList = await getLessonLibraryApi(postData);
        //console.log('getLessonLibraryAction', responseList)
        // dispatch(setLessonLibrary(responseList.data));
        //console.log("type ==>", type);

        if (type === "go") {
          console.log("calling");
          dispatch(navigate("LessonOverviewDownload", {
            lessonfamily_id: data.lessonfamily_id, 
            familyName: familyName, 
            levelId: data.level_id
          }));
        }else if(type == 2){
          dispatch(navigate("LessonOverviewChoose"))
        }
      }
    } catch (error) {
      console.log("err lessonAction=====>>>>>>", error);
      // dispatch(navigate({ routeName: "lessonOverviewDownload" }));
    } finally {
      // console.log("finally ");
    }
  };
};
