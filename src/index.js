import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import App from "./containers/App";
import userReducer from "./reducers";
import * as actionCreator from "./actions";

const root = document.getElementById("root");

const store = createStore(userReducer);

console.log(store.getState());
store.subscribe(
    ()=>console.log(store.getState())
 );

ReactDOM.render(
    <App 
        store={store} 
        load={actionCreator.load}
        handlerButtonClickAdd={actionCreator.handlerButtonClickAdd}
        handlerButtonClickUpdate={actionCreator.handlerButtonClickUpdate}
    />,
    root
);