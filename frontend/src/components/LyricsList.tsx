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

  const lyricsList = () => (
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

  const noLyricsInfo = () => <h2>Ei vielä yhtään valmista tuotosta...</h2>;

  return lyrics.length > 0 ? lyricsList() : noLyricsInfo();
};

export default LyricsList;
