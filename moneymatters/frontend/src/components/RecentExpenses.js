/* eslint-disable no-script-url */
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
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
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
  { title: "Description", field: "description", type: "string" },
  { title: "Category (Bill,Rent,Food)", field: "category", type: "string" },
  { title: "ExpenseType", field: "expenseType", type: "string" },
  { title: "Amount (in $)", field: "amount", type: "numeric" },
  { title: "Date", field: "timestamp", type: "date" },
];

class Orders extends Component {
  constructor(props) {
    super(props);
    console.log("inside recentExp ", this.props);
    this.state = {
      rows: null,
      columns: columns,
    };
  }
  componentWillMount() {
    const expenseData = {
      email: this.props.email.email, //done
    };
    //console.log("========inside cdm ", expenseData);
    axios.post(`http://localhost:4000/allexpenses`, expenseData).then((res) => {
      //newData.id = res.data._id;
      //let temp = this.state.data.concat(newData);
      const sortedData = res.data.reverse();

      this.setState({
        data: sortedData,
      });

      //console.log("=====", sortedData);
    });
  }
  render() {
    return (
      <React.Fragment>
        <MaterialTable
          icons={tableIcons}
          title='Recent Expenses'
          columns={this.state.columns}
          data={this.state.data}
          sort
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
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
                    .post(`http://localhost:4000/expenses`, expenseData)
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
                      `http://localhost:4000/expenses/${oldData.id}`,
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
                    .delete(`http://localhost:4000/expenses/${oldData.id}`)
                    .then((res) => {
                      //console.log("after axios call ", res.data);
                    });
                }, 600);
              }),
          }}
        />

        <div>
          <Link color='primary' to='/expenses'>
            See more expenses
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.storeemail,
// });
// const mapDispatchToProps = (dispatch) => ({
//   getRecentExpensesFive: () => dispatch(getRecentExpensesFive()),
// });
//export default connect(mapStateToProps)(Orders);
export default Orders;
