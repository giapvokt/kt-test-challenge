import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './authReducer';
import StudentRequestReducer from './studentRequestReducer';
import StudentTransportationReducer from './studentTransportationReducer';
import StudentUpdateReducer from './studentUpdateReducer';

export default combineReducers({
  routing: routerReducer,
  auth: AuthReducer,
  studentRequests: StudentRequestReducer,
  studentUpdate: StudentUpdateReducer,
  studentTransportation: StudentTransportationReducer,
  form: formReducer
});
