import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import {
  MapPin,
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  LogOut, 
  Edit3, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { limparCarrinho } = useCart();

  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioLogado = JSON.parse(localStorage.getItem('user') || 'null');

      return {
        nome: usuarioLogado?.nome || 'Cliente',
        email: usuarioLogado?.email || 'E-mail não informado',
        telefone: usuarioLogado?.telefone || 'Telefone não informado',
        enderecoPrincipal: usuarioLogado?.endereco || 'Endereço não informado',
      };
    } catch {
      return {
        nome: 'Cliente',
        email: 'E-mail não informado',
        telefone: 'Telefone não informado',
        enderecoPrincipal: 'Endereço não informado',
      };
    }
  })

  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroPerfil, setErroPerfil] = useState('');
  const [sucessoPerfil, setSucessoPerfil] = useState('');
  const [pedidosRecentes, setPedidosRecentes] = useState([]);

  const handleLogout = () => {
      limparCarrinho();
      localStorage.removeItem('@CupAndBliss:user');
      localStorage.removeItem('@CupAndBliss:token');
      localStorage.removeItem('@CupAndBliss:isGuest');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }

  useEffect(() => {
    const token = localStorage.getItem('@CupAndBliss:token') || localStorage.getItem('token');
    const isGuest = localStorage.getItem('@CupAndBliss:isGuest');

    if (!token || isGuest === 'true'){
      navigate('/login') 
      return;
}

    api.get('/auth/me')
      .then((response) => {
        const data = response.data;
        setUsuario({
          nome: data.nome || 'Cliente',
          email: data.email || 'E-mail não informado',
          telefone: data.telefone || '',
          enderecoPrincipal: data.endereco || '',
        });
        localStorage.setItem('@CupAndBliss:user', JSON.stringify(data));
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          setErroPerfil(error.response?.data?.error || 'Não foi possível carregar o perfil.');
        }
      });

    // Busca os pedidos do usuário
    api.get('/pedidos')
      .then((response) => {
        setPedidosRecentes(response.data.slice(0, 1));
      })
      .catch((error) => console.error('Erro ao buscar pedidos do usuário:', error));
  }, [navigate]);

  const atualizarCampo = (campo, valor) => {
    setUsuario((atual) => ({ ...atual, [campo]: valor }));
  };

  const salvarPerfil = async (event) => {
    event.preventDefault();
    setErroPerfil('');
    setSucessoPerfil('');
    setSalvando(true);

    try {
      const response = await api.put('/auth/update', {
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        endereco: usuario.enderecoPrincipal,
      });

      const data = response.data;

      setUsuario({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || '',
        enderecoPrincipal: data.endereco || '',
      });

      localStorage.setItem('@CupAndBliss:user', JSON.stringify(data));
      setEditando(false);
      setSucessoPerfil('Dados atualizados com sucesso.');
    } catch (error) {
      setErroPerfil(error.response?.data?.error || error.message || 'Não foi possível atualizar o perfil.');
    } finally {
      setSalvando(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-off-white pb-24 font-corpo">

      <main className="px-4 pt-4 space-y-5 max-w-lg mx-auto">
        <div className="flex">
            <button
            onClick={() => navigate(-1)}
            className="bg-marrom-escuro/80 text-white p-2.5 rounded-full shadow-lg border border-rosa-escuro/30 transition active:scale-95">
            <ChevronLeft size={22} />
            </button>

            <h2 className="text-2xl font-bold text-rosa-escuro flex items-center pl-20">Meu Perfil</h2>
        </div>

        {erroPerfil && <p className="text-xs text-red-600">{erroPerfil}</p>}
        {sucessoPerfil && <p className="text-xs text-green-600">{sucessoPerfil}</p>}

        {/* CABEÇALHO DO PERFIL */}
        <div className="bg-marrom-escuro p-5 rounded-3xl shadow-lg text-white border border-rosa-escuro/20">
          {!editando ? (
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rosa-escuro/20 border-2 border-rosa-escuro flex items-center justify-center text-rosa-escuro font-bold text-2xl shadow-inner">
              {usuario.nome.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-snug">
                {usuario.nome}
              </h2>
              <span className="text-xs text-off-white/70 block">
                {usuario.email}
              </span>
              <span className="text-[11px] text-rosa-escuro font-semibold mt-0.5 block">
                {usuario.telefone}
              </span>
            </div>
          </div>

          <button 
            onClick={() => {
              setErroPerfil('');
              setSucessoPerfil('');
              setEditando(true);
            }}
            className="p-2.5 bg-black/20 hover:bg-black/40 rounded-xl text-rosa-escuro transition active:scale-95 border border-rosa-escuro/20"
          >
            <Edit3 size={18} />
          </button>
          </div>
          ) : (
            <form onSubmit={salvarPerfil} className="space-y-3">

              <input value={usuario.nome} onChange={(event) => atualizarCampo('nome', event.target.value)} placeholder="Nome" required className="w-full h-4 rounded-xl bg-white/10 text-sm text-white outline-none px-4 py-6" />

              <input type="email" value={usuario.email} onChange={(event) => atualizarCampo('email', event.target.value)} placeholder="E-mail" required className="w-full h-4 rounded-xl bg-white/10 text-sm text-white outline-none px-4 py-6" />
              
              <input value={usuario.telefone} onChange={(event) => atualizarCampo('telefone', event.target.value)} placeholder="Telefone" className="w-full h-4 rounded-xl bg-white/10 text-sm text-white outline-none px-4 py-6" />


              <input value={usuario.enderecoPrincipal} onChange={(event) => atualizarCampo('enderecoPrincipal', event.target.value)} placeholder="Endereço" className="w-full h-4 rounded-xl bg-white/10 text-sm text-white outline-none px-4 py-6" />

              <div className="flex gap-2">
                <button type="button" onClick={() => setEditando(false)} className="flex-1 rounded-xl border border-white/30 p-3 text-sm">Cancelar</button>
                <button type="submit" disabled={salvando} className="flex-1 rounded-xl bg-rosa-escuro p-3 text-sm font-bold text-marrom-escuro px-4 py-6">{salvando ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          )}
        </div>

        {/* ÚLTIMO PEDIDO */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-marrom-escuro uppercase tracking-wider">
              Último Pedido
            </h3>
            <button 
              onClick={() => navigate('/ordershistory')}
              className="text-xs text-rosa-escuro font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>

          {pedidosRecentes.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-rosa-escuro" />
                  <span className="text-xs font-bold text-marrom-escuro">
                    #{pedidosRecentes[0].id}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {pedidosRecentes[0].status}
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-1">
                {pedidosRecentes[0].ItemPedidos?.map((item) => (
                  `${item.quantidade}x ${item.Produto?.nome || 'Produto'}`
                )).join(', ') || 'Itens do pedido não disponíveis'}
              </p>

              <div className="flex justify-between items-center pt-1 text-xs">
                <span className="text-gray-400">
                  {new Date(pedidosRecentes[0].createdAt).toLocaleDateString('pt-BR')}
                </span>
                <span className="font-extrabold text-rosa-escuro">
                  {Number(pedidosRecentes[0].valor_total).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* MENU DE OPÇÕES */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
          <button 
            onClick={() => {
              setErroPerfil('');
              setSucessoPerfil('');
              setEditando(true);
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rosa-escuro/10 rounded-xl text-rosa-escuro">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-marrom-escuro block">
                  Endereços de Entrega
                </span>
                <span className="text-xs text-gray-400 line-clamp-1">
                  {usuario.enderecoPrincipal || 'Endereço não informado'}
                </span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/favorites')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rosa-escuro/10 rounded-xl text-rosa-escuro">
                <Heart size={20} />
              </div>
              <span className="text-sm font-bold text-marrom-escuro">
                Doces Favoritos
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/ordershistory')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rosa-escuro/10 rounded-xl text-rosa-escuro">
                <ShoppingBag size={20} />
              </div>
              <span className="text-sm font-bold text-marrom-escuro">
                Meus Pedidos
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </section>

        {/* BOTÃO DE SAIR */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold py-3.5 px-4 rounded-2xl border border-red-100 flex items-center justify-center gap-2 transition active:scale-95 text-sm"
        >
          <LogOut size={18} />
          <span>Sair da Conta</span>
        </button>
      </main>
    </div>
  );
}