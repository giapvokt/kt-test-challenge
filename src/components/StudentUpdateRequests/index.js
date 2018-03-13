import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import StudentUpdateExpanded from '../StudentUpdateExpanded';
import {
  height,
  expandColumnComponent,
  sizePerPageList
} from '../../reactBootstrapTableConfig';
import { createStudentUpdateRequest } from '../../actions/studentUpdateActions';

class StudentUpdateRequest extends React.Component {
  expandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return <StudentUpdateExpanded data={row} {...this.props} />;
  }

  render() {
    const sizePerPageOptions = _.concat(sizePerPageList, [{ text: 'All', value: this.props.studentUpdateRequests.length }]);
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      sizePerPageList: sizePerPageOptions,
    };

    return (
     <div>.</div>
    );
  }
}

export default connect(null, { createStudentUpdateRequest })(StudentUpdateRequest);
