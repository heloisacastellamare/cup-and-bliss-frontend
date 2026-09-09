import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Bell, ChevronLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function Header(){
    const [nomeUsuario, setNomeUsuario] = useState('Cliente')

    useEffect(() => {
        const userStorage = localStorage.getItem('user')

        if(userStorage){
            try {
                const user = JSON.parse(userStorage)
                const primeiroNome = user.nome ? user.nome.split(' ')[0] : 'Cliente'
                setNomeUsuario(primeiroNome)
            } catch (error) {
                console.error('Erro ao ler dados do usuário:', error)
            }
        }
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-marrom-escuro rounded-b-2xl h-16">
            <div className="text-off-white flex justify-around align-cente max-w-md mx-auto px-5 py-3">
                {/*Boas vindas ao usuario*/}
                <div className="flex gap-35 align-center">
                    <div>
                        <p className="text-xl font-corpo text-rosa-escuro font-bold">Olá, {nomeUsuario}</p>
                    </div>
                    <Link to="/profile" className="">
                        <User size={30} className="flex"/>
                    </Link>
                </div>
            </div>
        </header>
    )
}