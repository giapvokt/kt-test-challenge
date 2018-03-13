import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// authorization component, HOC that ensures the user is authenticated before they can proceed to the requested route.
export default function(ComposedComponent, allowedRoles) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    constructor(props) {
      super(props);
      this.state = {
        token: sessionStorage.getItem('token')
      };
    }

    componentWillMount() {
      const allowed = _.intersection(
        allowedRoles,
        this.props.authUserRoles
      );
      if (this.state.token == null) {
        this.context.router.history.push('/signin');
      } else if (!this.props.authenticated) {
        return <div> LOADING STUFF </div>;
      } else if (!this.props.authenticated || allowed.length <= 0) {
        this.context.router.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      const allowed = _.intersection(
        allowedRoles,
        this.props.authUserRoles
      );

      if (this.state.token == null) {
        this.context.router.push('/signin');
      } else if (!this.props.authenticated) {
        return <div> LOADING STUFF </div>;
      } else if (!nextProps.authenticated || allowed.length <= 0) {
        this.context.router.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      authUser: state.auth.authUser,
      authUserRoles: [state.auth.authUserRoles]
    };
  }

  return connect(mapStateToProps)(Authentication);
}
