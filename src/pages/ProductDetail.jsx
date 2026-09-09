import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, CheckCircle, ChevronLeft, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoriteContext'

export default function DetalhesProduto({onVoltar, onAdicionarAoCarrinho }) {
  const [quantidade, setQuantidade] = useState(1);
  const [notificacao, setNotificacao] = useState(null);
  const navigate = useNavigate()
  const location = useLocation()

  const { adicionarAoCarrinho } = useCart();
  const { toggleFavorito, isFavorito } = useFavorites()

  const produto = location.state?.produto

  // Produto padrão de fallback (caso precise testar isolado)
  const item = produto || {
    
  };

  const ehFavorito = isFavorito ? isFavorito(item.id) : false;

  const incrementar = () => setQuantidade((prev) => prev + 1);
  const decrementar = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  // Converte preço formatado em string (ex: "R$ 18,90") para número puro para cálculo
  const obterPrecoNumerico = (preco) => {
    if (typeof preco === 'number') return preco;
    if (!preco) return 0;
    return parseFloat(preco.replace('R$', '').replace(',', '.').trim()) || 0;
  };

  const precoUnitario = obterPrecoNumerico(item.preco);
  const precoTotal = (precoUnitario * quantidade).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleAdicionar = () => {
    adicionarAoCarrinho(item, quantidade)

    setNotificacao(`${quantidade}x ${item.nome} adicionado(s) ao carrinho!`);
    setTimeout(() => {
      setNotificacao(null);
    }, 3000);
  };

  const handleToggleFavorito = () => {
    toggleFavorito(item);
    setNotificacao(
      isFavorito
        ? `${item.nome} removido dos favoritos!`
        : `${item.nome} adicionado aos favoritos!`
    );
    setTimeout(() => {
      setNotificacao(null);
    }, 2500);

  }

  return (
  <div className="fixed inset-0 z-50 min-h-screen bg-marrom-escuro font-corpo flex flex-col justify-between overflow-y-auto">
    {/* NOTIFICAÇÃO (TOAST) */}
    {notificacao && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-marrom-escuro text-white px-4 py-3 rounded-2xl shadow-2xl border border-rosa-escuro/30 flex items-center gap-2.5 animate-bounce">
        <CheckCircle size={20} className="text-rosa-escuro shrink-0" />
        <span className="text-xs font-semibold">{notificacao}</span>
      </div>
    )}

    {/* SEÇÃO SUPERIOR: IMAGEM DO PRODUTO (ENCOSTADA NO TOPO) */}
    <div className="relative w-full max-w-lg mx-auto h-72 shrink-0">
      <img
        src={item.imagem}
        alt={item.nome}
        className="w-full h-full object-cover"
      />

      {/* BOTÃO VOLTAR FLUTUANTE */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 bg-marrom-escuro/80 text-white p-2.5 rounded-full shadow-lg backdrop-blur-sm transition active:scale-95 flex items-center justify-center hover:bg-marrom-escuro"
      >
        <ChevronLeft size={22} />
      </button>

      <button
          onClick={handleToggleFavorito}
          className="absolute top-4 right-4 z-10 bg-marrom-escuro/80 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition active:scale-90 flex items-center justify-center hover:bg-marrom-escuro"
        >
          <Heart
            size={22}
            className={
              ehFavorito
                ? 'text-rosa-escuro fill-rosa-escuro'
                : 'text-white'
            }
          />
        </button>

      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />
    </div>

    {/* SEÇÃO INFERIOR: CONTEÚDO E BARRAS ENCOSTADAS NO RODAPÉ */}
    <div className="-mt-6 relative z-20 flex-1 bg-marrom-escuro rounded-t-3xl p-6 flex flex-col justify-between max-w-lg mx-auto w-full">
      {/* TEXTOS DO PRODUTO */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-rosa-escuro leading-tight">
          {item.nome}
        </h1>

        <p className="text-xs text-off-white leading-relaxed font-corpo opacity-90 uppercase tracking-wide">
          {item.descricao || 'O cupcake é preparado com farinha de trigo especial, açúcar refinado, ovos frescos, manteiga sem sal, cacau em pó 100%, chocolate meio amargo, fermento químico, leite integral, creme de leite e finalizado com confeitos e calda de chocolate. IMAGEM MERAMENTE ILUSTRATIVA.'}
        </p>
      </div>

      {/* CONTROLE DE QUANTIDADE + BOTÃO ADICIONAR (NO RODAPÉ DA TELA) */}
      <div className="pt-6 mt-auto flex items-center justify-between gap-4">
        {/* CONTROLE DE QUANTIDADE */}
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-rosa-escuro/60 w-36">
          <button
            onClick={decrementar}
            disabled={quantidade <= 1}
            className="text-white text-lg font-bold disabled:opacity-40 hover:opacity-80 transition active:scale-95"
          >
            -
          </button>
          
          <span className="font-bold text-base text-white">
            {quantidade}
          </span>

          <button
            onClick={incrementar}
            className="text-white text-lg font-bold hover:opacity-80 transition active:scale-95"
          >
            +
          </button>
        </div>

        {/* BOTÃO ADICIONAR */}
        <button
          onClick={handleAdicionar}
          className="flex-1 bg-rosa-escuro text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:opacity-90 transition active:scale-95 text-center"
        >
          Adicionar
        </button>
      </div>
    </div>
  </div>
);
}