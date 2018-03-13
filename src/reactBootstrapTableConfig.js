import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';


export function tableHeight() { return window.innerHeight - 260; }
export const pageableSizeList = [
  {
    text: '10', value: 10
  }, {
    text: '25', value: 25
  }, {
    text: '50', value: 50
  }, {
    text: '100', value: 100
  }
];
export const dropDownStatuses = ['pending', 'approved', 'rejected', 'denied', 'inactive'];
export const filterStatuses = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  denied: 'denied',
  inactive: 'inactive'
};
export const sizePerPageList = [
  {
    text: '100', value: 100
  }, {
    text: '50', value: 50
  }, {
    text: '25', value: 25
  }
];
export function timeFormat(time) {
  return moment(time).format('MMMM Do YYYY, h:mm:ss a');
}

export function styleStatus(fieldValue) {
  const value = fieldValue.toLowerCase();

  switch (value) {
    case 'pending':
      return 'td-request-pending uppercase';
    case 'approved':
      return 'td-request-approved uppercase';
    case 'rejected':
      return 'td-request-rejected uppercase';
    case 'denied':
      return 'td-request-denied uppercase';
    case 'inactive':
      return 'td-request-inactive uppercase';
    default:
      return '';
  }
}

export function expandColumnComponent({ isExpandableRow, isExpanded }) {
  let content = '';

  if (isExpandableRow) {
    content = isExpanded ? '(-)' : '(+)';
  } else {
    content = ' ';
  }
  return (
    <div>
      {' '}{content}{' '}
    </div>
  );
}

export function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

