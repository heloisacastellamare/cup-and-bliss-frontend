import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Search, Sparkles, Plus, Star, Flame, X, CheckCircle, Check} from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import api from '../services/api'

export default function Home({ onSelecionarProduto }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [notificacao, setNotificacao] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [doceDoDia, setDoceDoDia] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const { adicionarAoCarrinho } = useCart()

  const abrirDetalhes = (produto) => {
    navigate(`/produto/${produto.id}`, {state: {produto}})
  }
  
  const categorias = ['Todos', 'Cupcakes', 'Fatias', 'Copos da Felicidade', 'Bebidas'];

  useEffect(() => {
    const adaptarProduto = (produto) => ({
      ...produto,
      imagem: produto.imagem_url,
      preco: Number(produto.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    });

    Promise.all([
      api.get('/produtos'),
      api.get('/produtos/doce-do-dia')
    ])
      .then(async ([produtosResponse, doceResponse]) => {

        setProdutos(produtosResponse.data.map(adaptarProduto))

        if (doceResponse.data) {
          setDoceDoDia(adaptarProduto(doceResponse.data))
        }
      })
      .catch((error) => {
        const mensagem = error.response?.data?.error || 'Não foi possível carregar o cardápio';
        setNotificacao(error.message)
      })
  }, []);

  // Filtro corrigido por Categoria e Busca
  const listaParaExibir = produtos.filter((prod) => {
    const bateuCategoria = categoriaAtiva === 'Todos' || prod.categoria === categoriaAtiva;
    const bateuBusca = prod.nome.toLowerCase().includes(busca.toLowerCase());
    return bateuCategoria && bateuBusca;
  });

  const [adicionadoId, setAdicionadoId] = useState(null)

  const handleAdicionarRapido = (e, produto) => {
      e.stopPropagation()

      adicionarAoCarrinho(produto, 1)
  
      setNotificacao(`${produto.nome} adicionado ao carrinho!`)

      setAdicionadoId(produto.id)

      setTimeout(() => {
        setNotificacao(null)
        setAdicionadoId(null)
      }, 4000);
  }

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto bg-off-white pb-20 relative font-corpo">
      <Header />

      {/* NOTIFICAÇÃO */}
      {notificacao && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-marrom-escuro text-white px-4 py-3 rounded-2xl shadow-2xl  flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={20} className="text-rosa-escuro shrink-0" />
            <span className="text-xs font-semibold">{notificacao}</span>
          </div>
          <button 
            onClick={() => setNotificacao(null)}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <main className="px-3 space-y-4 sm:m-6 sm:pt-4">
        {/* CARD DOCE DO DIA */}
        <section className="pt-2">
          {doceDoDia && (
          <div
            onClick={() => abrirDetalhes(doceDoDia)}
            className="bg-marrom-escuro rounded-xl flex items-center gap-4 p-5 shadow-lg cursor-pointer"
          >
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="font-title-2 text-white text-3xl sm:text-4xl">Doce do Dia!</h2>
              </div>

              <span className="text-sm text-rosa-escuro font-corpo block">
                {doceDoDia.nome}
              </span>

              <div className="flex items-center gap-3">
                <div className="text-off-white bg-rosa-escuro font-bold font-corpo p-1 px-3 rounded-xl">
                  <span>{doceDoDia.preco}</span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    abrirDetalhes(doceDoDia)
                  }}
                  className="bg-rosa-escuro text-off-white p-1 rounded-xl hover:opacity-90 transition active:scale-95"
                >
                  <Plus size={24} className="block mx-auto" />
                </button>
              </div>
            </div>

            <div className="w-24 h-24 sm:w-30 sm:h-30 shrink-0">
              <img 
                src={doceDoDia.imagem} 
                alt={doceDoDia.nome} 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
          </div>
          )}
        </section>

        {/* BARRA DE PESQUISA */}
        <div className="relative">
          <div className="absolute inset-y-0 pl-3.5 flex items-center pointer-events-none text-white">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="O que você procura hoje?"
            style={{ paddingLeft: '2.75rem' }}
            className="w-full h-11 bg-marrom-escuro rounded-xl text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rosa-escuro/50 focus:border-rosa-escuro shadow-sm transition"
          />
        </div>

        {/* BARRA DE CATEGORIAS (Corrigido overflow-x-auto com touch suave no mobile) */}
        <section className="w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 no-scrollbar touch-pan-x">
            {categorias.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategoriaAtiva(cat)} 
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  categoriaAtiva === cat 
                    ? 'bg-rosa-escuro text-white shadow-md scale-105' 
                    : 'bg-white text-marrom-escuro border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* GRID DE PRODUTOS */}
        <section className="font-corpo">
          <h3 className="text-lg font-bold text-rosa-escuro mb-3">
            {categoriaAtiva === 'Todos' ? 'Cardápio' : categoriaAtiva}
          </h3>

          {listaParaExibir.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              Nenhum produto encontrado nesta categoria.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {listaParaExibir.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => abrirDetalhes(prod)}
                  className="bg-rosa-escuro p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >

                  <div className="w-full h-28 mb-2 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={prod.imagem}
                      alt={prod.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-marrom-escuro line-clamp-1 text-sm sm:text-base">
                      {prod.nome}
                    </h4>
                    <span className="text-[10px] text-marrom-claro block font-semibold">
                      {prod.categoria}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-extrabold text-marrom-escuro text-xs sm:text-sm">
                      {prod.preco}
                    </span>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}