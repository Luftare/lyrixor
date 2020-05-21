import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Lyric } from '../interfaces/models';

export default () => {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [password, setPassword] = useState('');

  const fetchLyrics = async () => {
    setLyrics(await api.get('/lyrics'));
  };

  const deleteRhyme = async (lyric: Lyric, rhymeIndex: number) => {
    // Don't do this, really
    await api.delete(`/lyrics/${lyric._id}/rhymes/${rhymeIndex}/${password}`);
    fetchLyrics();
  };

  const deleteLyric = async (lyric: Lyric) => {
    // Don't do this, really
    await api.delete(`/lyrics/${lyric._id}/${password}`);
    fetchLyrics();
  };

  useEffect(() => {
    fetchLyrics();
  }, []);

  return (
    <>
      <h1>Admin</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {lyrics.map((lyric) => (
        <div key={Math.random()}>
          <h2>Aihe: {lyric.topic}</h2>
          <button onClick={() => deleteLyric(lyric)}>Poista</button>
          {lyric.rhymes.map(({ rhyme, author }, index) => (
            <div key={Math.random()}>
              {rhyme} by: {author}{' '}
              <button onClick={() => deleteRhyme(lyric, index)}>Poista</button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
