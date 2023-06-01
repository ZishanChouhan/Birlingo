import * as navigation from './navigationHelpers'

export const NAVIGATE = '[ROUTING] NAVIGATE'

export const navigate = ( name, params ) => {
  return ( dispatch ) => {
    // dispatch({ type: NAVIGATE, name  })
    // console.log("dfifji");
    navigation.navigate( name, params )
  }
}

export const closeDrawer = () => {
  return () => {
    navigation.closeDrawer()
  }
}

export const resetNavStack = ( resetConfig ) => {
  return () => {
    navigation.resetNavStack( resetConfig )
  }
}

export const replace = ( navigationConfig ) => {
  return ( dispatch ) => {
    dispatch({ type: NAVIGATE, navigationConfig })
    navigation.replace( navigationConfig )
  }
}

export const pop = () => {
  return () => {
    navigation.pop()
  }
}

export const popToTop = () => {
  return () => {
    navigation.popToTop()
  }
}

export const back = () => {
  return () => {
    navigation.back()
  }
}
