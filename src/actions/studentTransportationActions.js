import { GET_STUDENT_TRANSPORTATION, UPDATE_STUDENT_TRANSPORTATION } from './types';

export function getStudentTransportationRequests() {
  const studentTransportationRequests = [
    {
      id: 0,
      firstName: 'Billy',
      lastName: 'Smith',
      studentId: '49DSF943',
      status: 'Approved',
      tripType: 'To School',
      scheduleType: 'Specific Date',
      specificDate: new Date(),
      stopAddress: '3000 Palmer St, Missoula, MT 59801',
      stopId: 123
    },
    {
      id: 1,
      firstName: 'Sally',
      lastName: 'Jones',
      studentId: 'D40d2fd94',
      status: 'Pending',
      tripType: 'From School',
      scheduleType: 'Specific Date',
      specificDate: new Date(),
      stopAddress: '1823 Montana St, Missoula, MT 59801',
      stopId: 321
    },
    {
      id: 2,
      firstName: 'Jim',
      lastName: 'Bob',
      studentId: 'C4434sd94',
      status: 'Rejected',
      tripType: 'Round Trip',
      scheduleType: 'Repeat Every Week',
      startDate: new Date(),
      endDate: new Date(),
      frequency: 'MTWHF',
      stopAddress: '2045 Schililng St, Missoula, MT 59801',
      stopId: 591
    }
  ];

  return (dispatch) => {
    dispatch({
      type: GET_STUDENT_TRANSPORTATION,
      payload: studentTransportationRequests
    });
  };
}

export function updateStudentTransportationRequest(request) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STUDENT_TRANSPORTATION,
      payload: request
    });
  };
}
