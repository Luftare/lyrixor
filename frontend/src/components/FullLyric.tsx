import React, { FunctionComponent } from 'react';
import { Lyric } from '../interfaces/models';

export interface FullLyricProps {
  lyric: Lyric;
}

const FullLyric: FunctionComponent<FullLyricProps> = ({ lyric }) => (
  <div className="lyric">
    <div className="lyric__topic">{lyric.topic}</div>
    {lyric.rhymes.map(({ rhyme, author }) => (
      <div key={rhyme + author} className="lyric__rhyme">
        {rhyme} <span className="lyric__rhyme-author">by: {author}</span>
      </div>
    ))}
  </div>
);

export default FullLyric;
