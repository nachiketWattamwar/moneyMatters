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

// Generate Order Data
function createData(id, date, name, paymentMethod, amount) {
  return { id, date, name, paymentMethod, amount };
}

// const useStyles = theme => ({
//   seeMore: {
//     marginTop: 10
//   }
// });

const rows = [
  createData(0, "16 Mar, 2019", "Costco", "VISA ⠀•••• 3719", 312.44),
  createData(1, "16 Mar, 2019", "PG&E", "VISA ⠀•••• 2574", 866.99),
  createData(2, "16 Mar, 2019", "Gas", "MC ⠀•••• 1253", 100.81),
  createData(3, "16 Mar, 2019", "Medical Bills", "AMEX ⠀•••• 2000", 654.39),
  createData(4, "15 Mar, 2019", "Pet", "VISA ⠀•••• 5919", 212.79)
];

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(" nachiket");
    this.props.getRecentExpensesFive();
  }
  render() {
    // const { classes } = this.props;
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
        {/* className={classes.seeMore} */}
        <div>
          <Link color='primary' to='/expenses'>
            See more expenses
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  recentexpense: state.recentexpense
});
const mapDispatchToProps = dispatch => ({
  getRecentExpensesFive: () => dispatch(getRecentExpensesFive())
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
