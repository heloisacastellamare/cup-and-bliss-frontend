import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setFavoritos([]);
      return;
    }

    fetch('http://localhost:5000/api/favoritos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Não foi possível buscar os favoritos.');
        return response.json();
      })
      .then((produtos) => {
        setFavoritos(produtos.map((produto) => ({
          ...produto,
          imagem: produto.imagem || produto.imagem_url,
        })));
      })
      .catch((error) => console.error('Erro ao buscar favoritos:', error));
  }, [location.pathname]);

  const toggleFavorito = async (produto) => {
    const token = localStorage.getItem('token');
    const existe = favoritos.some((item) => item.id === produto.id);
    const metodo = existe ? 'DELETE' : 'POST';
    const url = existe
      ? `http://localhost:5000/api/favoritos/${produto.id}`
      : 'http://localhost:5000/api/favoritos';

    const response = await fetch(url, {
      method: metodo,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(metodo === 'POST' ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(metodo === 'POST' ? { body: JSON.stringify({ produto_id: produto.id }) } : {}),
    });

    if (!response.ok) {
      throw new Error('Não foi possível atualizar o favorito.');
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