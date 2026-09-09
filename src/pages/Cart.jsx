import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { carrinho, atualizarQuantidade, removerDoCarrinho, valorTotal, limparCarrinho } = useCart();

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-marrom-escuro font-corpo flex flex-col justify-between overflow-y-auto">
      {/* CABEÇALHO */}
      <div className="p-4 flex items-center justify-between border-b border-rosa-escuro/20 bg-marrom-escuro shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="bg-marrom-escuro/80 text-white p-2.5 rounded-full shadow-lg border border-rosa-escuro/30 transition active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        <h2 className="text-2xl font-bold text-rosa-escuro">Meu Carrinho</h2>

        {carrinho.length > 0 ? (
          <button
            onClick={limparCarrinho}
            className="text-xs text-rosa-escuro opacity-80 hover:opacity-100 transition"
          >
            Limpar
          </button>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* CONTEÚDO / LISTA DE ITENS */}
      <div className="flex-1 p-4 space-y-4 max-w-lg mx-auto w-full">
        {carrinho.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4">
            <div className="p-6 bg-rosa-escuro/10 rounded-full text-rosa-escuro">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-lg font-bold text-white">Seu carrinho está vazio</h2>
            <p className="text-xs text-off-white/70 max-w-xs leading-relaxed">
              Adicione deliciosos doces ou bebidas para começar seu pedido!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="mt-4 bg-rosa-escuro text-white text-sm font-semibold py-3 px-6 rounded-2xl hover:opacity-90 transition active:scale-95"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {carrinho.map((item) => {
              const precoUnitario = item.precoNumerico || 0;
              const subtotalItem = precoUnitario * item.quantidade;

              return (
                <div
                  key={item.id}
                  className="bg-black/20 p-3.5 rounded-2xl border border-rosa-escuro/20 flex items-center gap-3 shadow-md"
                >
                  {/* IMAGEM DO ITEM */}
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  {/* INFORMAÇÕES */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {item.nome}
                    </h3>
                    <span className="text-xs text-rosa-escuro font-semibold block mt-0.5">
                      {formatarMoeda(subtotalItem)}
                    </span>

                    {/* CONTROLE DE QUANTIDADE */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 px-2 py-1 rounded-xl border border-rosa-escuro/40 bg-marrom-escuro">
                        <button
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          className="text-white text-xs font-bold hover:opacity-80 active:scale-95 px-1"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-xs font-bold text-white">{item.quantidade}</span>
                        <button
                          onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                          className="text-white text-xs font-bold hover:opacity-80 active:scale-95 px-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removerDoCarrinho(item.id)}
                        className="text-red-400 hover:text-red-300 p-1.5 transition active:scale-90"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RODAPÉ COM VALOR TOTAL E FINALIZAR */}
      {carrinho.length > 0 && (
        <div className="p-4 bg-black/40 border-t border-rosa-escuro/20 rounded-t-3xl max-w-lg mx-auto w-full space-y-4 shrink-0">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm text-off-white/80">Total do Pedido</span>
            <span className="text-xl font-extrabold text-rosa-escuro">
              {formatarMoeda(valorTotal)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-rosa-escuro text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg hover:opacity-90 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Finalizar Pedido</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}