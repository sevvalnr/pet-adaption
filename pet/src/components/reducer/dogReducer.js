import { FETCH_DOGS } from "../action/types";

const dogReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DOGS:
      return { ...state, dogs: action.payload  };
    default:
      return state;
  }
};

export default dogReducer;
