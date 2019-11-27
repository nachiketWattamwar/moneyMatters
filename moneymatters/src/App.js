import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Test from "./components/Test";
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
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
