import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStudentUpdateRequest } from '../../actions/studentUpdateActions';
import { timeFormat } from '../../reactBootstrapTableConfig';

class StudentUpdateExpanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.data,
      disabled: true
    };
  }

  onChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    const stateChange = {
      ...this.state.request,
      [name]: value
    };

    this.setState({ request: stateChange }, () => {
      const disabled = JSON.stringify(this.state.request) === JSON.stringify(this.props.data);

      this.setState({ disabled });
    });
  }

  onSave() {
    this.props.updateStudentUpdateRequest(this.state.request);
    this.setState({ disabled: true });
  }

  onCancel() {
    // do stuff
    this.setState({ request: this.props.data, disabled: true });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div> First Name </div>
          <input
            name="firstName"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.firstName}
            onChange={this.onChange.bind(this)}
          />
          <div>DOB</div>
          <input
            name="dob"
            type="text"
            className="form-control editor edit-text"
            value={timeFormat(this.state.request.dob)}
            onChange={this.onChange.bind(this)}
          />
          <div>Address</div>
          <input
            name="address"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.address}
            onChange={this.onChange.bind(this)}
          />
          <div>Zip Code</div>
          <input
            name="zip"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.zip}
            onChange={this.onChange.bind(this)}
          />
          <div>Submitted</div>
          <input
            name="submitted"
            type="text"
            className="form-control editor edit-text"
            value={timeFormat(this.state.request.submitted)}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="col-md-4">
          <div> Middle Name </div>
          <input
            name="middleName"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.middleName}
            onChange={this.onChange.bind(this)}
          />
          <div>Student Id</div>
          <input
            name="studentId"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.studentId}
            onChange={this.onChange.bind(this)}
          />
          <div>City</div>
          <input
            name="city"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.city}
            onChange={this.onChange.bind(this)}
          />
          <div>Status Comment</div>
          <textarea
            name="comment"
            className="form-control editor edit-text"
            rows="4 "
            cols="42"
            value={this.state.request.comment}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="col-md-4">
          <div> Last Name </div>
          <input
            name="lastName"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.lastName}
            onChange={this.onChange.bind(this)}
          />
          <div> Parent Name </div>
          <input
            name="parent"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.parent}
            onChange={this.onChange.bind(this)}
          />
          <div> State </div>
          <input
            name="state"
            type="text"
            className="form-control editor edit-text"
            value={this.state.request.state}
            onChange={this.onChange.bind(this)}
          />
          <div className="row">
            <div className="col-md-6">
              <div> Status </div>
              <select
                name="status"
                onChange={this.onChange.bind(this)}
                value={this.state.request.status}
                className={
                  'filter select-filter form-control placeholder-selected'
                }
              >
                <option value="pending" className="td-request-none">
                  pending
                </option>
                <option value="approved" className="td-request-none">
                  approved
                </option>
                <option value="rejected" className="td-request-none">
                  rejected
                </option>
                <option value="denied" className="td-request-none">
                  denied
                </option>
                <option value="inactive" className="td-request-none">
                  inactive
                </option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="expanded-btn-wrapper">
                <button
                  onClick={this.onSave.bind(this)}
                  disabled={this.state.disabled}
                  className="btn-success expanded-btn"
                >
                  Save
                </button>
                <button
                  onClick={this.onCancel.bind(this)}
                  disabled={this.state.disabled}
                  className="btn-warning expanded-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateStudentUpdateRequest })(StudentUpdateExpanded);
