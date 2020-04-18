import axios from 'axios';

const composeToken = (token) => token ? { Authorization: `Bearer ${token}` } : {};

const apiCall = (url, method, body = {}, token = '') => axios({
  method,
  url: `http://localhost:3002/api${url}`,
  data: body,
  headers: {
    ...composeToken(token)
  }
});

export default apiCall;
