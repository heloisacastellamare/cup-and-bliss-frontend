import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { carrinho, valorTotal, limparCarrinho } = useCart();

  const [pagamento, setPagamento] = useState('pix');
  const [endereco, setEndereco] = useState('');
  const [cupom, setCupom] = useState('');
  const [erro, setErro] = useState('');
  const [processando, setProcessando] = useState(false);

  const subtotal = valorTotal;
  const total = subtotal;

  const getToken = () => localStorage.getItem('@CupAndBliss:token') || localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Não foi possível carregar o endereço.');
        setEndereco(data.endereco || '');
      })
      .catch((error) => setErro(error.message));
  }, []);

  const handlePagar = async () => {
    setErro('');

    if (!endereco.trim()) {
      setErro('Informe um endereço para entrega antes de continuar.');
      return;
    }

    setProcessando(true);

    try {
      const token = getToken();
      if (!token) throw new Error('Faça login para finalizar o pedido.');

      const enderecoResponse = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ endereco: endereco.trim() }),
      });

      const enderecoData = await enderecoResponse.json();
      if (!enderecoResponse.ok) {
        throw new Error(enderecoData.error || 'Não foi possível salvar o endereço.');
      }

      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itens: carrinho.map((item) => ({
            produto_id: item.id,
            quantidade: item.quantidade,
          })),
          forma_pagamento: pagamento,
        }),
      });

      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      if (!response.ok) {
        throw new Error(data.detalhes || data.error || 'Não foi possível finalizar o pedido.');
      }

      const dadosPedido = {
        id: `#${data.pedido_id}`,
        endereco: endereco.trim(),
        itens: carrinho,
        total: Number(data.valor_total).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        pagamento,
      };

      limparCarrinho();
      navigate('/pedido-concluido', { state: { pedido: dadosPedido } });
    } catch (error) {
      setErro(error.message);
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

        <div className="space-y-5">
          {erro && (
            <div className="bg-vermelho text-off-white text-xs font-semibold p-3 rounded-2xl">
              {erro}
            </div>
          )}

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
      </div>

      {/* BOTÃO PAGAR */}
      <div className="pt-6">
        <button
          onClick={handlePagar}
          disabled={processando || carrinho.length === 0}
          className="w-full bg-rosa-escuro text-white font-extrabold py-4 rounded-3xl shadow-lg transition active:scale-95 text-center text-base"
        >
          {processando ? 'Processando...' : 'Pagar'}
        </button>
      </div>
      </div>
    </div>
  );
}