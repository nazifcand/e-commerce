import Axios from 'axios';

let options = {};
const baseURL =
  window.location.hostname == 'app.medikaport.com'
    ? 'https://api.medikaport.com/api'
    : 'https://dev.medikaport.com/api';

// check token
if (localStorage.token) {
  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  };
}

const axios = Axios.create({
  baseURL,
  ...options,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    if (status == 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('recentlyVisitedProducts');
      window.location.href = '/account/login';
    }

    throw error;
  }
);

export default axios;
