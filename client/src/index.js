import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const store = createStore(reducers, applyMiddleware(thunk));
console.log(store.getState());
const app = () => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  );
};

ReactDOM.render(app(), document.getElementById("root"));
registerServiceWorker();
