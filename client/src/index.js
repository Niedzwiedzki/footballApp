import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import authentication from './store/reducers/authentication';
import getGroups from './store/reducers/getGroups';
import groupData from './store/reducers/groupData';
import getCompetitions from './store/reducers/getCompetitions';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    authentication, getGroups, groupData, getCompetitions
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

