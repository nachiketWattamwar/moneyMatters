/* eslint-disable no-script-url */

import React, { Component } from "react";
//import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { getRecentExpensesFive } from "../actions/recentexpense";
import { connect } from "react-redux";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null
    };
  }
  componentDidMount() {
    this.props.getRecentExpensesFive();
  }
  render() {
    const { recentexpense } = this.props;
    let { rows } = this.state;
    rows = recentexpense.recentExpensesFive;
    //console.log("==================", rows);
    if (recentexpense.recentExpensesFive.length > 0) {
      return (
        <React.Fragment>
          <Title>Recent Expenses</Title>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align='right'>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align='right'>$ {row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <Link color='primary' to='/expenses'>
              See more expenses
            </Link>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapStateToProps = state => ({
  recentexpense: state.recentexpense
});
const mapDispatchToProps = dispatch => ({
  getRecentExpensesFive: () => dispatch(getRecentExpensesFive())
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
