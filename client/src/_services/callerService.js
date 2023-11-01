import axios from 'axios';
const Axios = axios.create({ 
    baseURL: "http://localhost:5050/api",
    withCredentials: true
});

export default Axios;