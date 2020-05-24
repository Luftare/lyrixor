const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const mongoDbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class DAO {
  constructor() {}

  async connect(onConnected) {
    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
      mongoDbConfig
    );

    this.db = client.db();
    this.lyrics = this.db.collection(process.env.LYRICS_COLLECTION);
  }

  async getRandomUnfinishedLyric(excludedId) {
    const lyrics = (await this.getUnfinishedLyrics()).filter(
      ({ _id }) => _id + '' !== excludedId
    );
    const index = Math.floor(Math.random() * lyrics.length);
    return lyrics[index];
  }

  async appendRhyme(id, rhyme, author, currentRhymesCount) {
    const lyric = await this.lyrics.findOne({ _id: new ObjectId(id) });

    if (currentRhymesCount !== lyric.rhymes.length) {
      throw new Error('This section was already written.');
    }

    const updatedLyric = {
      ...lyric,
      rhymes: [...lyric.rhymes, { rhyme, author }],
    };

    return this.lyrics.replaceOne({ _id: new ObjectId(id) }, updatedLyric);
  }

  removeLyric(id) {
    return this.lyrics.deleteOne({ _id: new ObjectId(id) });
  }

  async removeRhyme(id, index) {
    const lyric = await this.lyrics.findOne({ _id: new ObjectId(id) });

    const updatedLyric = {
      ...lyric,
      rhymes: lyric.rhymes.filter((_, i) => i < index),
    };

    return this.lyrics.replaceOne({ _id: new ObjectId(id) }, updatedLyric);
  }

  getAllLyrics() {
    return this.lyrics.find({}).toArray();
  }

  async getFinishedLyrics() {
    return (await this.getAllLyrics()).filter(
      (lyric) => lyric.rhymes.length >= lyric.targetLength
    );
  }

  async getUnfinishedLyrics() {
    return (await this.getAllLyrics()).filter(
      (lyric) => lyric.rhymes.length < lyric.targetLength
    );
  }

  createNewLyrics(author, topic) {
    const lyrics = {
      targetLength: 16,
      author,
      topic,
      rhymes: [],
    };

    return this.lyrics.insertOne(lyrics);
  }
}

module.exports = new DAO();
