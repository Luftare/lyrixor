import React, { useEffect, FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router';
import { useStore } from 'react-hookstore';
import { Stores } from '../store';
import api from '../utils/api';
import Form from './Form';
import { Lyric } from '../interfaces/models';
import LyricPreview from './LyricPreview';

import './ComposeRhyme.css';

const ComposeRhyme = <P extends object>() => {
  const [randomLyric, setRandomLyric] = useState<Lyric | null>(null);
  const [author] = useStore(Stores.AuthorName);
  const history = useHistory();

  const fetchRandomLyric = async () => {
    try {
      setRandomLyric(await api.get('/lyrics/random'));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRandomLyric();
  }, []);

  const handleSubmit = async (rhyme) => {
    await api.post(`/lyrics/${randomLyric?._id}/rhyme`, {
      rhyme,
      author,
      currentRhymesCount: randomLyric?.rhymes.length,
    });
    fetchRandomLyric();
  };

  const rhymeInput = () => (
    <>
      {randomLyric && <LyricPreview lyric={randomLyric} />}
      <Form
        onSubmit={handleSubmit}
        buttonText="Lähetä"
        placeholder="Riimi"
        minLength={1}
        maxLength={64}
        validator={(value) =>
          value.split(' ').filter((v) => v.length > 0).length > 1
        }
        resetOnSubmit
      />
    </>
  );

  const noRhymesInfo = () => (
    <>
      <span className="compose-rhyme__no-lyrics-text">
        Ei keskeneräisiä aiheita...
      </span>
      <button onClick={() => history.push('/compose-topics')}>
        Keksi uusia aiheita
      </button>
    </>
  );

  return <div>{randomLyric ? rhymeInput() : noRhymesInfo()}</div>;
};

export default ComposeRhyme;
