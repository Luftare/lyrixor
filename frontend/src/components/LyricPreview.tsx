import React, { FunctionComponent } from 'react';
import { Lyric } from '../interfaces/models';
import './LyricPreview.css';

export interface LyricPreviewProps {
  lyric: Lyric;
}

const LyricPreview: FunctionComponent<LyricPreviewProps> = ({ lyric }) => {
  const maxVisibleCount = 4;
  const visibleRhymes = lyric.rhymes.filter(
    (_, index) => index >= lyric.rhymes.length - maxVisibleCount
  );

  const rhymeOpacity = (index: number) => index / visibleRhymes.length + 0.2;

  const exisintRhymePreview = () => (
    <>
      <div className="label">Edelliset riimit:</div>
      <div className="lyric-preview__visible-rhymes">
        {visibleRhymes.map((rhyme, i) => (
          <div
            className="lyric-preview__visible-rhyme"
            key={Math.random()}
            style={{ opacity: rhymeOpacity(i) }}
          >
            {rhyme.rhyme}
          </div>
        ))}
      </div>

      <div className="label">
        Kirjoita seuraava riimi ({lyric.rhymes.length + 1} /{' '}
        {lyric.targetLength}):
      </div>
    </>
  );

  const firstRhymeGuide = () => (
    <div className="label">Ei aiempia riimejä, keksi ensimmäinen:</div>
  );

  return (
    <div className="lyric-preview">
      <div className="label">Aihe:</div>
      <div className="lyric-preview__topic">{lyric.topic}</div>
      {visibleRhymes.length ? exisintRhymePreview() : firstRhymeGuide()}
    </div>
  );
};

export default LyricPreview;
