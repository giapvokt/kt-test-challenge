import React from 'react';
import PropTypes from 'prop-types';

const SubLayout = ({ children }) => (
  <div className="subLayout">
    {children}
  </div>
);

SubLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SubLayout;
