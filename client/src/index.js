import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import login from './store/reducers/login';
import getPlayers from './store/reducers/getPlayers';
import getGroups from './store/reducers/getGroups';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    login, getPlayers, getGroups
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

