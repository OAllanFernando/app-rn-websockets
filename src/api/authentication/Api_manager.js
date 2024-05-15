import  axios from "axios";

const ApiManager = axios.create({
    baseURL: 'http://192.168.56.1:8080/api',
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;