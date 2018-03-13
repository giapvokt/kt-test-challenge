import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.less';

const MainLayout = ({ children }) => (
  <div className="main">
    <Header />
    <div className="main-content">
      {children}
    </div>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
