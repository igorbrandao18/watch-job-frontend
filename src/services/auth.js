import axios from 'axios'

const API_URL = 'http://localhost:3000' // Ajuste conforme o endereço do backend

export async function login(email, password) {
  return axios.post(`${API_URL}/auth/login`, { email, password })
}

export async function register(name, email, password) {
  return axios.post(`${API_URL}/auth/register`, { name, email, password })
} 