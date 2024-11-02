import { combineReducers } from 'redux';
import userReducer from './userReducer';
import dogReducer from './dogReducer';
import catReducer from './catReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dogs: dogReducer,
  cats: catReducer,

});

export default rootReducer;
