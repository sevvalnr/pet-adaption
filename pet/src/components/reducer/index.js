import { combineReducers } from 'redux';
import userReducer from './userReducer';
import dogReducer from './dogReducer';
import catReducer from './catReducer';
import birdReducer from './birdReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dogs: dogReducer,
  cats: catReducer,
  birds: birdReducer,
  others: otherReducer,

});

export default rootReducer;
