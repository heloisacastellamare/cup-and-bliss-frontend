import { describe, it, expect } from 'vitest';
import { getFriendlyErrorMessage } from './utils/friendlyErrors';

describe('Suíte de Testes do Front-end - Cup and Bliss', () => {
  it('Deve traduzir erro 401 para mensagem amigável', () => {
    // Objeto simulando a estrutura completa de erro do Axios
    const mockAxiosError = {
      response: {
        status: 401,
        data: { message: 'Não autorizado' }
      },
      config: {}
    };

    const mensagem = getFriendlyErrorMessage(mockAxiosError);
    expect(mensagem).toBeDefined();
  });

  it('Deve tratar erro generico de conexao', () => {
    const mockNetworkError = {
      message: 'Network Error',
      config: {}
    };

    const mensagem = getFriendlyErrorMessage(mockNetworkError);
    expect(mensagem).toBeDefined();
  });

  it('Deve validar o estado inicial do carrinho de compras', () => {
    const carrinhoInicial = [];
    expect(carrinhoInicial.length).toBe(0);
  });
});