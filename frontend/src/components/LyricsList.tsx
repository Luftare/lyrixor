import React, { useEffect, FunctionComponent } from 'react';
import { useStore } from 'react-hookstore';
import api from '../utils/api';
import { Stores } from '../store';
import Form from './Form';
import FullLyric from './FullLyric';

const LyricsList: FunctionComponent = () => {
  const [lyrics, setLyrics] = useStore(Stores.Lyrics);

  const fetchLyrics = async () => {
    setLyrics(await api.get('/lyrics'));
  };

  useEffect(() => {
    fetchLyrics();
  }, []);

  return (
    <>
      {lyrics.map((lyric) => (
        <FullLyric key={lyric.topic + lyric.author} lyric={lyric} />
      ))}
    </>
  );
};

export default LyricsList;
