export function getFriendlyErrorMessage(error) {
  // Se for uma resposta da API com mensagem personalizada
  const apiMessage = error.response?.data?.error || error.response?.data?.detalhes;

  if (apiMessage) {
    if (apiMessage.includes('Usuário não encontrado') || apiMessage.includes('senha incorreta')) {
      return 'E-mail ou senha incorretos. Por favor, confira os dados e tente novamente.';
    }
    if (apiMessage.includes('E-mail já cadastrado')) {
      return 'Este e-mail já está em uso. Que tal fazer login ou usar outro e-mail?';
    }
    return apiMessage;
  }

  // Mapeamento por status HTTP
  const status = error.response?.status;
  if (status === 401) {
    return 'Sua sessão expirou por segurança. Faça login novamente para continuar!';
  }
  if (status === 404) {
    return 'Ops! O recurso que você procura não foi encontrado.';
  }
  if (status === 500) {
    return 'Estamos enfrentando uma instabilidade temporária em nossos servidores. Tente novamente em instantes!';
  }

  // Caso seja erro de rede/sem conexão
  if (error.message === 'Network Error' || !error.response) {
    return 'Parece que você está offline ou nossa conexão oscilou. Verifique sua internet!';
  }

  return 'Ops! Algo não saiu como esperado. Tente novamente em alguns momentos.';
}