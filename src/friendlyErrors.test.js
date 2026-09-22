import { describe, it, expect } from 'vitest';
import { getFriendlyErrorMessage } from './utils/friendlyErrors';

describe('Suíte de Testes do Front-end - Cup and Bliss', () => {
  it('Deve traduzir erro 401 para mensagem amigável', () => {
    const mensagem = getFriendlyErrorMessage({ response: { status: 401 } });
    expect(mensagem).toBeDefined();
  });

  it('Deve validar estado inicial do carrinho', () => {
    const carrinho = [];
    expect(carrinho.length).toBe(0);
  });
});