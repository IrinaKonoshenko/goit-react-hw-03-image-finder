import axios from 'axios';

const URL = 'https://pixabay.com/api';
const API_KEY = '30782828-18aebbc8281f2a6373b4ce5f4';

export const Api = {
  fetchImages(query, page) {
    return axios.get(
      `${URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  },
};
