const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35290662-206a97f69559c1351b8f165bd';

export const getSearch = searchText => {
 return fetch(`${BASE_URL}/?q=${searchText}&key=${API_KEY}`)

};




// getSearch(this.props.searchText)
//         .then(response => response.json())
//         .then(data => this.setState({ data }));
//     }
//   }