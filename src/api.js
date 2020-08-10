import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '56fad3b2fe9fadb33c9614c89e6d9897',
    language: 'ko-KR',
  },
});

// api.get('movie/upcoming', {
//   params: {
//     api_key: '56fad3b2fe9fadb33c9614c89e6d9897',
//     language: 'en-US',
//   },
// });

export const moviesApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  search: (term) =>
    api.get('search/movie', {
      params: {
        query: term,
      },
    }),
};

export const tvApi = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  showImdb: (id) => api.get(`tv/${id}/external_ids`),
  search: (term) =>
    api.get('search/tv', {
      params: {
        query: term,
      },
    }),
};
