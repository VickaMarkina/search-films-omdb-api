export let movieList = null;
export let inputSearch = null;
export let triggerMode = false;

export const  createElement = ({
  type, attrs, container = null, position = 'append', evt = null, handler = null
}) => { 
  const el = document.createElement(type);

  Object.keys(attrs).forEach(key => {
    if(key != 'innerText'){
      el.setAttribute(key, attrs[key])
    } else {
      el.innerHTML =  attrs[key];
    }   
  });
  
  if(container &&  position === 'append') container.append(el);
  if(container &&  position === 'prepend') container.prepend(el);
  
  if(evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);

  return el;
};

export const triggerModeHandler = () => triggerMode = !triggerMode;

export const createMarcup = () =>{
  const container = createElement({
    type: 'div',
    attrs: {class: 'container'},
    container: document.body,
    position: 'prepend'
  });

  createElement({
    type: 'h1',
    attrs: {innerText: 'Приложение для поиска фильмов'},
    container
  });

  const containerSearch = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerText: 'Поиск фильмов',
    },
    container: containerSearch
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'text',
      placeholder: 'Начните вводить текст...',
    },
    container: containerSearch
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__input-checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: containerSearch,
    evt: 'click',
    handler: triggerModeHandler
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerText: 'Добавлять фильмы к существующему списку',
    },
    container: containerSearch
  });

  createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container
  });
 
  movieList = document.querySelector('.movies');  
  inputSearch = document.querySelector('#search');
};

export const addMovie = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: {class: 'movie'},
    container: movieList
  });
  
  createElement({
    type: 'img',
    attrs: {
      class: 'movie-img',
      src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/nofoto.png',
      alt: movie.Title,
      title: movie.Title,
    },
    container: item
  });
};

export const clearMovieMarkup = (el) => el && (el.innerHTML = '');