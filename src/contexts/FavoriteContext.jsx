import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('@CupAndBliss:token');

    if (!token) {
      setFavoritos([]);
      return;
    }

    api.get('/favoritos')
      .then((response) => {
        const produtos = response.data;
        setFavoritos(produtos.map((produto) => ({
          ...produto,
          imagem: produto.imagem || produto.imagem_url,
        })));
      })
      .catch((error) => console.error('Erro ao buscar favoritos:', error));
  }, [location.pathname]);

  const toggleFavorito = async (produto) => {
    const token = localStorage.getItem('@CupAndBliss:token');
    if (!token) {
      throw new Error('Faça login para adicionar produtos aos favoritos.');
    }

    const existe = favoritos.some((item) => item.id === produto.id);

    if (existe) {
      await api.delete(`/favoritos/${produto.id}`);
    } else {
      await api.post('/favoritos', { produto_id: produto.id });
    }

    setFavoritos((atuais) => {
      if (existe) return atuais.filter((item) => item.id !== produto.id);
      return [...atuais, { ...produto, imagem: produto.imagem || produto.imagem_url }];
    });
  };

  const isFavorito = (id) => {
    return favoritos.some((item) => item.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoriteProvider');
  }
  return context;
}