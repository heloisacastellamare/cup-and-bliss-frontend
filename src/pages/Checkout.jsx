import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import api from '../services/api'
import { ErrorMessage } from '../components/ErrorMessage'
import { getFriendlyErrorMessage } from '../utils/friendlyErrors'

export default function Checkout() {
  const navigate = useNavigate();
  const { carrinho, valorTotal, limparCarrinho } = useCart();

  const [pagamento, setPagamento] = useState('pix');
  const [endereco, setEndereco] = useState('');
  const [cupom, setCupom] = useState('');
  const [erro, setErro] = useState('');
  const [processando, setProcessando] = useState(false);
  const [acessoRestrito, setAcessoRestrito] = useState(() => {
    const token = localStorage.getItem('@CupAndBliss:token') || localStorage.getItem('token')
    const isGuest = localStorage.getItem('CupAndBliss:isGuest')
    return !token || (isGuest === 'true' && !token)
  });

  const subtotal = valorTotal;
  const total = subtotal;

  useEffect(() => {
    const token = localStorage.getItem('@CupAndBliss:token') || localStorage.getItem('token')
    if (!token){
      localStorage.setItem('@CupAndBliss:redirectTo', '/checkout')
      return
    }

    async function carregarPerfil() {
      try {
        const response = await api.get('/auth/me');
        setEndereco(response.data.endereco || '');
      } catch (error) {
        setErro(getFriendlyErrorMessage(error));
      }
    }

    carregarPerfil();
  }, [navigate]);

  const handlePagar = async () => {
    setErro('');

    if (!endereco.trim()) {
      setErro('Informe um endereço para entrega antes de continuar.');
      return;
    }

    setProcessando(true);

    try {
      const token = localStorage.getItem('@CupAndBliss:token') || localStorage.getItem('token');
      if (!token) {
        localStorage.setItem('@CupAndBliss:redirectTo', '/checkout');
        navigate('/register', {
          state: { mensagem: 'Para finalizar sua compra, faça login ou cadastre-se no Cup and Bliss.' },
        });
        return;
      }

      await api.patch('/auth/me', {
        endereco: endereco.trim() 
      });

      // 2. Envia o pedido para o backend
      const response = await api.post('/pedidos', {
        itens: carrinho.map((item) => ({
          produto_id: item.id,
          quantidade: item.quantidade,
        })),
        forma_pagamento: pagamento,
      });

      const data = response.data;

      const dadosPedido = {
        id: `#${data.pedido_id || data.id}`,
        endereco: endereco.trim(),
        itens: carrinho,
        total: Number(data.valor_total || total).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        pagamento,
      };

      limparCarrinho();
      navigate('/pedido-concluido', { state: { pedido: dadosPedido } });

    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('@CupAndBliss:token');
        localStorage.removeItem('@CupAndBliss:user');
        localStorage.setItem('@CupAndBliss:redirectTo', '/checkout');
        setErro(getFriendlyErrorMessage(error))
        navigate('/login');
        return;
      }

      setErro(getFriendlyErrorMessage(error));
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1F0A0A] text-white font-corpo">
      <div className="min-h-screen max-w-md mx-auto flex flex-col justify-between p-4">
      {/* CABEÇALHO */}
      <div>
        <div className="flex items-center gap-4 py-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 border border-rosa-escuro/30 rounded-full text-rosa-escuro hover:bg-rosa-escuro/10 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-rosa-escuro text-center flex-1 pr-10">
            Finalizar compra
          </h2>
        </div>

        

        {acessoRestrito ? (
          <div className="space-y-5 pt-8">
            <ErrorMessage
              message="Para finalizar sua compra, você precisa ter um cadastro no Cup and Bliss."
              onClose={() => setAcessoRestrito(false)}
            />
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full border border-rosa-escuro text-rosa-escuro font-bold py-4 rounded-3xl transition active:scale-95"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full bg-rosa-escuro text-white font-bold py-4 rounded-3xl shadow-lg transition active:scale-95"
              >
                Fazer cadastro
              </button>
            </div>
          </div>
        ) : (
        <div className="space-y-5">
        
            <div>
             <ErrorMessage message={erro} onClose={() => setErro('')} />
            </div>

          {/* ENVIAR PARA */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Enviar para:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10">
              <input
                type="text"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
                placeholder="Informe seu endereço"
                className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* PAGAMENTO */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Pagamento:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10 space-y-3 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={pagamento === 'pix'}
                  onChange={() => setPagamento('pix')}
                  className="accent-rosa-escuro"
                />
                <span>Pix</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="pagamento"
                  value="entrega"
                  checked={pagamento === 'entrega'}
                  onChange={() => setPagamento('entrega')}
                  className="accent-rosa-escuro"
                />
                <span>Pagar na entrega</span>
              </label>
            </div>
          </div>

          {/* CUPOM DE DESCONTO */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Cupom de desconto:</h2>
            <div className="bg-[#2A1010] rounded-2xl p-4 border border-rosa-escuro/10">
              <input
                type="text"
                placeholder="Insira o código promocional"
                value={cupom}
                onChange={(e) => setCupom(e.target.value)}
                className="bg-transparent w-full text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold text-rosa-escuro">Resumo do Pedido:</h2>
            <div className="bg-[#2A1010] p-4 rounded-2xl border border-rosa-escuro/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold">
                  {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Envio</span>
                <span className="font-bold text-rosa-escuro">Frete Grátis</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-rosa-escuro pt-2 border-t border-rosa-escuro/10">
                <span>Total</span>
                <span>
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* BOTÃO PAGAR */}
      {!acessoRestrito && <div className="pt-6">
        <button
          onClick={handlePagar}
          disabled={processando || carrinho.length === 0}
          className="w-full bg-rosa-escuro text-white font-extrabold py-4 rounded-3xl shadow-lg transition active:scale-95 text-center text-base"
        >
          {processando ? 'Processando...' : 'Pagar'}
        </button>
      </div>}
      </div>
    </div>
  );
}