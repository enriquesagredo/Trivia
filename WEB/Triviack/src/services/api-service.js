import axios from "axios"

const service = axios.create({
    withCredentials: true,
    baseURL
})