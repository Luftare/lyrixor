import React, { useEffect, FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-hookstore';
import { Stores } from '../store';
import api from '../utils/api';
import Form from './Form';
import { Rhyme } from '../interfaces/models';
import LyricPreview from './LyricPreview';

const ComposeRhyme: FunctionComponent = () => {
  const [randomLyric, setRandomLyric] = useState<Rhyme>(null);
  const [author] = useStore(Stores.AuthorName);
  const history = useHistory();

  const fetchRandomLyric = async () => {
    setRandomLyric(await api.get('/lyrics/random'));
  };

  useEffect(() => {
    fetchRandomLyric();
  }, []);

  const handleSubmit = async (rhyme) => {
    await api.post(`/lyrics/${randomLyric._id}/rhyme`, {
      rhyme,
      author,
      currentRhymesCount: randomLyric.rhymes.length,
    });
  };

  return (
    <>
      {randomLyric && <LyricPreview lyric={randomLyric} />}
      <Form
        onSubmit={handleSubmit}
        buttonText="Lähetä"
        placeholder="Riimi"
        resetOnSubmit
      />
    </>
  );
};

export default ComposeRhyme;
