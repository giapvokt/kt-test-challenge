import {
  call,
  put,
  take,
  all,
  fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
  FETCH_STUDENT_REQUESTS,
  GET_STUDENT_REQUESTS,
  SAVE_STUDENT_QUERY,
  SHOW_LOADING,
  HIDE_LOADING
} from '../actions/types';
import { axioFetchStudentAccessRequests } from '../services/apis';

const clear = (clearSearch) => {
  ((clearSearch) ? clearSearch() : false);
};

function* fetchStudentAccessRequests() {
  while (true) {
    try {
      const { config, page, limit, search, clearSearch } = yield take(FETCH_STUDENT_REQUESTS);
      yield put({ type: SHOW_LOADING });
      const response = yield call(axioFetchStudentAccessRequests, config);
      yield put({ type: HIDE_LOADING });

      const requests = { ...response.data, currentPage: page, elementsInPage: limit };
      if (!_.isEmpty(requests)) {
        yield put({ type: GET_STUDENT_REQUESTS, payload: requests });
      }
     if (!_.isEmpty(search)) {
        yield put({ type: SAVE_STUDENT_QUERY, querySearch: search });
      } else{
        yield put({ type: SAVE_STUDENT_QUERY, querySearch: "" });
      }
      yield call(clear, clearSearch);
    } catch (error) {
      yield put({ type: HIDE_LOADING });
    }
  }
}

export default function* root() {
  yield all([
    fork(fetchStudentAccessRequests)
  ]);
}
