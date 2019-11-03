import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Dashboard></Dashboard>
    </Provider>
  );
}

export default App;
