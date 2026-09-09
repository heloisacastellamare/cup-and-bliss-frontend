import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import  NavBar  from '../components/Navbar'

export default function OrdersHistory() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErro('Faça login para consultar seus pedidos.');
      setCarregando(false);
      return;
    }

    fetch('http://localhost:5000/api/pedidos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }

        if (!response.ok) {
          throw new Error(data.detalhes || data.error || 'Não foi possível carregar seus pedidos.');
        }

        setPedidos(data);
      })
      .catch((error) => setErro(error.message))
      .finally(() => setCarregando(false));
  }, []);

  const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR');
  const formatarMoeda = (valor) => Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="min-h-screen bg-off-white font-corpo pb-20">
      {/* CABEÇALHO */}
      <div className="bg-marrom-escuro text-white p-4 flex items-center justify-between shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-rosa-escuro p-1 transition active:scale-95"
        >
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-2xl font-bold text-rosa-escuro">Meus Pedidos</h2>
        <div className="w-7" />
      </div>

      <main className="p-4 max-w-lg mx-auto space-y-4">
        {carregando ? (
          <p className="text-sm text-gray-500 text-center py-20">Carregando seus pedidos...</p>
        ) : erro ? (
          <p className="text-sm text-red-600 text-center py-20">{erro}</p>
        ) : pedidos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="p-5 bg-rosa-escuro/10 rounded-full text-rosa-escuro">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-lg font-bold text-marrom-escuro">Nenhum pedido realizado</h2>
            <p className="text-xs text-gray-500 max-w-xs">
              Você ainda não fez nenhum pedido no Cup & Bliss. Faça seu primeiro pedido agora!
            </p>
          </div>
        ) : (
          pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3"
            >
              {/* STATUS E ID */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-rosa-escuro" />
                  <span className="text-xs font-bold text-marrom-escuro">
                    Pedido #{pedido.id}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {pedido.status}
                </span>
              </div>

              {/* LISTA DE ITENS */}
              <div className="space-y-1">
                {pedido.ItemPedidos?.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-gray-600">
                    <span>
                      {item.quantidade}x {item.Produto?.nome || 'Produto'}
                    </span>
                    <span className="font-semibold text-marrom-escuro">
                      {formatarMoeda(item.preco_unitario)}
                    </span>
                  </div>
                ))}
              </div>

              {/* RODAPÉ DO CARD */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-400">{formatarData(pedido.createdAt)}</span>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">Total</span>
                  <span className="font-extrabold text-rosa-escuro text-sm">
                    {formatarMoeda(pedido.valor_total)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    <NavBar/>
    </div>
  );
}