import axios from 'axios';
import { GATEWAY_V1 } from '../actions/index';

export const axioFetchStudentAccessRequests = (config) => {
  return new Promise((resolve, reject) => {
    axios.get(`${GATEWAY_V1}/studentAccessRequests`, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export const axioUpdateStudentAccessRequest = (config, accessRequest) => {
  return new Promise((resolve, reject) => {
    axios.put(`${GATEWAY_V1}/studentAccessRequests/${accessRequest.id}`, accessRequest, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export const axioCreateStudentAccessRequest = (config, row) => {
  return new Promise((resolve, reject) => {
    axios.post(`${GATEWAY_V1}/studentAccessRequests`, row, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export const axioGetNewAccessToken = (config) => {
  const scope = 'Tenant Management';
  return new Promise((resolve, reject) => {
    axios.get(`${GATEWAY_V1}/accounts/accesstoken/${scope}`, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export const axioGetAuthUser = (config, request) => {
  // For Test Challenge
  let url = `${GATEWAY_V1}/accounts/signin`;
  console.log(request);
  if (request.email !== 'admin@test.com' || request.password !== 'test123') {
    url = `${GATEWAY_V1}/accounts/signin/fail`;
  }
  return new Promise((resolve, reject) => {
    axios.post(url, request, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};

export const axioForgotPassword = (config, email) => {
  return new Promise((resolve, reject) => {
    axios.post(`${GATEWAY_V1}/accounts/forgotpassword`, { email }, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
};
