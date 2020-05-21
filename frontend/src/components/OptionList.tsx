import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import './OptionList.css';

const OptionList: FunctionComponent = () => {
  const history = useHistory();

  return (
    <div>
      <h2>Mitä haluat tehdä?</h2>
      <div className="option-list__options">
        <button onClick={() => history.push('/compose-topics')}>
          Keksi aiheita
        </button>
        <button onClick={() => history.push('/compose-rhymes')}>
          Keksi riimejä
        </button>
        <button onClick={() => history.push('/lyrics')}>
          Ihastele sanoituksia
        </button>
      </div>
    </div>
  );
};

export default OptionList;
