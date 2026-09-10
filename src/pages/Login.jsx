import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import api from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { limparCarrinho } = useCart()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email, senha: password
      })

      const data = response.data

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar login')
      }

      localStorage.setItem('token', data.token)

      if(data.usuario){
        localStorage.setItem('user', JSON.stringify(data.usuario))
      }

      limparCarrinho()
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-marrom-escuro flex items-center justify-center">
      <div className="w-full max-w-sm">

        

        <div className="flex justify-center">
            <img src="src\assets\cupcake.logo.png" className="h-32"/>
        </div>
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3 mb-4">
          <h1 className="font-title text-off-white flex justify-center tracking-wide gap-3">Cup<h1 className="font-title-2">&</h1>Bliss</h1>
          <p className="text-sm font-corpo text-rosa-claro font-semibold">Bem-vindo de volta! Acesse sua conta.</p>
        </div>

         {/* Alerta de Erro */}
        {error && (
            <div className="bg-vermelho text-off-white text-sm h-15  text-center flex items-center justify-center font-corpo font-medium rounded-2xl">
            {error}
            </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6 gap-10 p-6">
          <div className="email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-12 rounded-2xl bg-marrom-claro  outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <div className="senha">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="w-full h-12 rounded-2xl bg-marrom-claro outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/esqueci-senha"
              className="text-xs text-off-white font-extralight hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-rosa-escuro hover:bg-rosa-claro text-marrom-escuro font-corpo font-medium text-sm rounded-2xl transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer" id="button"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Rodapé */}
        <p className="text-center text-xs font-corpo text-off-white">
          Ainda não tem uma conta?{' '}
          <Link to="/register" className="font-semibold text-rosa-escuro hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}