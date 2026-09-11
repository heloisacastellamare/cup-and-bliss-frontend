import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

export default function Header(){
    const [usuario] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('@CupAndBliss:user') || 'null')
        } catch {
            return null
        }
    })

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-marrom-escuro rounded-b-2xl h-16">
            <div className="text-off-white flex justify-around align-cente max-w-md mx-auto px-5 py-3">
                {/*Boas vindas ao usuario*/}
                <div className="flex gap-35 align-center">
                    <div>
                        <p className="text-xl font-corpo text-rosa-escuro font-bold"> {usuario ? `Olá, ${usuario.nome}` : 'Seja bem-vindo!'}</p>
                    </div>
                    <Link to="/profile" className="">
                        <User size={30} className="flex"/>
                    </Link>
                </div>
            </div>
        </header>
    )
}