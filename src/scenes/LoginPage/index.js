import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getAuthUser, resetState } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Grid, Row } from 'react-bootstrap';
import BlackBoardLogo from '../../assets/img/blank-blackboard.png';
import Logo from '../../assets/img/logo.png';
// auth component that shows a user login page, and handles login request

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  componentWillMount() {
    this.props.resetState();
  }
  handleSubmit() {
    this.props.getAuthUser(this.state, () => {
      this.context.router.history.push('/');
    });
  }
  handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  errorHandler() {
    return (
      <strong className="redux-form-error">
        {' '}{this.props.authError}{' '}
      </strong>
    );
  }

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;
    const { email, password } = this.state;
	  return (
      <div className="signin-container">
        <img src={BlackBoardLogo} />
        <div className="signin-container__form">
          <div className="signin-container__banner">
            <Row >
              <Col sm={6} smOffset={3}>
                <img src={Logo} />
                <a> Log In</a>
              </Col>
            </Row>

          </div>
          <div className="signin-container__form__login">
            <Form horizontal onSubmit={this.onSubmit}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={1}>
                  <i className="fal fa-user login-icon" />
                </Col>
                <Col sm={11}>
                  <FormControl type="email" name="email" placeholder="e-mail..." value={((email) || '')} onChange={this.handleChange.bind(this)} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={1}>
                  <i className="fal fa-key login-icon" />
                </Col>
                <Col sm={11}>
                  <FormControl type="password" name="password" placeholder="password..." value={((password) || '')} onChange={this.handleChange.bind(this)} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col>
                  <p className="login-error">{this.errorHandler()}</p>
                </Col>
                <Col sm={12} className="col-login">
                  <a className="col-login__btn" onClick={this.handleSubmit.bind(this)}>LOG IN</a>
                </Col>
              </FormGroup>
            </Form>
          </div>

        </div>
        <div className="login-footer">
          @ Education Logistics, Inc.
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authSuccess: state.auth.success,
    authError: state.auth.error,
    loading: state.auth.loading
  };
}

Signin = reduxForm({
  form: 'SigninForm'
})(Signin);

Signin = connect(mapStateToProps, { getAuthUser, resetState })(Signin);

export default Signin;
