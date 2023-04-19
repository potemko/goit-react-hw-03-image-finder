const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35290662-206a97f69559c1351b8f165bd';


export const getSearch = (searchText, page) => {
 return fetch(
   `${BASE_URL}/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
 );

};