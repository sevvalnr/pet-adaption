import { FETCH_CATS } from "../action/types";

const catReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATS:
      return { ...state, cats: action.payload  };
    default:
      return state;
  }
};

export default catReducer;
