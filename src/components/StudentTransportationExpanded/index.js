import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStudentTransportationRequest } from '../../actions/studentTransportationActions';
import { timeFormat } from '../../reactBootstrapTableConfig';

class StudentTransportationExpanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.data
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
      this.props.updateStudentTransportationRequest(this.state.request);
    });
  }

  specificDateRequest() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            Trip
            <input
              name="tripType"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.tripType}
              disabled
            />
          </div>
          <div className="col-md-4">
            Schedule
            <input
              name="scheduleType"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.scheduleType}
              disabled
            />
          </div>
          <div className="col-md-4">
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
        </div>
        <div className="row">
          <div className="col-md-4">
            Stop Address
            <input
              name="stopAddress"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.stopAddress}
              disabled
            />
          </div>
          <div className="col-md-4">
						Stop Id
            <input
              name="scheduleId"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.stopId}
              disabled
            />
          </div>
          <div className="col-md-4">
						Date
            <input
              name="Date"
              type="text"
              className="form-control editor edit-text"
              value={timeFormat(this.state.request.specificDate)}
              disabled
            />
          </div>
        </div>
      </div>
    );
  }

  repeatRequest() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            Trip
            <input
              name="tripType"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.tripType}
              disabled
            />
          </div>
          <div className="col-md-4">
            Schedule
            <input
              name="scheduleType"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.scheduleType}
              disabled
            />
          </div>
          <div className="col-md-4">
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
        </div>
        <div className="row">
          <div className="col-md-4">
            Start Date
            <input
              name="Date"
              type="text"
              className="form-control editor edit-text"
              value={timeFormat(this.state.request.startDate)}
              disabled
            />
          </div>
          <div className="col-md-4">
            End Date
            <input
              name="Date"
              type="text"
              className="form-control editor edit-text"
              value={timeFormat(this.state.request.endDate)}
              disabled
            />
          </div>
          <div className="col-md-4">
            Frequency
            <input
              name="stopAddress"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.frequency}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            Stop Address
            <input
              name="stopAddress"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.stopAddress}
              disabled
            />
          </div>
          <div className="col-md-4">
            Stop Id
            <input
              name="scheduleId"
              type="text"
              className="form-control editor edit-text"
              value={this.state.request.stopId}
              disabled
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { scheduleType } = this.props.data;

    return (
      <div>
        {scheduleType == 'Specific Date' ? this.specificDateRequest() : this.repeatRequest()}
      </div>
    );
  }
}

export default connect(null, { updateStudentTransportationRequest })(StudentTransportationExpanded);
