import moment from 'moment';
import { GET_STUDENT_UPDATE, UPDATE_STUDENT_UPDATE, CREATE_STUDENT_UPDATE } from './types';

export function getStudentUpdateRequests() {
  const studentUpdateRequests = [
    {
      id: 0,
      firstName: 'Billy',
      middleName: 'Middle',
      lastName: 'Beans',
      studentId: '49DSF943',
      address: '1234 Street Ave',
      city: 'Missoula',
      state: 'MT',
      zip: '59801',
      status: 'Pending',
      comment: '',
      parent: 'Parent Name',
      dob: moment().valueOf(),
      submitted: moment().valueOf()
    },
    {
      id: 1,
      firstName: 'Sally',
      middleName: 'Middle',
      lastName: 'Jones',
      studentId: 'D40d2fd94',
      address: '3234 Avenue Pl',
      city: 'Austin',
      state: 'TX',
      zip: '13434',
      status: 'Approved',
      comment: '',
      parent: 'Parent Name',
      dob: moment().valueOf(),
      submitted: moment().valueOf()
    },
    {
      id: 2,
      firstName: 'Sally',
      middleName: 'Middle',
      lastName: 'Jones',
      studentId: 'D40d2fd94',
      address: '3234 Avenue Pl',
      city: 'Austin',
      state: 'TX',
      zip: '13434',
      status: 'Rejected',
      comment: '',
      parent: 'Parent Name',
      dob: moment().valueOf(),
      submitted: moment().valueOf()
    },
    {
      id: 3,
      firstName: 'Sally',
      middleName: 'Middle',
      lastName: 'Jones',
      studentId: 'D40d2fd94',
      address: '3234 Avenue Pl',
      city: 'Austin',
      state: 'TX',
      zip: '13434',
      status: 'Denied',
      comment: '',
      parent: 'Parent Name',
      dob: moment().valueOf(),
      submitted: moment().valueOf()
    }
  ];

  return (dispatch, getState) => {
    const { studentUpdate } = getState();

    if (studentUpdate.updateRequests.length > 0) {
      return;
    }

    dispatch({
      type: GET_STUDENT_UPDATE,
      payload: studentUpdateRequests
    });
  };
}

export function updateStudentUpdateRequest(request) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STUDENT_UPDATE,
      payload: request
    });
  };
}

export function createStudentUpdateRequest(row, callback) {
  console.log('HERE', row);
  return (dispatch) => {
    dispatch({
      type: CREATE_STUDENT_UPDATE,
      payload: row
    });

    callback();
  };
}
