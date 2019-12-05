import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Test from "./components/Test";
import Goals from "./components/Goals";
import DetailFinances from "./components/DetailFinances";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Dashboard} />
          <Route path='/expenses' exact component={Test} />
          <Route path='/goals' exact component={Goals} />
          <Route path='/detailFinances' exact component={DetailFinances} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
