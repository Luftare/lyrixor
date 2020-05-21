require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dao = require('./dao');

const app = express();
const api = express.Router();

app.use(cors());
app.use(express.static('frontend/build'));
app.use('/api', api);

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get('/lyrics', async (req, res) => {
  const { filter } = req.query;

  switch (filter) {
    case 'finished':
      res.json(await dao.getFinishedLyrics());
      break;
    case 'unfinished':
      res.json(await dao.getUnfinishedLyrics());
      break;

    default:
      res.json(await dao.getAllLyrics());
      break;
  }
});

api.post('/lyrics', async (req, res) => {
  const { topic, author } = req.body;

  if (topic && author) {
    await dao.createNewLyrics(author, topic);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

api.post('/lyrics/:id/rhyme', async (req, res) => {
  const { currentRhymesCount, rhyme, author } = req.body;
  const { id } = req.params;

  const validProperties =
    currentRhymesCount !== undefined && rhyme && rhyme.length < 150 && author;

  if (validProperties) {
    try {
      await dao.appendRhyme(id, rhyme, author, parseInt(currentRhymesCount));
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

api.delete('/lyrics/:id/rhyme/:index', async (req, res) => {
  const { id } = req.params;

  try {
    await dao.removeRhyme(id, parseInt(index));
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

api.delete('/lyrics/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await dao.removeLyric(id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

api.get('/lyrics/random', async (req, res) => {
  try {
    res.json(await dao.getRandomUnfinishedLyric());
  } catch (err) {
    res.sendStatus(400);
  }
});

(async () => {
  await dao.connect();

  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
})();
