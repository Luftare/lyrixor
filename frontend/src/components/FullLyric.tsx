import React, { FunctionComponent } from 'react';
import { Lyric } from '../interfaces/models';
import './FullLyric.css';

export interface FullLyricProps {
  lyric: Lyric;
  showAuthors: boolean;
}

const FullLyric: FunctionComponent<FullLyricProps> = ({
  lyric,
  showAuthors,
}) => (
  <div className="lyric">
    <h3 className="lyric__topic">
      {lyric.topic}
      <span
        className={`lyric__author ${!showAuthors && 'lyric__author--hidden'}`}
      >
        by: {lyric.author}
      </span>
    </h3>
    {lyric.rhymes.map(({ rhyme, author }, index) => (
      <div
        key={Math.random()}
        className={`lyric__rhyme ${
          index % 4 === 0 && 'lyric__rhyme--section-start'
        }`}
      >
        {rhyme}
        {showAuthors && (
          <span className="lyric__rhyme-author">by: {author}</span>
        )}
      </div>
    ))}
  </div>
);

export default FullLyric;
