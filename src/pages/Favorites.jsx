import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoriteContext';
import { useCart } from '../contexts/CartContext';
import { ChevronLeft, Heart, Plus, Trash2 } from 'lucide-react';
import  NavBar  from '../components/Navbar'

export default function Favorites() {
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useFavorites();
  const { adicionarAoCarrinho } = useCart();

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
        <h2 className="text-2xl font-bold text-rosa-escuro">Meus Favoritos</h2>
        <div className="w-7" />
      </div>

      <main className="p-4 max-w-lg mx-auto space-y-4">
        {favoritos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="p-5 bg-rosa-escuro/10 rounded-full text-rosa-escuro">
              <Heart size={48} />
            </div>
            <h2 className="text-lg font-bold text-marrom-escuro">Sem favoritos ainda</h2>
            <p className="text-xs text-gray-500 max-w-xs">
              Toque no ícone de coração dos seus doces preferidos para encontrá-los facilmente aqui!
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 bg-rosa-escuro text-white text-xs font-bold py-3 px-6 rounded-2xl shadow-md hover:opacity-90 transition active:scale-95"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favoritos.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/produto/${prod.id}`, { state: { produto: prod } })}
                className="bg-rosa-escuro p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer relative"
              >
                {/* BOTÃO REMOVER FAVORITO */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(prod);
                  }}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-white transition"
                >
                  <Heart size={16} fill="currentColor" />
                </button>

                <div className="w-full h-28 mb-2 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-marrom-escuro line-clamp-1 text-sm">
                    {prod.nome}
                  </h4>
                  <span className="text-[10px] text-marrom-claro block font-semibold">
                    {prod.categoria}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-extrabold text-marrom-escuro text-xs">
                    {prod.preco}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      adicionarAoCarrinho(prod, 1);
                    }}
                    className="bg-rosa-claro text-marrom-escuro p-1.5 rounded-xl hover:bg-marrom-escuro hover:text-white transition active:scale-95"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <NavBar/>
    </div>
  );
}