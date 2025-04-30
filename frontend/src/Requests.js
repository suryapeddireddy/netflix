const API_KEY = '4c67a82c35b711b51bd2ebce7b312ab1';
const LANGUAGE = 'en-US';
const PAGE = 1;

export const POPULAR_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${PAGE}`;
export const TRENDING_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
export const TOP_RATED_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&page=${PAGE}`;
export const UPCOMING_MOVIES_ENDPOINT = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&page=${PAGE}`;

// You can also export the API key and other constants if needed
export { API_KEY, LANGUAGE, PAGE };