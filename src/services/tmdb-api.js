async function getMovies(query='return', page) {
  return  await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=46518e6552b1fc11adce2922be39b971&language=en-US&query=${query}&page=${page}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then((body) => {
        return body;
    });
}

export default getMovies;
