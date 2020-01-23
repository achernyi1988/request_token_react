import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import {login, fetchData} from "./redux/action"

import reducers from './redux/reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    {},
    composeEnhancers(
        applyMiddleware(reduxThunk)
    )
);

if(localStorage.UserId){
    console.log("localStorage.UserId");
    store.dispatch( login(localStorage.UserId))
    store.dispatch( fetchData())
}



ReactDOM.render(<Provider store={store}>, <App />,</Provider>, document.getElementById("root"));