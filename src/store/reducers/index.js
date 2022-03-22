import { combineReducers } from 'redux';
import userReducer from './userReducer';
import coordsReducer from './coordsReducer';
import coordsClickReducer from './coordsClickReducer'

const reducersSpec = {
  drivers: userReducer,
  coordsAdress: coordsReducer,
  coordsPlacemark: coordsClickReducer,
};

const rootReducer = combineReducers(reducersSpec);
export default rootReducer;
