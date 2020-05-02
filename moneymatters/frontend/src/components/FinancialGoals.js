import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
//import "../scss/_mystyles.scss";
import { forwardRef } from "react";

import { URL } from "../config/config";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
//import TrackChangesIcon from "@material-ui/icons/TrackChanges";
//import ShowChartIcon from "@material-ui/icons/ShowChart";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { createBrowserHistory } from "history";
import axios from "axios";

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

const title = {
  flexGrow: "1",
};

const paper = {
  padding: "5px",
  margin: "20px",
};

const columns = [
  //{ title: "id", field: "id" },
  { title: "Name", field: "Name" },
  { title: "Amount", field: "Amount" },
  { title: "Savings %", field: "Share" },
  { title: "Start Date", field: "EndDate" },
  { title: "End Date", field: "StartDate" },
];

let data = [
  {
    id: "1",
    Name: "Retirement Fund",
    Amount: "$100,000",
    Share: "10",
    StartDate: "1 Mar, 2020",
    EndDate: "1 Mar, 2055",
  },
  {
    id: "2",
    Name: "Savings for house",
    Amount: "$200,000",
    Share: "60",
    StartDate: "1 Mar, 2020",
    EndDate: "10 Mar, 2022",
  },
];

export default class FinancialGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      columns: columns,
    };
  }
  componentDidMount() {
    axios.post(`http://${URL}/allgoals`).then((res) => {
      this.setState({
        data: null,
      });
      console.log("inside goals CDM", this.state);
    });
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' style={title}>
                Financial Goals
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={10} style={paper}>
              <div>
                <MaterialTable
                  icons={tableIcons}
                  actions={[
                    {
                      icon: () => <TrendingUpIcon />,
                      tooltip: "Track Progress",

                      onClick: (event, rowData) =>
                        this.props.history.push({
                          pathname: "/trackGoals",
                          search: "?goalId=" + rowData.id,
                        }),
                    },
                  ]}
                  title='Goals set by you'
                  columns={this.state.columns}
                  data={this.state.data}
                  editable={{
                    onRowTrack: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          newData.id = this.state.data.length + 1;
                          let temp = this.state.data.concat(newData);
                          this.setState({
                            data: temp,
                          });
                          //call to the backend
                        }, 600);
                      }),
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          newData.id = this.state.data.length + 1;
                          let temp = this.state.data.concat(newData);
                          this.setState({
                            data: temp,
                          });
                          //call to the backend
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
                          //call to the backend
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          console.log("inside delete", oldData);
                          let temp = this.state.data;
                          temp = temp.filter((d) => d.id !== oldData.id);
                          console.log("newData ", temp);
                          this.setState({
                            data: temp,
                          });
                          //call to the backend
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
