import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
    .catch(error => {
        console.error('Error fetching persons:', error)
    })
}

const createPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
      .catch(err => {
        // Aquí manejamos el error y lo devolvemos para usarlo en el componente
        throw err.response?.data?.error || 'An unexpected error occurred'
      })
  }
  

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, createPerson, updatePerson, deletePerson}