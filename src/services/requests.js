import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getStudentAccessRequests } from '../actions/studentRequestActions';
import { getStudentUpdateRequests } from '../actions/studentUpdateActions';
import { getStudentTransportationRequests } from '../actions/studentTransportationActions';
import StudentAccessRequest from '../components/StudentAccessRequest';
import StudentUpdateRequest from '../components/StudentUpdateRequests';
import StudentTransportationRequest from '../components/StudentTransportationRequest';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: 'Student Access Requests',
      css: {
        selected: 'selected'
      }
    };
  }

  componentWillMount() {
    this.showStudentAccessRequests();
  }

  showStudentAccessRequests() {
    this.setState({ requestType: 'Student Access Requests' });
    this.props.getStudentAccessRequests();
  }

  showStudentTransportationRequests() {
    this.setState({ requestType: 'Student Transportation Requests' });
    this.props.getStudentTransportationRequests();
  }

  showStudentUpdateRequests() {
    this.setState({ requestType: 'Student Update Requests' });
    this.props.getStudentUpdateRequests();
  }

  renderRequests() {
    if (this.state.requestType === 'Student Access Requests') {
      return <StudentAccessRequest {...this.props} />;
    } else if (this.state.requestType === 'Student Transportation Requests') {
      return <StudentTransportationRequest {...this.props} />;
    } else if (this.state.requestType === 'Student Update Requests') {
      return <StudentUpdateRequest {...this.props} />;
    }
  }

  render() {
    return (

      <div className="request-table-wrapper">
        {this.renderRequests()}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    studentAccessRequests: state.studentRequests.accessRequests,
    studentUpdateRequests: state.studentUpdate.updateRequests,
    studentTransportationRequests: state.studentTransportation.transportationRequests
  };
}

export default connect(mapStateToProps, {
  getStudentAccessRequests,
  getStudentTransportationRequests,
  getStudentUpdateRequests
})(Requests);
