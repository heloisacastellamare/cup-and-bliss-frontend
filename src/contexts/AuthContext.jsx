import { createContext, useState, useEffect } from 'react';
import api from '../services/api'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('@CupAndBliss:user')
        const storedToken = localStorage.getItem('@CupAndBliss')

        if (storedUser && storedToken){
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, senha) => {
        const response = await api.post('auth/login', { email, senha })
        const { user: userData, token } = response.data

        localStorage.setItem('@CupAndBliss:user', JSON.stringify(userData))
        localStorage.setItem('@CupAndBliss:token', token)

        setUser(userData)
        return response.data
    }

    const logout = () => {
        localStorage.removeItem('@CupAndBliss:user')
        localStorage.removeItem('@CupAndBliss:token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, login, loading }}>
            {children}
        </AuthContext.Provider>
    )
}