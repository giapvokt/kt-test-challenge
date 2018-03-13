import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainLayout from './layouts/MainLayout';
import SubLayout from './layouts/SubLayout';


export const MainLayoutRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={matchProps => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

export const SubLayoutRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={matchProps => (
        <SubLayout>
          <Component {...matchProps} />
        </SubLayout>
      )}
    />
  );
};

MainLayoutRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

SubLayoutRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};
