import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

const app = () => {
	return (
		<Provider>
			<App />
		</Provider>
	);
};

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
