import axios from 'axios';

export const apiPoke = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
});
