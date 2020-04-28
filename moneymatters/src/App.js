import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Test from "./components/Test";
import NewGoals from "./components/FinancingGoals";
import TrackingGoals from "./components/TrackingGoals";
import Goals from "./components/FinancialGoals";
import TrackGoals from "./components/TrackGoals";
import Signup from "./components/Signup";
import DetailFinances from "./components/DetailFinances";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";
//import { createBrowserHistory } from "history";
import Login from "./components/Login";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Login} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/expenses' exact component={Test} />
          <Route path='/goals' exact component={Goals} />
          <Route path='/newgoals' exact component={NewGoals} />
          <Route path='/trackGoals' exact component={TrackGoals} />
          <Route path='/trackingGoals' exact component={TrackingGoals} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/login' exact component={Login} />
          <Route path='/detailFinances' exact component={DetailFinances} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
