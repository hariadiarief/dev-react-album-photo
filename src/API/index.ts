import Axios from 'axios'

const API = Axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
})

export default API
