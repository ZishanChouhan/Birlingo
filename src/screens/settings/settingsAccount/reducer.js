const GET_SUBSCRIPTION_PLAN = "GET_SUBSCRIPTION_PLAN";
const GET_SUBSCRIPTION_CONTENT = "GET_SUBSCRIPTION_CONTENT";
const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN";

export const setSubscription = (subscriptionList) => {
  return {
    type: GET_SUBSCRIPTION_PLAN,
    subscriptionList,
  };
};

export const getSubscriptionContent = (subscriptionContent) => {
  return {
    type: GET_SUBSCRIPTION_CONTENT,
    subscriptionContent,
  };
};

export const getAccessToken = (accessToken) => {
  return {
    type: GET_ACCESS_TOKEN,
    accessToken,
  };
};

const initialState = {
  subscriptionList: null,
  subscriptionContent: null,
  accessToken:null
};

// reducer function to manage the modal state
export default function subscription(state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIPTION_PLAN:
      return {
        ...state,
        subscriptionList: action.subscriptionList,
      };

    case GET_SUBSCRIPTION_CONTENT:
      return {
        ...state,
        subscriptionContent: action.subscriptionContent,
      };

    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
}
