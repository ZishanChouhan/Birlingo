// import { NavigationActions, DrawerActions, StackActions } from 'react-navigation'
import { createNavigationContainerRef, CommonActions, StackActions, DrawerActions } from '@react-navigation/native';
export const navigatorRef = createNavigationContainerRef()

// let navigatorRef = null

// export const setNavigationRef = (ref) => {
//   navigatorRef = ref
// }

export const navigate = (name, params) => {
  console.log("navigationConfig", name, params);
  console.log("dhf");
  if (navigatorRef.isReady()) {
    // navigatorRef.dispatch(
      navigatorRef.navigate(name, params)
    // )
  }
}

// Not working
export const replace = (navigationConfig) => {
  navigatorRef.dispatch(
    StackActions.replace(navigationConfig)
  )
}

export const push = (navigationConfig) => {
  navigatorRef.dispatch(
    StackActions.push(navigationConfig)
  )
}

export const pop = () => {
  navigatorRef.dispatch(
    StackActions.pop({})
  )
}

export const back = () => {
  navigatorRef.dispatch(
    NavigationAction.back()
  )
}

export const openDrawer = () => {
  navigatorRef.dispatch(
    DrawerActions.openDrawer()
  )
}

export const closeDrawer = () => {
  navigatorRef.dispatch(
    DrawerActions.closeDrawer()
  )
}

export const popToTop = () => {
  navigatorRef.dispatch(
    StackActions.popToTop({})
  )
}
export const resetNavStack = (resetConfig) => {
  navigatorRef.dispatch(
    StackActions.reset(resetConfig)
  )
}

const setTopLevelNavigator = (ref) => {
  navigatorRef = ref
}

const navigateToScreen = (routeName, params) => {
  navigatorRef.dispatch(
    NavigationAction.navigate({ routeName, params })
  );
}

const getTerms = async () => {

}

export default {
  getTerms,
  setTopLevelNavigator,
  navigateToScreen
}
