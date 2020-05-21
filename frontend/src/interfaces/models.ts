export interface Rhyme {
  rhyme: string;
  author: string;
}

export interface Lyric {
  targetLength: number;
  author: string;
  topic: string;
  rhymes: Rhyme[];
  _id: number | string;
}
