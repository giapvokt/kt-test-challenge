import React, { Component } from 'react';
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../../actions/authActions';
import Logo from '../../assets/img/logo.png';

class PPAHeader extends Component {

  
  signout() {
    this.props.signoutUser();
  }
  renderName() {
    return `[${this.props.authUserRoles}]`;
  }

  render() {
    return (
      <div className="main-header">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="navbar-left" src={Logo} alt="logo" height="40" width="40" />
              <a className="navbar-brand" href="/">[ Parent Portal ]</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown eventKey={3} title={this.renderName()} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={this.signout.bind(this)}>Sign Out</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.authUser,
    authUserRoles: state.auth.authUserRoles,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { signoutUser })(PPAHeader)
;