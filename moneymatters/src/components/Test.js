import React, { Component } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import MaterialTable from "material-table";
import "../scss/_mystyles.scss";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { connect } from "react-redux";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const columns = [
  //{ title: "id", field: "id" },
  { title: "Description", field: "Description", type: "string" },
  { title: "Category (Bill,Rent,Food)", field: "Category", type: "string" },
  { title: "ExpenseType", field: "ExpenseType", type: "string" },
  { title: "Amount (in $)", field: "Amount", type: "numeric" },
  { title: "Date", field: "Date", type: "date" },
];

let data = [
  {
    id: "1",
    Description: "Costco Co.",
    Amount: 19,
    Category: "Food",
    ExpenseType: "temp",
    Date: "16 Mar, 2019",
  },
  {
    id: "2",
    Description: "PG&E",
    Amount: 22,
    Category: "Bill",
    ExpenseType: "temp",
    Date: "16 Mar, 2019",
  },
  {
    id: "3",
    Description: "Gas",
    Amount: 21,
    Category: "Bill",
    ExpenseType: "temp",
    Date: "16 Mar, 2019",
  },
  {
    id: "4",
    Description: "Medical Bills",
    Amount: 223,
    Category: "Bill",
    ExpenseType: "temp",
    Date: "16 Mar, 2019",
  },
];

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 1212,
      date: "Fri Dec 06 2019 17:17:00 GMT-0800",
      expenseType: "Default",
      categoryType: "",
      description: "",
      price: 0,
      data: data, //pull from backend
      columns: columns,
      email: null,
    };
  }

  render() {
    console.log("redux info ", this.props.email.email);

    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' className='title'>
                Expenses
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={10} className='paper'>
              <div className='totalExpensesTable'>
                <MaterialTable
                  icons={tableIcons}
                  title='Recent Expenses'
                  columns={this.state.columns}
                  data={this.state.data}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          //newData.id = this.state.data.length + 1;
                          // let temp = this.state.data.concat(newData);
                          // this.setState({
                          //   data: temp,
                          // });
                          //call to the backend

                          const expenseData = {
                            email: this.props.email.email, //done
                            description: newData.Description, // done
                            category: newData.Category, //done
                            amount: newData.Amount, //done
                            timestamp: newData.Date, //done
                            expenseType: newData.ExpenseType, //done
                          };
                          axios
                            .post(`http://localhost:3001/expenses`, expenseData)
                            .then((res) => {
                              //console.log("after axios call ", res.data);
                              newData.id = res.data._id;
                              let temp = this.state.data.concat(newData);
                              this.setState({
                                data: temp,
                              });
                            });
                        }, 600);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          let id = oldData.id;
                          let dataCopy = this.state.data;
                          let temp = dataCopy.map((obj) =>
                            obj.id == id ? newData : obj
                          );
                          this.setState({
                            data: temp,
                          });

                          const expenseData = {
                            description: newData.Description, // done
                            category: newData.Category, //done
                            amount: newData.Amount, //done

                            expenseType: newData.ExpenseType, //done
                          };
                          axios
                            .patch(
                              `http://localhost:3001/expenses/${oldData.id}`,
                              expenseData
                            )
                            .then((res) => {
                              console.log("after axios call  update", res.data);
                            });
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();

                          let temp = this.state.data;
                          temp = temp.filter((d) => d.id !== oldData.id);

                          this.setState({
                            data: temp,
                          });
                          //call to the backend
                          axios
                            .delete(
                              `http://localhost:3001/expenses/${oldData.id}`
                            )
                            .then((res) => {
                              //console.log("after axios call ", res.data);
                            });
                        }, 600);
                      }),
                  }}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.storeemail,
});

export default connect(mapStateToProps)(Test);
