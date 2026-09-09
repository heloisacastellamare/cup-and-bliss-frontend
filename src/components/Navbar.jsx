import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Home, ListCheck, Heart, ShoppingCart, User, Search } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location  = useLocation()

  const baseStyle = "text-xs text-white"
  const activeStyle = `${baseStyle} bg-rosa-escuro font-bold px-6 py-4 rounded-lg`
  const inactiveStyle = `${baseStyle} bg-transparent`

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  };

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed bottom-0 left-0 right-0 z-40 bg-marrom-escuro rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-20">

          {/* Links de Navegação */}
          <nav className="flex items-center space-x-6 font-corpo text-sm font-medium">

            <NavLink to="/home" className={({ isActive: isLinkActive }) => isLinkActive ? activeStyle : inactiveStyle}><Home size={30} className="text-off-white flex flex-col items-center justify-center w-full"/>
              <span className="mt-1 text-off-white text-xs">Início</span>
            </NavLink>

            <NavLink to="/ordershistory" className={({ isActive: isLinkActive }) => isLinkActive ? activeStyle : inactiveStyle}><ListCheck size={30} className="text-off-white flex flex-col items-center justify-center w-full"/>
              <span className="mt-1 text-off-white text-xs">Pedidos</span>
            </NavLink>

            <NavLink to="/favorites" className={({ isActive: isLinkActive }) => isLinkActive ? activeStyle : inactiveStyle}><Heart size={30} className="text-off-white flex flex-col items-center justify-center w-full"/>
              <span className="mt-1 text-off-white text-xs">Favoritos</span>
            </NavLink>

            <NavLink to="/carrinho" className={({ isActive: isLinkActive }) => isLinkActive ? activeStyle : inactiveStyle}><ShoppingCart size={30} className="text-off-white flex flex-col items-center justify-center w-full"/>
            <span className="mt-1 text-off-white text-xs">Carrinho</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}