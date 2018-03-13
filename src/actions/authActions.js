import jwt from 'jwt-simple';
import store from '../configureStore';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  RESET_AUTH_STATE,
  SHOW_LOADING,
  HIDE_LOADING
} from './types';
import { httpProtected, httpOpen, refreshBuffer } from './index';
import { axioGetNewAccessToken, axioGetAuthUser, axioForgotPassword } from '../services/apis';

// takes user credentials and sends them to the auth server for authentication and recieves a jwt
const setRefreshTimeout = (timeLeft) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(getNewAccessToken());
    }, timeLeft);
  });
};

const getNewAccessToken = () => {
  return new Promise((resolve, reject) => {
    axioGetNewAccessToken(httpProtected())
      .then((response) => {
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const keepAuthenticated = (expiresIn) => {
  const expIn = (expiresIn * 1000) - refreshBuffer;

  setRefreshTimeout(expIn)
    .then((response) => {
      const { accessToken } = response.data.body;
      expiresIn = response.data.body.expiresIn;
      sessionStorage.setItem('token', accessToken);

      const userScope = setUser(accessToken);

      keepAuthenticated(expiresIn);

      return store.dispatch({
        type: AUTH_USER,
        payload: userScope
      });
    })
    .catch((err) => {
      return signoutUser();
    });
};

const setUser = (accessToken) => {
  const decode = jwt.decode(accessToken, 'falseSecret', true);
  const scope = decode.scope[0].split(':');
  return { app: scope[0], group: scope[1], role: scope[2] };
};

// takes user credentials and sends them to the auth server for authentication and recieves a jwt
export function getAuthUser(userCredentials, callback) {
  const request = {
    email: userCredentials.email,
    password: userCredentials.password,
    grantType: window.CLIENT_ENV.RESOURCE_OWNER,
    clientId: window.CLIENT_ENV.CLIENT_ID,
    scope: window.CLIENT_ENV.APP
  };

  return function(dispatch) {
    // submit email and password to server to authenticate user
    dispatch({ type: SHOW_LOADING });
    axioGetAuthUser(httpOpen(), request)
      .then((response) => {
        dispatch({ type: HIDE_LOADING });
        if (response.data.statusCode === 401) {
          dispatch(authError(response.data.body.message));
        } else {
          // if request is good ...
          const { accessToken } = response.data.body;
          // -- save JWT token
          sessionStorage.setItem('token', accessToken);

          const userScope = setUser(accessToken);

          dispatch({
            type: AUTH_USER,
            payload: userScope
          });

          if (callback) {
            callback();
          }
        }
      })
      .catch((error) => {
        dispatch({ type: HIDE_LOADING });
        if (error.response && error.response.status === 429) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError('An error has occured in the login. Ensure you have the correct permissions. Contact System Admin.'));
        }
      });
  };
}

export function verifyOnRefresh() {
  // send token to server, server will decode token and return matching user
  // set state of authenticated user.
  // axios request to server with token
  // dispatch returned user and set as auth.user state in reducer
  return function(dispatch) {
    const token = sessionStorage.getItem('token', token);
    const currentTime = Math.round(new Date().getTime() / 1000);
    const decode = jwt.decode(token, 'falseSecret', true);

    const scope = decode.scope[0].split(':');
    const userScope = {
      app: scope[0],
      group: scope[1],
      role: scope[2]
    };

    if (decode.exp >= currentTime) {
      const timeLeft = decode.exp - currentTime;

      if (timeLeft > 0) {
        const timeLeft = (timeLeft * 1000) - refreshBuffer;
        setRefreshTimeout(timeLeft)
          .then((response) => {
            const { accessToken, expiresIn } = response.data.body;
            sessionStorage.setItem('token', accessToken);
            keepAuthenticated(expiresIn);
            return dispatch({
              type: AUTH_USER,
              payload: userScope
            });
          })
          .catch((err) => {
            return signoutUser();
          });
      }
      return dispatch({
        type: AUTH_USER,
        payload: userScope
      });
    }

    signoutUser();
  };
}

// dispatches an error that is related to authentication
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// dispatches action to sign user out of the application
export function signoutUser() {
  const dispatch = ((dispatch) || store.dispatch);

  sessionStorage.removeItem('token');
  window.location.hash = '#/signin';

  // add session end message
  return function(dispatch) {
    dispatch({
      type: UNAUTH_USER,
      payload: ''
    });
  };
}

// resets the auth state of any notifications so they don't persist in global state
export function resetState() {
  return {
    type: RESET_AUTH_STATE,
    payload: ''
  };
}

export function forgotPassword(formProps) {
  const { email } = formProps;
  return function(dispatch) {
    dispatch({ type: SHOW_LOADING });
    axioForgotPassword(httpOpen(), email)
      .then((response) => {
        dispatch({ type: HIDE_LOADING });
        if (response.data.error) {
          dispatch({
            type: AUTH_ERROR,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: AUTH_SUCCESS,
            payload: 'Password reset request submitted, an email has been sent.'
          });
        }
      })
      .catch((err) => {
        dispatch({ type: HIDE_LOADING });
        dispatch({
          type: AUTH_ERROR,
          payload: 'No email found.'
        });
      });
  };
}
