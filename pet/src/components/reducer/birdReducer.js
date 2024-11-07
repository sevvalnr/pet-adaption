import { FETCH_BIRDS } from "../action/types";

const birdReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BIRDS:
      return { ...state, birds: action.payload  };
    default:
      return state;
  }
};

export default birdReducer;
