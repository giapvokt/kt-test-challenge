import Pagination from 'react-js-pagination';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { updateStudentAccessRequest, createStudentAccessRequest, getStudentAccessRequests, sortRequests } from '../../actions/studentRequestActions';
import { tableHeight, styleStatus } from '../../reactBootstrapTableConfig';

import StudentRequestSearch from '../StudentRequestSearch';
import StudentRequestDetailsComponent from '../StudentRequestDetails';
import CustomToggle from '../CustomToggleDropdown';


class StudentAccessRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: tableHeight(),
      options: {
        expandRowBgColor: 'rgb(215, 244, 245)',
        onSortChange: this.onSortChange.bind(this),
      }
    };
    this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectLimitPage = this.handleSelectLimitPage.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatDateTime = this.formatDateTime.bind(this);
    this.dropDownStatus = this.dropDownStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    this._updateDropupSortingIcon();
    this._updateDropdownSortingIcon();
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    if ((!row[cellName] && !cellValue) || (row[cellName] == cellValue)) {
      return false;
    }
    const accessRequest = { ...row, agent: 'ADMIN', [cellName]: cellValue };
    this.props.updateStudentAccessRequest(accessRequest);
    return false;
  }


  onPageChange(currentPerPage, page, perPage) {
    const limit = perPage;

    if (currentPerPage !== perPage) {
      page = 1;
    }

    this.props.getStudentAccessRequests(page, limit, this.props.querySearch);
  }

  onSortChange(sortName, sortOrder) {
    this.props.sortRequests(sortName, sortOrder);
    this.setState({
      sortName,
      sortOrder
    });
  }

  cellTooltip(cell, row) {
    return <div className="requester-div" title={cell}>{cell}</div>;
  }
  handlePageChange(page) {
    this.setState({ activePage: page });
    const limit = this.props.paging.elementsInPage;
    this.props.getStudentAccessRequests(page, limit, this.props.querySearch);
  }

  handleSelectLimitPage(newElementsInPage, event) {
    const { elementsInPage, currentPage } = this.props.paging;
    this.onPageChange(elementsInPage, currentPage, newElementsInPage);
  }

  handleSelectedStatus(eventKey, event, row) {
    console.log(eventKey, event, row);
    if (row.status !== eventKey) {
      const accessRequest = { ...row, agent: 'ADMIN', status: eventKey.toLowerCase() };
      this.props.updateStudentAccessRequest(accessRequest);
    }
  }

  handleClickOnDropDown(e) {
    const ele = $(e.currentTarget);
    const offset = ele.offset().top - ele.parent().parent().parent().offset().top;
    const heightOfDopdown = 170;
    if (offset > heightOfDopdown) {
      console.log(offset);
      console.log(ele.offset());
      console.log(ele.parent().parent().parent().offset());
    }
  }

  dropDownStatus(cell, row) {
    return (
      <Dropdown id="dropdown-custom-menu" className="ct-drop-group" onClick={(event => this.handleClickOnDropDown(event))} onSelect={(eventKey, event) => this.handleSelectedStatus(eventKey, event, row)}>
        <CustomToggle className={styleStatus(cell)} bsRole="toggle">{cell.charAt(0).toUpperCase() + cell.slice(1)}</CustomToggle>
        <Dropdown.Menu bsRole="menu">
          <MenuItem eventKey="approved"><p className={styleStatus('approved')}>Approved</p></MenuItem>
          <MenuItem eventKey="denied"><p className={styleStatus('denied')}>Denied</p></MenuItem>
          <MenuItem eventKey="pending"><p className={styleStatus('pending')}>Pending</p></MenuItem>
          <MenuItem eventKey="rejected"><p className={styleStatus('rejected')}>Rejected</p></MenuItem>
          <MenuItem eventKey="inactive"><p className={styleStatus('inactive')}>Inactive</p></MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  expandComponent(row) {
    return <StudentRequestDetailsComponent data={row} {...this.props} />;
  }
  expandableRow(row) {
    return true;
  }

  formatDateTime(cell, row) {
    return moment(cell).format('MM/DD/YYYY hh:mm A');
  }

  formatTime(cell, row) {
    return moment(cell).format('MM/DD/YYYY');
  }
  _updateDropupSortingIcon() {
    const upElements = ReactDOM.findDOMNode(this.tableInputRef).getElementsByClassName('order');
    _.each(upElements, (orderElement) => {
      if (orderElement.getElementsByClassName('dropup').length > 0) {
        const dropupElement = orderElement.getElementsByClassName('dropup')[0];
        if (!dropupElement.classList.contains('order')) {
          if (dropupElement.firstChild != undefined && dropupElement.firstChild.classList != undefined) {
            dropupElement.firstChild.classList.remove('caret');
            if (!dropupElement.firstChild.classList.contains('far')) {
              dropupElement.firstChild.classList.add('far');
            }
            if (!dropupElement.firstChild.classList.contains('fa-sort-up')) {
              dropupElement.firstChild.classList.add('fa-sort-up');
            }
          }
          if (!dropupElement.classList.contains('table-sorting-dropup-icon')) {
            dropupElement.classList.add('table-sorting-dropup-icon');
          }
        }
      }
      if (orderElement.firstChild.classList.contains('caret')) {
        if (!orderElement.firstChild.classList.contains('table-sorting-clean-caret')) {
          orderElement.firstChild.classList.add('table-sorting-clean-caret');
        }
      }
    });
  }

  updateDimensions() {
    let { paginationSize } = this.state.options;

    paginationSize = ((window.outerWidth >= 800) ? 3 : 1);

    const state = {
      ...this.state,
      height: tableHeight(),
      options: {
        ...this.state.options,
        paginationSize
      }
    };

    this.setState(state);
  }

  _updateDropdownSortingIcon() {
    const downElements = ReactDOM.findDOMNode(this.tableInputRef).getElementsByClassName('order');
    _.each(downElements, (orderElement) => {
      if (orderElement.getElementsByClassName('dropdown').length > 0) {
        const dropdownElement = orderElement.getElementsByClassName('dropdown')[0];
        if (dropdownElement.firstChild != undefined && dropdownElement.firstChild.classList != undefined) {
          dropdownElement.firstChild.classList.remove('caret');
          if (!dropdownElement.firstChild.classList.contains('far')) {
            dropdownElement.firstChild.classList.add('far');
          }
          if (!dropdownElement.firstChild.classList.contains('fa-sort-down')) {
            dropdownElement.firstChild.classList.add('fa-sort-down');
          }
        }
        if (!dropdownElement.classList.contains('table-sorting-dropdown-icon')) {
          dropdownElement.classList.add('table-sorting-dropdown-icon');
        }
      }
      if (orderElement.firstChild.classList.contains('caret')) {
        if (!orderElement.firstChild.classList.contains('table-sorting-clean-caret')) {
          orderElement.firstChild.classList.add('table-sorting-clean-caret');
        }
      }
    });
  }


  render() {
    const { paging } = this.props;
    const { height, activePage } = this.state;
    const myOptions = {
      expandRowBgColor: 'rgb(215, 244, 245)',
      onSortChange: this.onSortChange.bind(this),
      defaultSortName: 'createdAt',
      defaultSortOrder: 'desc',
      sortName: 'createdAt',
      sortOrder: 'desc'
    };

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell,
    };

    return (

      <div className="module-container">
        <Grid className="module_grid">
          <Row>
            <Col>
              <StudentRequestSearch />
            </Col>
          </Row>
        </Grid>
        <div>
          <div className="main-module_tableview">
            <BootstrapTable
              ref={(input) => { this.tableInputRef = input; }}
              data={this.props.studentAccessRequests}
              cellEdit={cellEditProp}
              options={myOptions}
              tableHeaderClass="table-header"
              tableBodyClass="table-body"
              className="table-list"
              height={height}
              remote
              striped
              hover
              condensed
              fetchInfo={{ dataTotalSize: paging.totalElements }}
              onSortChange={this.props.onSortChange}
            >
              <TableHeaderColumn dataField="id" hiddenOnInsert isKey hidden editable={false} >
                Request Id
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort
                width="150"
                dataField="status"
                hiddenOnInsert
                columnClassName={styleStatus}
                editable={false}
                // editable={{ type: 'select', options: { values: dropDownStatuses } }}
                dataFormat={this.dropDownStatus}
                className="table-header-col-status"
              >
              Request Status
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataFormat={this.formatDateTime} dataField="createdAt" hiddenOnInsert editable={false} dataSort columnClassName="table-body-cols" >Date Submitted</TableHeaderColumn>
              <TableHeaderColumn width="170" dataField="requesterEmail" hiddenOnInsert editable={false} dataSort dataFormat={this.cellTooltip} columnClassName="table-body-cols">Requester</TableHeaderColumn>
              <TableHeaderColumn width="130" dataField="studentDistrictId" editable={false} columnClassName="table-body-cols">
                Student ID
              </TableHeaderColumn>
              <TableHeaderColumn dataSort dataField="firstName" editable={false} hiddenOnInsert columnClassName="table-body-cols">
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn dataSort dataField="lastName" editable={false} hiddenOnInsert columnClassName="table-body-cols">
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn width="170" dataSort dataField="dob" editable={false} hiddenOnInsert dataFormat={this.formatTime} width="100" columnClassName="table-body-cols">DOB</TableHeaderColumn>
              <TableHeaderColumn
                dataField="statusNotes"
                editable={{ type: 'textarea' }}
                editColumnClassName="editing-jobsname-class"
                dataFormat={this.cellTooltip}
                hiddenOnInsert
                columnClassName="table-body-cols"
              >
                Notes
              </TableHeaderColumn>
              <TableHeaderColumn dataField="agent" editable={false} width="100" columnClassName="table-body-cols">User</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>

        <div className="paging-container">
          <div className="paging-container__limit-record">
            <DropdownButton
              dropup
              title={paging.elementsInPage}
              key="Default"
              id={'dropdown-basic-Default'}
              onSelect={this.handleSelectLimitPage}
            >
              <MenuItem eventKey="25">25</MenuItem>
              <MenuItem eventKey="50">50</MenuItem>
              <MenuItem eventKey="100">100</MenuItem>
            </DropdownButton>
          </div>


          <Pagination
            ref={(input) => { this.pagingInputRef = input; }}
            activePage={paging.currentPage}
            itemsCountPerPage={paging.elementsInPage}
            totalItemsCount={paging.totalElements}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
            linkClassPrev="fal fa-angle-left"
            linkClassNext="fal fa-angle-right"
            linkClassFirst="fal fa-angle-double-left"
            linkClassLast="fal fa-angle-double-right"
            prevPageText=""
            nextPageText=""
            firstPageText=""
            lastPageText=""
          />
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paging: state.studentRequests.paging,
    querySearch: state.studentRequests.querySearch,
    sort: state.studentRequests.sort
  };
}

export default connect(mapStateToProps,
  { updateStudentAccessRequest,
    createStudentAccessRequest,
    getStudentAccessRequests,
    sortRequests })(StudentAccessRequest);

