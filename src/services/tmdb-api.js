async function getMovies() {
  const movies = await fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=46518e6552b1fc11adce2922be39b971&language=en-US&query=return&page=1&include_adult=false'
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Тестовая ошибка');
      }
      return response.json();
    })
    .then((body) => body.results);

  return movies;
}

export default getMovies;
