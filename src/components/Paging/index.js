import React from 'react';
import ReactLoading from 'react-loading';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.activePage,
      itemsCountPerPage: props.elementsInPage,
      totalItemsCount: props.totalElements,
      pageRangeDisplayed: props.pageRangeDisplayed,
      onChange: props.handlePageChange
    };
  }

  render() {
    return (
      <div>
        <Button ><i className="fas fa-angle-double-left" /></Button>
        <Button ><i className="fas fa-angle-left" /></Button>
        <a>1-25</a>
        <a> Of 500</a>
        <Button ><i className="fas fa-angle-double-right" /></Button>
        <Button ><i className="fas fa-angle-right" /></Button>
      </div>
    );
  }
}

export default Paging;
