import _ from 'lodash';
import { GET_STUDENT_UPDATE, UPDATE_STUDENT_UPDATE, CREATE_STUDENT_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  updateRequests: []
};

const handleCreateStudentUpdate = function(state, action) {
  const savedRequests = _.clone(state.updateRequests);
  savedRequests.push(action.payload);
  return { ...state, updateRequests: savedRequests };
};

const handleUpdateStudentUpdate = function(state, action) {
  const updatedRequests = state.updateRequests.map((i) => {
    return i.id === action.payload.id ? action.payload : i;
  });
  return { ...state, updateRequests: updatedRequests };
};

// auth reducers for updating the redux state depending on action type
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_STUDENT_UPDATE:
      return { ...state, updateRequests: action.payload };
    case UPDATE_STUDENT_UPDATE:
      return handleUpdateStudentUpdate(state, action);
    case CREATE_STUDENT_UPDATE:
      return handleCreateStudentUpdate(state, action);
    default:
      return state;
  }
}
