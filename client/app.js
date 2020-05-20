const post = (url, body) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

const get = (url) => fetch(url).then((res) => res.json());

const validString = (string, maxLength, minLength = 0) =>
  string.length >= minLength && string.length <= maxLength;

new Vue({
  el: '#app',
  data: {
    lyrics: [],
    newTopic: '',
    newRhyme: '',
    authorMaxLength: 16,
    rhymeMaxLength: 42,
    topicMaxLength: 20,
    author: '',
    randomLyric: null,
    view: 'login',
  },
  computed: {
    lastRandomRhyme() {
      if (!this.randomLyric || this.randomLyric.rhymes.length === 0)
        return null;
      return this.randomLyric.rhymes[this.randomLyric.rhymes.length - 1];
    },
    lastRandomRhymeText() {
      return this.lastRandomRhyme ? this.lastRandomRhyme.rhyme : '';
    },
    validAuthor() {
      return validString(this.author, this.authorMaxLength, 1);
    },
    validRhyme() {
      return validString(this.newRhyme, this.rhymeMaxLength, 3);
    },
    validTopic() {
      return validString(this.newTopic, this.topicMaxLength, 1);
    },
  },
  methods: {
    async addTopic() {
      if (!this.validAuthor || !this.validTopic) return;
      await post('/lyrics', { topic: this.newTopic, author: this.author });
      this.newTopic = '';
      this.lyrics = await get('/lyrics');
    },
    async addRhyme() {
      if (!this.validAuthor || !this.validRhyme) return;
      await post(`/lyrics/${this.randomLyric._id}`, {
        currentRhymesCount: this.randomLyric.rhymes.length,
        rhyme: this.newRhyme,
        author: this.author,
      });
      this.newRhyme = '';
      this.randomLyric = await get('/lyrics/random');
    },
    async login() {
      if (this.validAuthor) {
        this.randomLyric = await get('/lyrics/random');
        this.view = this.randomLyric ? 'menu' : 'new-topic';
      }
    },
    async toRhymeView() {
      this.view = 'random-rhyme';
    },
    async toTopicView() {
      this.view = 'new-topic';
    },
  },
});
