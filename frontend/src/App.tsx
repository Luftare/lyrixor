import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useStore } from 'react-hookstore';

import { Stores } from './store';
import api from './utils/api';

import AuthorRequired from './components/AuthorRequired';
import Login from './components/Login';
import ComposeRhyme from './components/ComposeRhyme';
import LyricsList from './components/LyricsList';

import './App.css';

export default () => {
  const [lyrics, setLyrics] = useStore(Stores.Lyrics);
  const [authorName] = useStore(Stores.AuthorName);

  const fetchInitState = async () => {
    setLyrics(await api.get('/lyrics'));
  };

  useEffect(() => {
    fetchInitState();
  }, []);

  return (
    <Router>
      <div className="app__header">
        <Link to="/">Home</Link>
        {authorName && (
          <>
            <Link to="/compose-rhymes">Rhymes</Link>
            <Link to="/lyrics">Lyrics</Link>
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
        <Route path="/lyrics" component={LyricsList} />
        <Route path="/" exact component={Login} />
      </div>
    </Router>
  );
};
