export default class TmdbApi {
  apiKey = '46518e6552b1fc11adce2922be39b971';

  apiBase = 'https://api.themoviedb.org/3';

  async getMovies(query = 'return', page) {
    return fetch(
      `${this.apiBase}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    });
  }

  async getGuestSession() {
    return fetch(`${this.apiBase}/authentication/guest_session/new?api_key=${this.apiKey}`).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    });
  }

  async rateMovie(movieId, sessionId, rating) {
    return fetch(`${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    }).then((response) => response);
  }

  async getAllGenres() {
    return fetch(`${this.apiBase}/genre/movie/list?api_key=${this.apiKey}`).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    });
  }

  async getRatedMovies(guestSessionId) {
    return fetch(
      `${this.apiBase}/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    });
  }

  async deleteMovieRating(movieId, sessionId) {
    return fetch(`${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'DELETE',
    }).then((response) => response);
  }
}
