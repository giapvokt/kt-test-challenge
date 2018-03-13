import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { tableHeight, sizePerPageList, expandColumnComponent, styleStatus, filterStatuses } from '../../reactBootstrapTableConfig';
import StudentTransportationExpanded from '../StudentTransportationExpanded';

export default class StudentTransportationRequest extends Component {
  expandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return <StudentTransportationExpanded data={row} {...this.props} />;
  }

  render() {
    let sizePerPageOptions = _.concat(sizePerPageList, [{ text: 'All', value: this.props.studentTransportationRequests.length }]);
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
      sizePerPageList: sizePerPageOptions
    };

    return (
      <BootstrapTable
        data={this.props.studentTransportationRequests}
        options={options}
        height={tableHeight}
        expandableRow={this.expandableRow.bind(this)}
        expandComponent={this.expandComponent.bind(this)}
        expandColumnOptions={{
          expandColumnVisible: true,
          expandColumnComponent,
          columnWidth: 50
        }}
        search
        pagination
      >
        <TableHeaderColumn dataField="id" hidden isKey>
          Request Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="firstName">
          First Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="lastName">
          Last Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="studentId">
          Student Id
        </TableHeaderColumn>
        <TableHeaderColumn
          hiddenOnInsert
          dataField="status"
          filterFormatted
          columnClassName={styleStatus}
          dataSort
          filter={{
            type: 'SelectFilter',
            condition: 'eq',
            options: filterStatuses,
            defaultValue: null
          }}
        >
          Status
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
