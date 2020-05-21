import React, { useEffect, useState, FunctionComponent } from 'react';
import { useStore } from 'react-hookstore';
import api from '../utils/api';
import { Stores } from '../store';
import FullLyric from './FullLyric';

const LyricsList: FunctionComponent = () => {
  const [lyrics, setLyrics] = useStore(Stores.Lyrics);

  const fetchLyrics = async () => {
    setLyrics(await api.get('/lyrics?filter=finished'));
  };

  const [showAuthors, setShowAuthors] = useState(false);

  useEffect(() => {
    fetchLyrics();
  }, []);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showAuthors}
          onChange={(e) => setShowAuthors(e.target.checked)}
        />
        Näytä artistit
      </label>
      {lyrics.map((lyric) => (
        <FullLyric
          key={Math.random()}
          lyric={lyric}
          showAuthors={showAuthors}
        />
      ))}
    </>
  );
};

export default LyricsList;
