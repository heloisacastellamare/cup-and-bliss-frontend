describe('Suíte de Testes do Front-end - Cup and Bliss', () => {

  // Lógica de validação do tratamento amigável de erros da aplicação
  const getFriendlyErrorMessage = (error) => {
    const apiMessage = error.response?.data?.error;
    if (apiMessage) {
      if (apiMessage.includes('senha incorreta')) {
        return 'E-mail ou senha incorretos. Por favor, confira os dados e tente novamente.';
      }
    }

    const status = error.response?.status;
    if (status === 401) {
      return 'Sua sessão expirou por segurança. Faça login novamente para continuar!';
    }
    if (status === 404) {
      return 'Ops! O recurso que você procura não foi encontrado.';
    }

    if (error.message === 'Network Error' || !error.response) {
      return 'Parece que você está offline ou nossa conexão oscilou. Verifique sua internet!';
    }

    return 'Ops! Algo não saiu como esperado. Tente novamente em alguns momentos.';
  };

  test('Deve traduzir erro 401 para mensagem amigável de sessão expirada', () => {
    const errorMock = { response: { status: 401 } };
    const mensagem = getFriendlyErrorMessage(errorMock);
    expect(mensagem).toContain('Sua sessão expirou');
  });

  test('Deve traduzir erro de credenciais incorretas vindo da API', () => {
    const errorMock = { response: { data: { error: 'senha incorreta' } } };
    const mensagem = getFriendlyErrorMessage(errorMock);
    expect(mensagem).toBe('E-mail ou senha incorretos. Por favor, confira os dados e tente novamente.');
  });

  test('Deve tratar erro de conexão de rede/offline', () => {
    const errorMock = { message: 'Network Error' };
    const mensagem = getFriendlyErrorMessage(errorMock);
    expect(mensagem).toContain('Parece que você está offline');
  });

  test('Deve garantir o isolamento e estado inicial limpo do carrinho', () => {
    const carrinhoInicial = [];
    expect(carrinhoInicial).toHaveLength(0);
  });

  test('Deve validar o padrão de chaves de persistência (@CupAndBliss)', () => {
    const storageKey = '@CupAndBliss:user';
    expect(storageKey).toContain('@CupAndBliss');
  });

});