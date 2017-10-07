import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./App/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import reducers from "./reducers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const store = createStore(reducers, applyMiddleware(thunk));

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
