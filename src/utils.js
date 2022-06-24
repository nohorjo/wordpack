/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function randomSort(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function setItem(key, value) {
  localStorage.setItem(key, value);

  userDataApi.set(`${localStorage.getItem('userKey')}/${key}`, value);
}

const USER_DATA_API_BASE = 'http://data.muhammedhaque.co.uk/wordpack/users';

export const userDataApi = {
  get: (path = '') => fetch(`${USER_DATA_API_BASE}/${path}`).then(r => r.json()),
  set: (
    path = localStorage.getItem('userKey'),
    value = localStorage,
  ) => fetch(`${USER_DATA_API_BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `[${JSON.stringify(value)}]`,
  }),
  delete: (path = localStorage.getItem('userKey')) => fetch(`${USER_DATA_API_BASE}/${path}`, { method: 'DELETE' }),
};