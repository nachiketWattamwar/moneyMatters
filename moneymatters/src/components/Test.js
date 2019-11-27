import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const data = [
  { id: 1, title: "Bargain", price: "$19", date: "12-12-12" },
  { id: 2, title: "safeywa", price: "$22", date: "12-12-12" }
];
//const data = [{ expense: "bargain", price: "12", date: "12/12/12" }];
const rowTheme = {
  rows: {
    // spaced allows the following properties
    spacing: "spaced",
    spacingBorderRadius: "50px",
    spacingMargin: "3px",
    borderColor: "rgba(0,0,0,.12)",
    backgroundColor: "#c1ebf2",
    height: "55px"
  },
  cells: {
    cellPadding: "48px"
  }
};
const columns = [
  // { title: "Expense", field: "expense" },
  // { title: "Price", field: "price" },
  // { title: "Date", field: "date" }
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Price",
    selector: "price",
    sortable: true,
    right: true
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
    right: true
  }
];

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5
    }}
  />
);

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 1212,
      initialDate: "Mon Nov 07 2019 17:17:00 GMT-0800",
      expenseName: "Bargain",
      price: 12,
      data: data,
      selectedRows: null
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getExpenseName = this.getExpenseName.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.deleteSelectedExpense = this.deleteSelectedExpense.bind(this);
  }

  deleteSelectedExpense() {
    axios
      .post(`http://localhost:3001/deleteExpense`, {
        data: this.state.selectedRows
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  updateSelected(state) {
    console.log("inside updated selected", state);

    this.setState({
      selectedRows: state.selectedRows
    });
  }

  addExpense() {
    const newExpense = {
      date: this.state.initialDate,
      expenseName: this.state.expenseName,
      price: this.state.price
    };

    console.log("inside addexpnse", newExpense);
    axios.post(`http://localhost:3001/newExpense`, { newExpense }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  getPrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  handleDateChange(date) {
    this.setState(state => ({
      initialDate: date
    }));
  }

  getExpenseName(e) {
    this.setState({
      expenseName: e.target.value
    });
  }

  render() {
    console.log("state info is ", this.state);
    return (
      <div>
        <h3>Recent Monthly Expense $1212</h3>
        <DataTable
          className='table'
          title='Total Expenses'
          columns={columns}
          data={data}
          selectableRows
          onRowSelected={this.updateSelected}
          customTheme={rowTheme}
          striped
          dense
        />
        <div>
          <Fab color='secondary' onClick={this.deleteSelectedExpense}>
            <DeleteRoundedIcon />
          </Fab>
        </div>

        <br />
        <ColoredLine color='blue' />
        <br />

        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            label='Expense Name'
            variant='outlined'
            onChange={this.getExpenseName}
          />
          <TextField
            id='outlined-basic'
            label='Price'
            variant='outlined'
            onChange={this.getPrice}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={this.state.initialDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </form>
        <div>
          <Fab color='primary' aria-label='add' onClick={this.addExpense}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}
