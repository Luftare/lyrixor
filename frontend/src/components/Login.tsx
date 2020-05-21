import React from 'react';
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

    history.push('/option-list');
  };

  return (
    <div className="login">
      <h1>Räpystin</h1>
      <p>
        Tervetuloa räpin rustaajien jamittelupaikkaan! Voit keksiä räppien
        aiheita tai riimejä valmiisiin aiheisiin.
      </p>
      <p>Valmiita lyriikoita voi vapaasti käyttää vaikka omissa kappaleissa.</p>
      <Form
        buttonText="Jatka"
        placeholder="Taiteilijanimi"
        onSubmit={handleSubmit}
        initValue={authorName}
        minLength={1}
        maxLength={28}
        {...props}
      />
    </div>
  );
};
