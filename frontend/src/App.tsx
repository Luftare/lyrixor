import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useStore } from 'react-hookstore';

import { Stores } from './store';
import api from './utils/api';

import AuthorRequired from './components/AuthorRequired';
import Login from './components/Login';
import ComposeRhyme from './components/ComposeRhyme';
import ComposeTopics from './components/ComposeTopics';
import LyricsList from './components/LyricsList';
import OptionList from './components/OptionList';

import './App.css';

export default () => {
  const [authorName] = useStore(Stores.AuthorName);

  return (
    <Router>
      <div className="app__header">
        <Link to="/">Alku</Link>
        {authorName && (
          <>
            <Link to="/compose-topics">Aiheet</Link>
            <Link to="/compose-rhymes">Riimi</Link>
            <Link to="/lyrics">Tuotokset</Link>
          </>
        )}
      </div>
      <div className="app__content">
        <Route
          path="/compose-rhymes"
          render={(props) => (
            <AuthorRequired redirect="/">
              <ComposeRhyme {...props} />
            </AuthorRequired>
          )}
        />
        <Route
          path="/compose-topics"
          render={(props) => (
            <AuthorRequired redirect="/">
              <ComposeTopics {...props} />
            </AuthorRequired>
          )}
        />
        <Route path="/lyrics" component={LyricsList} />
        <Route path="/option-list" component={OptionList} />
        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
};
