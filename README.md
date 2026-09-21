# ☕ Cup and Bliss — E-commerce & Cafeteria

> **Projeto Acadêmico** desenvolvido como parte dos requisitos para a disciplina/curso de **Engenharia de Software / Cruzeiro do Sul**.

---

## 🎓 Sobre o Projeto

O **Cup and Bliss** é uma aplicação web *full-stack* desenvolvida para fins acadêmicos com o objetivo de simular um ambiente real de e-commerce e cardápio digital para uma cafeteria e doceria. 

A aplicação oferece desde a navegação livre pelo cardápio digital em formato de visitante (*Guest Mode*) até o fluxo completo de autenticação, gestão de perfil de usuário e finalização de compras no checkout com validação de dados.

> ℹ️ **Nota Acadêmica:** Este software é um protótipo com fins puramente educacionais de aprendizagem em desenvolvimento de software web, não possuindo fins comerciais.

---

## 🎯 Objetivo do Projeto e Contextualização (PIT)

Este repositório é o entregável prático do **Projeto Integrador Transdisciplinar (PIT)** e tem como objetivo resolver **três situações-problema** encadeadas para a entrega de uma solução de software funcional, testada e documentada para a marca **Cup and Bliss**:

### 📌 Resolução das Situações-Problema do PIT

1. **Atualização do Plano de Projeto e Desenvolvimento da Solução Funcional:**
   * Transição do planejamento teórico para a implementação do código funcional.
   * Construção de uma arquitetura *Full-Stack* robusta conectando a interface em React a um servidor em nuvem (Render) com consumo de dados via Axios.

2. **Aceleração e Produtividade no Front-End:**
   * Utilização de ecossistema moderno com componentes reutilizáveis e estilização ágil via Tailwind CSS para acelerar o desenvolvimento da interface sem perder qualidade e padrão visual.
   * Foco total na experiência do usuário (UI/UX) com suporte ao modo visitante (*Guest Mode*), mensagens amigáveis de erro e layout responsivo.

3. **Testes de Integração, Correção de Bugs e Validação em Pares:**
   * Mapeamento, identificação e resolução de bugs críticos de integração (alinhamento das rotas de API, padronização do `localStorage` sob o prefixo `@CupAndBliss:`, eliminação de trechos de código inacessíveis e tratamento de respostas HTTP).
   * Validação dos fluxos de ponta a ponta (Autenticação → Cardápio → Perfil → Checkout) e consolidação da documentação técnica e Laudo de QA para o encerramento do projeto.
---

## 💻 Tecnologias Utilizadas

### **Front-end**
* **React.js (Vite):** Biblioteca principal para a interface do usuário.
* **Tailwind CSS & CSS3:** Estilização responsiva e customizada.
* **Axios:** Cliente HTTP com instância centralizada para consumo da API.
* **React Router DOM:** Gerenciamento de rotas do lado do cliente.
* **Lucide React:** Biblioteca de ícones modernos.
* **Vercel:** Hospedagem e deploy contínuo do front-end.

### **Back-end**
* **Node.js & Express:** API RESTful para regras de negócio e rotas.
* **JSON Web Token (JWT):** Autenticação segura de usuários.
* **Render:** Hospedagem do servidor e da API em nuvem.

---

## ✨ Funcionalidades do Sistema

### 🛍️ **Navegação & Carrinho**
* **Modo Visitante (*Guest Mode*):** Permite explorar produtos e montar carrinho sem obrigatoriedade de login imediato.
* **Carrinho Dinâmico:** Atualização de quantidades, adição/remoção e cálculo de totais em tempo real.
* **Isolamento de Estado:** Limpeza automática do carrinho ao realizar logout ou alternar contas.

### 🔐 **Autenticação & Segurança**
* **Redirecionamento Inteligente:** Solicitação de autenticação no momento do checkout com retorno automático à compra.
* **Acessibilidade no Login:** Toggle de visibilidade da senha com contraste ajustado (`text-white`).

### 👤 **Perfil do Cliente**
* **Gestão de Perfil:** Edição de dados pessoais e endereço de entrega via requisições `PUT`.
* **Histórico de Pedidos:** Consulta aos pedidos realizados pelo usuário.

### 🎨 **Tratamento de Erros e Usabilidade**
* **Mensagens Amigáveis:** Tradução de erros técnicos HTTP em alertas amigáveis ao usuário final (`friendlyErrors.js`).

---

## 📁 Estrutura de Arquivos e Pastas

### 💻 **Front-end (`src/`)**
```text
cup-and-bliss/
├── public/                 # Recursos estáticos públicos (logos, favicons)
├── src/
│   ├── assets/             # Mídias e imagens importadas pelos componentes
│   ├── components/         # Componentes reutilizáveis (ErrorMessage, Navbar, Footer)
│   ├── contexts/           # React Context (CartContext)
│   ├── pages/              # Telas (Home, Login, Register, Checkout, Profile)
│   ├── services/           # Configuração do Axios (api.js)
│   ├── utils/              # Funções utilitárias (friendlyErrors.js)
│   ├── App.jsx             # Definição e proteção de rotas
│   └── main.jsx            # Ponto de entrada do React
```

### 🗄️ **Back-end (`server/`)**
```text
cup-and-bliss-backend/
├── config/                 # Conexão com banco de dados
├── src/
│   ├── controllers/        # Lógica de negócio (authController, orderController)
│   ├── middlewares/        # Proteção de rotas com JWT (authMiddleware)
│   ├── models/             # Esquemas de dados (User, Product, Order)
│   └── routes/             # Endpoints REST (/auth, /produtos, /pedidos)
└── server.js               # Inicialização do servidor Express
```

---

## 🚀 **Como executar o projeto localmente:**

1. **Clone o repositório**
* `git clone [https://github.com/heloisacastellamare/cup-and-bliss-frontend]`

2. **Acesse a pasta do projeto**
* `cd cup-and-bliss`

3. **Instale as dependências**
* `npm install`

4. **Inicie o servidor de desenvolvimento**
* `npm run dev`

---

## 👩‍🦰 Autora & Créditos

* Projeto desenvolvido para fins acadêmicos por **Heloisa Gabriela**

Instituição: Cruzeiro do Sul Virtual

Ano: 2026
