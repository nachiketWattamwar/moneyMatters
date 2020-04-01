import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "../scss/_mystyles.scss";

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
      date: "Fri Dec 06 2019 17:17:00 GMT-0800",
      expenseType: "Default",
      categoryType: "",
      description: "",
      price: 0,
      data: data,
      selectedRows: null,
      toggledClearRows: false
      //updateRows: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.getExpenseType = this.getExpenseType.bind(this);
    this.getPaymentType = this.getPaymentType.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getCategoryType = this.getCategoryType.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.deleteSelectedExpense = this.deleteSelectedExpense.bind(this);
  }
  getDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  getCategoryType(e) {
    this.setState({
      categoryType: e.target.value
    });
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
      expenseType: this.state.expenseType,
      price: this.state.price,
      description: this.state.description,
      categoryType: this.state.categoryType,
      date: this.state.date
    };

    data.push(newExpense);
    console.log("datapush ", newExpense);
    axios.post(`http://localhost:3001/newExpense`, { newExpense }).then(res => {
      console.log(res);
      console.log("===================", res.data);
    });
  }

  getPrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  handleDateChange(date) {
    this.setState(state => ({
      date: date
    }));
  }

  getPaymentType(e) {
    this.setState({
      getPaymentType: e.target.value
    });
  }

  getExpenseType(e) {
    this.setState({
      expenseType: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' className='title'>
                Total Expenses
              </Typography>
              {/* <Button color='inherit'>Login</Button> */}
            </Toolbar>
          </AppBar>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={10} className='paper'>
              <div className='totalExpensesTable'>
                <DataTable
                  className='table'
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
              </div>
              <div>
                <br></br>
                <br></br>
                <Fab color='secondary' onClick={this.deleteSelectedExpense}>
                  <DeleteRoundedIcon />
                </Fab>
              </div>
            </Paper>
          </Grid>

          <div className='parentGrid'>
            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='flex-start'
              spacing={1}
            >
              <Paper elevation={10} className='paper'>
                <Grid item xs>
                  <Paper className='paper'>
                    <Select
                      fullWidth={true}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      onChange={this.getCategoryType}
                    >
                      <MenuItem value={"bills"}>Bills</MenuItem>
                      <MenuItem value={"food"}>Food</MenuItem>
                      <MenuItem value={"rent"}>Rent</MenuItem>
                    </Select>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className='paper'>
                    <TextField
                      margin='normal'
                      style={{ margin: 8 }}
                      id='outlined-basic'
                      label='Description'
                      variant='outlined'
                      onChange={this.getDescription}
                    />
                  </Paper>
                </Grid>

                <Grid item xs>
                  <Paper className='paper'>
                    <TextField
                      margin='normal'
                      style={{ margin: 8 }}
                      id='outlined-basic'
                      label='Price'
                      variant='outlined'
                      onChange={this.getPrice}
                    />
                  </Paper>
                </Grid>

                <Grid item xs>
                  <Paper className='paper'>
                    <TextField
                      margin='normal'
                      style={{ margin: 8 }}
                      id='outlined-basic'
                      label='Expense Type'
                      variant='outlined'
                      onChange={this.getExpenseType}
                    />
                  </Paper>
                </Grid>

                <Grid item xs>
                  <Paper className='paper'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        value={Date.now()}
                        onChange={this.handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Paper>
                </Grid>
                <div className='addButtonCSS'>
                  <Fab
                    color='primary'
                    aria-label='add'
                    onClick={this.addExpense}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </Paper>
            </Grid>
          </div>
        </Grid>
      </div>
    );
  }
}
