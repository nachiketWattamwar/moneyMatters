import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import axios from "axios";

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

let data = [
  { id: 1, title: "Bargain", price: "$19", date: "09-11-19" },
  { id: 2, title: "Safeway", price: "$22", date: "03-10-19" },
  { id: 3, title: "CVS", price: "$22", date: "14-09-19" },
  { id: 4, title: "Costco", price: "$220", date: "1-10-19" }
];

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 1212,
      initialDate: "Fri Dec 06 2019 17:17:00 GMT-0800",
      expenseName: "Default",
      price: 0,
      data: data,
      selectedRows: null,
      toggledClearRows: false
      //updateRows: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.getExpenseName = this.getExpenseName.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.deleteSelectedExpense = this.deleteSelectedExpense.bind(this);
  }

  deleteSelectedExpense() {
    const selectedIds = this.state.selectedRows.map(x => {
      return x.id;
    });

    const newRows = this.state.data.filter(x => {
      if (!selectedIds.includes(x.id)) {
        return x;
      }
    });
    this.setState({
      toggledClearRows: !this.state.toggledClearRows,
      data: newRows
    });

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
    this.setState({
      selectedRows: state.selectedRows
    });
  }

  addExpense() {
    const id = data.length + 1;

    const newExpense = {
      id: id,
      title: this.state.expenseName,
      price: this.state.price,
      date: "12-11-11"
    };

    data.push(newExpense);
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
    return (
      <div class='container-margins'>
        <h3 class='align-center'>Recent Monthly Expense $1212</h3>
        <DataTable
          className='table'
          title='Total Expenses'
          columns={columns}
          data={this.state.data}
          selectableRows
          onRowSelected={this.updateSelected}
          clearSelectedRows={this.state.toggledClearedRows}
          // onSelectedRowsChange={this.state.updateRows}
          customTheme={rowTheme}
          striped
          dense
        />
        <div class='align-center'>
          <br></br>
          <br></br>
          <Fab color='secondary' onClick={this.deleteSelectedExpense}>
            <DeleteRoundedIcon />
          </Fab>
        </div>

        <br />
        <ColoredLine color='blue' />
        <br />

        <div class='align-center'>
          <form noValidate autoComplete='off'>
            <TextField
              margin='normal'
              style={{ margin: 8 }}
              id='outlined-basic'
              label='Expense Name'
              variant='outlined'
              onChange={this.getExpenseName}
            />
            <TextField
              margin='normal'
              style={{ margin: 8 }}
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
        </div>
        <div class='align-center'>
          <br></br>
          <br></br>
          <Fab color='primary' aria-label='add' onClick={this.addExpense}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}
