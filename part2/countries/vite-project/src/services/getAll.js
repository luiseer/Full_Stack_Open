import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

export const getAll = ({name}) =>{
   return axios.get(url`/${name}`)
    .then(response => {
        const {data} = response
        return data
    })

}