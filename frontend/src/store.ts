import { createStore } from 'react-hookstore';
import { Lyric } from './interfaces/models';

export enum Stores {
  AuthorName = 'authorName',
  Lyrics = 'lyrics',
  ToasterMessage = 'toasterMessage',
}

export const initStore = () => {
  createStore<string>(
    Stores.AuthorName,
    localStorage.getItem(Stores.AuthorName) || ''
  );
  createStore<Lyric[]>(Stores.Lyrics, []);
};
