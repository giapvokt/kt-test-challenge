import _ from 'lodash';
import { GET_STUDENT_REQUESTS, SAVE_STUDENT_QUERY, UPDATE_STUDENT_REQUEST, CREATE_STUDENT_REQUEST, SORT_REQUESTS } from '../actions/types';

const INITIAL_STATE = {
  accessRequests: [],
  sort: {
    sortName: 'createdAt',
    sortOrder: 'desc'
  },
  paging: {
    currentPage: 1,
    elementsInPage: 25,
    sort: '',
    totalElements: 0,
    totalPages: null
  },
  querySearch: {}
};

const handleSortRequests = function(state, action) {
  const { sortName, sortOrder } = action.payload;
  const accessRequests = _.orderBy(state.accessRequests, [request => ((request[sortName]) ? request[sortName].toLowerCase() : '')], [sortOrder]);
  return { ...state, accessRequests, sort: { sortName, sortOrder } };
};
const handleSaveStudentQuery = function(state, action) {
  const querySearch = action.querySearch;
  return { ...state, querySearch };
};
const handleHetStudentRequest = function(state, action) {
  const { pages, matchingRequests, currentPage,
    elementsInPage, studentAccessRequests } = action.payload;
  const { sortOrder, sortName } = state.sort;
  const paging = {
    ...paging,
    currentPage,
    elementsInPage,
    sort: '',
    totalElements: matchingRequests,
    totalPages: pages
  };
  const accessRequests = _.orderBy(studentAccessRequests, [request => ((request[sortName]) ? request[sortName].toLowerCase() : '')], [sortOrder]);
  return { ...state, paging, accessRequests };
};

const handleUpdateStudentRequest = function(state, action) {
  const { payload } = action;
  const accessRequests = state.accessRequests.map((request) => {
    return request.id === payload.id ? payload : request;
  });
  return { ...state, accessRequests };
};

// auth reducers for updating the redux state depending on action type
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SORT_REQUESTS:
      return handleSortRequests(state, action);
    case SAVE_STUDENT_QUERY:
      return handleSaveStudentQuery(state, action);
    case GET_STUDENT_REQUESTS:
      return handleHetStudentRequest(state, action);
    case UPDATE_STUDENT_REQUEST:
      return handleUpdateStudentRequest(state, action);
    case CREATE_STUDENT_REQUEST:
      return { ...state };
    default:
      return { ...state };
  }
}
