import { USER_TOKEN, } from './user';

export function userToken(userToken) {
  return {
      type: USER_TOKEN,
      payload: userToken
  }
}