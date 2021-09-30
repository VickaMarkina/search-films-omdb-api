import { addMovie,
    clearMovieMarkup,
    createMarcup,
    inputSearch,
    movieList,
    triggerMode } from "./dom.js";

let searchLast = null;
let siteUrl = null;

const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if(timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms )
  };
})();

const getData = (url) => fetch(url)
.then((res) => res.json())
.then(json => {
  if(!json || !json.Search) throw Error('Сервер вернул неправильный обьект.');

  return json.Search;
});

const inputSearchHandler = (e) => {  
  debounce(() =>{
    const searchString = e.target.value.trim();

    if(searchString && searchString.length > 2 && searchLast !== searchString) {
      if (!triggerMode) clearMovieMarkup(movieList);
      getData(`${siteUrl}?apikey=a9d49f4d&s=${searchString}`)
      .then((movies) => movies.forEach(movie => addMovie(movie)))
      .catch((err) => console.log(err));
    }

    searchLast = searchString
  }, 2000);  
}

export const appInit = (url) => {  
  createMarcup();  
  siteUrl = url;
  
  inputSearch.addEventListener('keyup', inputSearchHandler);
}
