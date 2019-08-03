import React, { Fragment } from 'react';
import Header from './components/staticElements/Header';
import Footer from './components/staticElements/Footer';
import Landing from './components/routes/Landing';
import Group from './components/routes/Group';
import Dashboard from './components/routes/Dashboard';
import Logout from './components/routes/Logout';
import Invitation from './components/routes/Invitation';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import './App.css';
//Redux

const App = () => (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Header />

            <Route exact path="/" component={Landing} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/group" component={Group} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/invitation" component={Invitation} />
        <Footer />
      </QueryParamProvider>
    </Router>
);

export default App;
