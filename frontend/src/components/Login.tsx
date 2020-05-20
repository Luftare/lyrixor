import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-hookstore';
import { Stores } from '../store';
import Form from './Form';
import './Login.css';

export default (props) => {
  const [authorName, setAuthorName] = useStore(Stores.AuthorName);
  const history = useHistory();

  const handleSubmit = (value) => {
    setAuthorName(value);
    localStorage.setItem(Stores.AuthorName, value);

    history.push('/');
  };

  return (
    <div className="login">
      <h2>Taiteilijanimi</h2>
      <Form
        buttonText="Jatka"
        onSubmit={handleSubmit}
        initValue={authorName}
        minLength={1}
        maxLength={16}
        {...props}
      />
    </div>
  );
};
