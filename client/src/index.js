import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./App/AppContainer";
import registerServiceWorker from "./serviceWorker/registerServiceWorker";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./store";

const Index = () => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router>
          <AppContainer />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
