import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import logoImg from '../assets/cupcake.logo.png'

export default function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem!')
      return
    }

    setLoading(true)

    try {
      setLoading(true);
      setError('')

      const response = await api.post('/auth/register', {
        nome, 
        email, 
        senha: password
      })

      const data = response.data
      alert('Cadastro realizado com sucesso!');
      navigate('/login')

    } catch (err) {
      const mensagem = err.response?.data?.error || 'Erro ao realizar cadastro.'
      setError(mensagem)
      console.error('Detalhes do erro 400:', err.response?.data)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-marrom-escuro flex items-center justify-center">
      <div className="w-full max-w-sm">

        {/* Cabeçalho */}
        <div className="flex justify-center mt-2.5">
            <img src={logoImg} alt="Cup and Bliss Logo" className="h-32"/>
        </div>
        
        <div className="text-center space-y-3 mb-1">
          <h1 className="font-title text-off-white flex justify-center tracking-wide gap-3">Cup<h1 className="font-title-2">&</h1>Bliss</h1>
          <p className="text-sm font-corpo text-rosa-claro font-semibold">Crie sua conta</p>
        </div>

        {/* Alerta de Erro */}
        {error && (
          <div className=" bg-vermelho text-off-white text-sm h-15  text-center flex items-center justify-center font-corpo font-medium rounded-2xl">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6 gap-10 p-6">
          <div className="space-y-1">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu Nome"
              required
              style={{paddingLeft: '18px'}}
              className="w-full h-12 rounded-2xl bg-marrom-claro  outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <div className="space-y-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              style={{paddingLeft: '18px'}}
              className="w-full h-12 rounded-2xl bg-marrom-claro  outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              style={{paddingLeft: '18px'}}
              className="w-full h-12 rounded-2xl bg-marrom-claro  outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <div className="space-y-1">
            
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
              style={{paddingLeft: '18px'}}
              className="w-full h-12 rounded-2xl bg-marrom-claro  outline-none text-xs font-corpo text-off-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-rosa-escuro hover:bg-rosa-claro text-marrom-escuro font-corpo font-medium text-sm rounded-2xl transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        {/* Rodapé */}
        <p className="text-center text-xs font-corpo text-off-white">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-semibold text-rosa-escuro hover:underline">
            Fazer Login
          </Link>
        </p>
      </div>
    </div>
  )
}