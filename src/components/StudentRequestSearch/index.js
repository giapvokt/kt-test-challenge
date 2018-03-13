import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, Col, ControlLabel, FormControl, Label, Grid, Row } from 'react-bootstrap';

import { getStudentAccessRequests } from '../../actions/studentRequestActions';

class StudentRequestSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {},
      query: {},
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ search: { ...this.state.search, [e.target.name]: e.target.value } });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleSubmit(e) {
    const { search } = this.state;
    const limit = this.props.paging.elementsInPage;
    this.setState({ query: search });
    if (e) {
      e.preventDefault();
    }
    this.props.getStudentAccessRequests(undefined, limit, search, this.clearForm.bind(this));
  }

  updateSubmit(item) {
    const { query } = this.state;
    delete query[item];
    this.setState({ search: query });
    const limit = this.props.paging.elementsInPage;
    this.props.getStudentAccessRequests(undefined, limit, query, this.clearForm.bind(this));
  }

  clearForm(e) {
    if (e) { e.preventDefault(); }
    this.setState({ search: {}, show: false });
  }

  upperCaseString(st) {
    return st.charAt(0).toUpperCase() + st.slice(1);
  }

  renderQueryFillter() {

  }

  render() {
    const { firstName, lastName, studentDistrictId, status, requesterEmail } = this.state.search;
    return (
      <div>
        <div className="query__filter">
          {this.state.query.status ? <a className="query__filter__item">Request Status: {this.upperCaseString(this.state.query.status)}  <i className="fas fa-times-circle" onClick={this.updateSubmit.bind(this, 'status')} /></a> : null}
          {this.state.query.requesterEmail ? <a className="query__filter__item">Email: {this.state.query.requesterEmail}  <i className="fas fa-times-circle" onClick={this.updateSubmit.bind(this, 'requesterEmail')} /></a> : null}
          {this.state.query.studentDistrictId ? <a className="query__filter__item">Student ID: {this.state.query.studentDistrictId}  <i className="fas fa-times-circle" onClick={this.updateSubmit.bind(this, 'studentDistrictId')} /></a> : null}
          {this.state.query.firstName ? <a className="query__filter__item">Student First Name: {this.state.query.firstName}   <i className="fas fa-times-circle" onClick={this.updateSubmit.bind(this, 'firstName')} /></a> : null}
          {this.state.query.lastName ? <a className="query__filter__item">Student Last Name: {this.state.query.lastName} <i className="fas fa-times-circle" onClick={this.updateSubmit.bind(this, 'lastName')} /></a> : null}
        </div>
        <Button className="btn btn-filter module_grid__btn_filter" onClick={this.handleShow}>
          <i className="far fa-search" /> Filters</Button>

        <div >
          <Modal show={this.state.show} onHide={this.handleClose} bsSize="sm" className="modal-filter" >
            <Modal.Header>
              <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId="formControlsSelect" bsSize="sm">
                  <Col componentClass={ControlLabel} className="form-fillter-label" sm={6}>
										Request Status
                  </Col>
                  <Col sm={6} className="form-fillter-input">
                    <FormControl componentClass="select" placeholder="select" name="status" value={((status) || '')} onChange={this.handleChange}>
                      <option value="">All</option>
                      <option value="approved">Approved</option>
                      <option value="denied">Denied</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="inactive">Inactive</option>
                    </FormControl>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail" bsSize="sm">
                  <Col componentClass={ControlLabel} className="form-fillter-label" sm={6}>
										Email
                  </Col>
                  <Col sm={6} className="form-fillter-input">
                    <FormControl type="email" name="requesterEmail" value={((requesterEmail) || '')} onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStudentID" bsSize="sm">
                  <Col componentClass={ControlLabel} className="form-fillter-label" sm={6}>
										Student ID
                  </Col>
                  <Col sm={6} className="form-fillter-input">
                    <FormControl type="text" name="studentDistrictId" value={((studentDistrictId) || '')} onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStudentFN" bsSize="sm">
                  <Col componentClass={ControlLabel} className="form-fillter-label" sm={6}>
										Student First Name
                  </Col>
                  <Col sm={6} className="form-fillter-input">
                    <FormControl type="text" name="firstName" value={((firstName) || '')} onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalStudentLN" bsSize="sm">
                  <Col componentClass={ControlLabel} className="form-fillter-label" sm={6}>
                    Student Last Name
                  </Col>
                  <Col sm={6} className="form-fillter-input">
                    <FormControl type="text" name="lastName" value={((lastName) || '')} onChange={this.handleChange} />
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer className="ct-modal-footer">
              <Button onClick={this.clearForm} style={{ float: 'left' }}>Cancel</Button>
              <Button onClick={this.handleSubmit} className="btn-filter">Apply Filters</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>


    );
  }
}

function mapStateToProps(state) {
  return {
    paging: state.studentRequests.paging
  };
}

export default connect(mapStateToProps, { getStudentAccessRequests })(StudentRequestSearch);
