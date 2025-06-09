import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
  }),
  actions: {
    setMovies(movies) {
      this.movies = movies
    },
    setLoading(loading) {
      this.loading = loading
    },
    setError(error) {
      this.error = error
    },
    reset() {
      this.movies = []
      this.loading = false
      this.error = null
    },
  },
}) 