import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://cup-and-bliss.onrender.com/api'
})

//Anexa o Token JWT automaticamente antes de cada requisição
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@CupAndBliss:token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api