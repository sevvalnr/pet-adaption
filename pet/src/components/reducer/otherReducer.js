import { FETCH_OTHERS } from "../action/types";

const otherReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OTHERS:
      return { ...state, others: action.payload  };
    default:
      return state;
  }
};

export default otherReducer;
