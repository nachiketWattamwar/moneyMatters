import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { Link } from "react-router-dom";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }

  render() {
    console.log("email in sidebar ", this.props.email);
    let url = null;
    let reportsUrl = null;
    if (this.props.email == "nikhil@yahoo.co.in") {
      url = "/goals";
      reportsUrl = "/detailFinances";
      console.log("email id is ", this.props.email);
      console.log("url is ", url);
    } else {
      url = "/newgoals";
      reportsUrl = null;
      console.log("email id is ", this.props.email);
      console.log("url is ", url);
    }

    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <ListItem button component={Link} to='/expenses'>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary='Expenses' />
        </ListItem>
        <ListItem button component={Link} to={reportsUrl}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Reports' />
        </ListItem>
        <ListItem button component={Link} to={url}>
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary='Financial Goals' />
        </ListItem>
        <ListItem button component={Link} to='/'>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </div>
    );
  }
}

export default SideBar;
