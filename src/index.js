import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import App from "./containers/App";
import userReducer from "./reducers";
import {Provider} from "react-redux";

const root = document.getElementById("root");

const store = createStore(userReducer);

console.log(store.getState());
store.subscribe(
    ()=>console.log(store.getState())
 );

ReactDOM.render(
   <Provider store={store}>
       <App />
   </Provider>,
    root
);