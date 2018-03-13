// sets default header to contain jwt for authorization
import { CONFIG_ENV } from '../config';

window.CLIENT_ENV = CONFIG_ENV();

const apiVersion1 = '/api/v1';
const apiVersion2 = '/api/v2';
const karrosTech = window.CLIENT_ENV.HOST;

export const GATEWAY_V1 = karrosTech + apiVersion1;
export const GATEWAY_V2 = karrosTech + apiVersion2;
export const refreshBuffer = 10 * 60 * 1000; // refresh with 10 minutes to spare


export const httpProtected = () => {
  const token = `Bearer ${sessionStorage.getItem('token')}`;
  const options = {
    headers: { Authorization: token, ApiKey: window.CLIENT_ENV.CLIENT_ID }
  };

  return options;
};

export const httpOpen = () => {
  const options = {
    headers: { ApiKey: window.CLIENT_ENV.CLIENT_ID }
  };

  return options;
};
