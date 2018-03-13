import { GET_STUDENT_TRANSPORTATION, UPDATE_STUDENT_TRANSPORTATION } from '../actions/types';

const INITIAL_STATE = {
  transportationRequests: []
};
const handleUpdateStudent = function(state, action) {
  const updatedRequests = state.transportationRequests.map((i) => {
    return i.id === action.payload.id ? action.payload : i;
  });
  return { ...state, transportationRequests: updatedRequests };
};

// auth reducers for updating the redux state depending on action type
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_STUDENT_TRANSPORTATION:
      return {
        ...state,
        transportationRequests: action.payload
      };
    case UPDATE_STUDENT_TRANSPORTATION:
      return handleUpdateStudent(state, action);
    default:
      return state;
  }
}
