import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { userDataApi } from './utils';

(async () => {
  let userKey = localStorage.getItem('userKey');

  if (userKey) {
    const data = await userDataApi.get(userKey);
    Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
  } else {
    const data = await userDataApi.get();
    const existing = Object.keys(data);

    do {
      userKey = Math.random().toString(36).substring(2);
    } while (existing.includes(userKey));

    localStorage.setItem('userKey', userKey);

    await userDataApi.set();
  }
  ReactDOM.render(<App />, document.getElementById('root'));
})();
