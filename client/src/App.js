import React, { Fragment } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact path="/" component={Landing} />
      <Footer />
    </Fragment>
  </Router>
);

export default App;
