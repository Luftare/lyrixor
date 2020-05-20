const endpointUrl =
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/api' : '/api';

export default {
  get(url: string) {
    return fetch(`${endpointUrl}${url}`).then((res) => res.json());
  },
  post(url: string, body: any) {
    return fetch(`${endpointUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
