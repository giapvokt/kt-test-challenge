import { FETCH_STUDENT_REQUESTS, UPDATE_STUDENT_REQUEST, CREATE_STUDENT_REQUEST, SORT_REQUESTS, SHOW_LOADING, HIDE_LOADING } from './types';
import { httpProtected } from './index';
import { axioUpdateStudentAccessRequest, axioCreateStudentAccessRequest } from '../services/apis';

export function getStudentAccessRequests(page = 1, limit = 25, search, clearSearch) {
  const config = httpProtected();
  config.params = { ...search, page, limit };
  return (dispatch) => {
    dispatch({
      type: FETCH_STUDENT_REQUESTS,
      config,
      page,
      limit,
      search,
      clearSearch
    });
  };
}

export function updateStudentAccessRequest(accessRequest) {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADING });
    axioUpdateStudentAccessRequest(httpProtected(), accessRequest)
      .then((response) => {
        dispatch({ type: HIDE_LOADING });
        const request = response.data[0];
        return dispatch({
          type: UPDATE_STUDENT_REQUEST,
          payload: request
        });
      })
      .catch((error) => {
        dispatch({ type: HIDE_LOADING });
      });
  };
}

export function createStudentAccessRequest(row, callback) {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADING });
    axioCreateStudentAccessRequest(httpProtected(), row)
      .then((response) => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: CREATE_STUDENT_REQUEST,
          payload: response.data
        });

        if (callback) { callback(); }
      })
      .catch((err) => {
        dispatch({ type: HIDE_LOADING });
        console.log(err);
      });
  };
}

export const sortRequests = (sortName, sortOrder) => {
  return (dispatch) => {
    dispatch({
      type: SORT_REQUESTS,
      payload: { sortName, sortOrder }
    });
  };
};
