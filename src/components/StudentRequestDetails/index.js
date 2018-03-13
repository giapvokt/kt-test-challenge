import React, { Component } from 'react';
import moment from 'moment';

export default class StudentRequestDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestDetails: this.props.data
    };
  }

  render() {
    const { requestDetails } = this.state;

    return (
      <div className="school-details">
        <div className="row">
          <div className="col-md-6">
            <div> First Name </div>
            <input
              name="firstName"
              type="text"
              readOnly
              value={((requestDetails.firstName) ? requestDetails.firstName : '')}
            />
          </div>
          <div className="col-md-6">
            <div> Last Name </div>
            <input
              name="lastName"
              type="text"
              readOnly
              value={((requestDetails.lastName) ? requestDetails.lastName : '')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div> DOB </div>
            <input
              name="dob"
              type="text"
              readOnly
              value={((requestDetails.dob) ? moment(requestDetails.dob).format('MM/DD/YYYY') : '')}
            />
          </div>
          <div className="col-md-3">
            <div> Submitted </div>
            <input
              name="submitted"
              type="text"
              readOnly
              value={((requestDetails.createdAt) ? moment(requestDetails.createdAt).format('MM/DD/YYYY') : '')}
            />
          </div>
          <div className="col-md-3">
            <div> User </div>
            <input
              name="agent"
              type="text"
              readOnly
              value={((requestDetails.agent) ? requestDetails.agent : '')}
            />
          </div>
        </div>
      </div>
    );
  }
}
