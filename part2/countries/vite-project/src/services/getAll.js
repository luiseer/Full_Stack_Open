import axios from 'axios';

const url = 'https://studies.cs.helsinki.fi/restcountries/api/name';

export const getAll = (name) => {
  return axios
    .get(`${url}/${name}`)
    .then((response) => {
      return response.data; // Devuelve directamente los datos de la respuesta
    })
    .catch((error) => {
      console.error('Error fetching country data:', error);
      return null; // Puedes devolver null o un objeto de error
    });
};
