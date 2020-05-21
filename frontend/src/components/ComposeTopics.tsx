import React, { useEffect, useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-hookstore';
import { Stores } from '../store';
import api from '../utils/api';
import Form from './Form';

import './ComposeTopics.css';
import { Lyric } from '../interfaces/models';

const ComposeTopics: FunctionComponent = () => {
  const [author] = useStore(Stores.AuthorName);
  const [unfinishedLyrics, setUnfinishedLyrics] = useState<Lyric[]>([]);
  const history = useHistory();

  const fetchLyrics = async () => {
    setUnfinishedLyrics(await api.get('/lyrics?filter=unfinished'));
  };

  useEffect(() => {
    fetchLyrics();
  }, []);

  const handleSubmit = async (topic) => {
    await api.post(`/lyrics`, {
      topic,
      author,
    });
    fetchLyrics();
  };

  return (
    <div className="compose-topics">
      <h2 className="compose-topics__title">Keksi uusi aihe</h2>
      <p>
        Voit keksiä uusia aiheita riimeille. Tällä hetkellä lisäriimejä
        kaipaavia aiheita on {unfinishedLyrics.length} kpl.
      </p>
      <Form
        onSubmit={handleSubmit}
        buttonText="Lisää"
        placeholder="Aihe"
        minLength={1}
        maxLength={24}
        resetOnSubmit
      />
    </div>
  );
};

export default ComposeTopics;
