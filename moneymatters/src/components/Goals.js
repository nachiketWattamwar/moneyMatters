import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns"; 
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import axios from "axios";
import styles from "../prototype.css";

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
    name: "Amount",
    selector: "amount",
    sortable: true,
    right: true
  },
  {

    name: "Deadline",
    selector: "deadline",
    sortable: true,
    right: true
  },
  {
    name: "Category",
    selector: "category",
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
  { id: 1, title: "Save for buying a house", amount: "$100,000", deadline: "05-25-2020", category: "Housing" },
  { id: 2, title: "John's college fund", amount: "$80,000", deadline: "05-25-2035", category: "Education" }
];

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 1212,
      initialDate: "Mon Nov 08 2019 17:17:00 GMT-0800",
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
    console.log("inside deleteSeelceted expense", this.state.selectedRows);
    const selectedIds = this.state.selectedRows.map(x => {
      return x.id;
    });

    const newRows = this.state.data.filter(x => {
      if (!selectedIds.includes(x.id)) {
        console.log("inside if ", selectedIds);
        return x;
      }
    });
    console.log("temp is ", newRows);
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
    console.log("inside updated selected", state);

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
    console.log("data is ", data);
    // this.setState({
    //   updateRows: !this.state.updateRows,
    //   data: data
    // });
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
    console.log("state info is ", this.state.data);

    return (
      <div class="container-margins">
        <h3 class="align-center">View Your Current Goals</h3>
        <DataTable

          className='table'
          title='Saved Goals'
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
        <div class="align-center">
          <br></br>
          <br></br>
          <Fab color='secondary' onClick={this.deleteSelectedExpense}>
            <DeleteRoundedIcon />
          </Fab>
        </div>

        <br />
        <ColoredLine color='blue' />
        <br />

        <div class="align-center">
            <form  noValidate autoComplete='off'>
              <TextField
                margin="normal"
                style={{ margin: 8 }}
                id='outlined-basic'
                label='Title'
                variant='outlined'
                onChange={this.getExpenseName}
              />  

              <TextField
                margin="normal"
                style={{ margin: 8 }}
                id='outlined-basic'
                label='Amount'
                variant='outlined'
                onChange={this.getPrice}
              />
              <TextField
                margin="normal"
                style={{ margin: 8 }}
                id='outlined-basic'
                label='Deadline'
                variant='outlined'
                onChange={this.getPrice}
              />
              <TextField
                margin="normal"
                style={{ margin: 8 }}
                id='outlined-basic'
                label='Category'
                variant='outlined'
                onChange={this.getPrice}
              />
            </form>
        </div>
        <div class="align-center">
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
