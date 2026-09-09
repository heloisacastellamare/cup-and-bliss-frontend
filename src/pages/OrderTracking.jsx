import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CookingPot, Bike, ShoppingBag } from 'lucide-react';

export default function OrderTracking() {
  const navigate = useNavigate();
  const location = useLocation();

  const pedido = location.state?.pedido || {
    endereco: 'Av. Nações Unidas, 4232',
    total: 'R$ 73,96',
    itens: [
      { id: 1, nome: 'CupCake Pistache', quantidade: 1 },
      { id: 2, nome: 'Fatia de Bolo de Prestígio', quantidade: 1 },
      { id: 3, nome: 'CupCake de Morango', quantidade: 1 },
    ],
  };

  return (
    <div className="min-h-screen bg-[#1F0A0A] text-white font-corpo flex flex-col justify-between p-4 max-w-md mx-auto">
      <div>
        {/* CABEÇALHO */}
        <div className="flex items-center gap-4 py-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 border border-rosa-escuro/30 rounded-xl text-rosa-escuro hover:bg-rosa-escuro/10 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-rosa-escuro text-center flex-1 pr-10">
            Acompanhe seu Pedido
          </h1>
        </div>

        <div className="space-y-5">
          {/* STATUS DO PEDIDO */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Status do Pedido:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10 flex items-center justify-around">
              {/* ETAPA 1: PREPARANDO */}
              <div className="p-3 bg-rosa-escuro text-white rounded-2xl shadow-lg">
                <CookingPot size={24} />
              </div>

              {/* ETAPA 2: CAMINHO */}
              <div className="p-3 text-gray-400">
                <Bike size={24} />
              </div>

              {/* ETAPA 3: ENTREGUE */}
              <div className="p-3 text-gray-400">
                <ShoppingBag size={24} />
              </div>
            </div>
          </div>

          {/* ENVIAR PARA */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Enviar para:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10">
              <span className="font-bold text-sm block">Endereço</span>
              <span className="text-xs text-gray-300">{pedido.endereco}</span>
            </div>
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Resumo do Pedido:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10 space-y-3">
              <div className="space-y-2 text-xs text-gray-200">
                {pedido.itens?.map((item, idx) => (
                  <p key={idx}>
                    {item.quantidade}x {item.nome}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm font-extrabold pt-2 border-t border-rosa-escuro/10">
                <span>Total:</span>
                <span className="text-rosa-escuro">{pedido.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO VOLTAR PARA O INÍCIO */}
      <div className="pt-6">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-rosa-escuro text-white font-extrabold py-4 rounded-3xl shadow-lg transition active:scale-95 text-center text-base"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
}