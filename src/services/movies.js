import axios from 'axios'

const API_URL = 'http://localhost:3000' // Backend (mantido para integração futura)
const TMDB_API_KEY = '5c71d706d4464da28b94e204d1edae5d'
const TMDB_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies(token) {
  return axios.get(`${API_URL}/movies/popular`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getPopularMoviesTMDB() {
  return axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`)
} 