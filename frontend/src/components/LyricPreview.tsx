import React, { FunctionComponent } from 'react';
import { Lyric } from '../interfaces/models';
import './LyricPreview.css';

export interface LyricPreviewProps {
  lyric: Lyric;
}

const LyricPreview: FunctionComponent<LyricPreviewProps> = ({ lyric }) => {
  const visibleRhyme = lyric.rhymes[lyric.rhymes.length - 1];

  const exisintRhymePreview = () => (
    <>
      <div className="label">
        Edellinen riimi ({lyric.rhymes.length} / {lyric.targetLength}):
      </div>
      <div className="lyric-preview__visible-rhyme">{visibleRhyme.rhyme}</div>
      <div className="label">Kirjoita seuraava riimi:</div>
    </>
  );

  const firstRhymeGuide = () => (
    <div className="label">Ei aiempia riimejä, keksi ensimmäinen:</div>
  );

  return (
    <div className="lyric-preview">
      <div className="label">Aihe:</div>
      <div className="lyric-preview__topic">{lyric.topic}</div>
      {visibleRhyme ? exisintRhymePreview() : firstRhymeGuide()}
    </div>
  );
};

export default LyricPreview;
