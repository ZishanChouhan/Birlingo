import { startStopLoop } from "./reducer";

export const getStopLoopAction = (loop) => {
  return async function(dispatch) {
    try {
      // dispatch(addAsyncWorkingRequest());

      // const response = await getAppGuideApi(languageId);
      console.log('loop', JSON.stringify(loop))
      dispatch(startStopLoop(loop));
      //  dispatch(navigate({ routeName: navi }))
    } catch (error) {
      // console.log('err ', error)
    } finally {
      // dispatch(removeAsyncWorkingRequest());
      //  console.log('finally ')
    }
  };
};