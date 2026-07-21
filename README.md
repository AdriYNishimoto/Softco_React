# SoftCo — Front-end

Interface web da **SoftCo**, uma plataforma de suporte técnico desenvolvida como desafio para a
**Soft Tech**. Este repositório contém a camada de front-end em **React + Vite**: as telas
públicas, a área do usuário e o painel administrativo.

A proposta do produto é reduzir o tempo de atendimento classificando a complexidade dos
chamados e sugerindo respostas. **Este repositório entrega a interface** — a integração com
serviços de IA e o back-end ficam fora dele.

## Telas

| Rota | Tela |
| --- | --- |
| `/` | Home |
| `/login` | Login |
| `/cadastro` | Cadastro de usuário |
| `/esqueci_minha_senha` | Recuperação de senha |

**Área do usuário**

| Rota | Tela |
| --- | --- |
| `/dashboard` | Painel do usuário |
| `/tickets` | Chamados abertos |
| `/chat` | Atendimento por chat |
| `/contato` | Contato |

**Área administrativa**

| Rota | Tela |
| --- | --- |
| `/dashboard_adm` | Painel do administrador |
| `/tickets_adm` | Gestão de chamados |
| `/analise_adm` | Análise de chamados |
| `/chat_adm` | Chat do atendente |

## Stack

- **React 18**
- **Vite 5** — build e dev server
- **React Router 6** — roteamento entre as áreas
- **ESLint 9** — padronização de código

## Como executar

**Pré-requisito:** Node.js 18 ou superior.

```bash
git clone https://github.com/AdriYNishimoto/Softco_React.git
cd Softco_React/SoftcoReact
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | ESLint |

## Estrutura

```
SoftcoReact/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx            # todas as rotas da aplicação
│   ├── components/
│   │   └── HeaderHome/
│   └── pages/
│       ├── Home/  Login/  Cadastro/  EsqueciMinhaSenha/
│       ├── User/             # Dashboard, Tickets, Chat, Contato
│       └── ADM/              # DashboardAdm, TicketsAdm, AnaliseAdm, ChatAdm, ContatoAdm
├── index.html
└── vite.config.js
```

## Status

Projeto acadêmico desenvolvido em equipe. O escopo entregue aqui é a **interface**: as telas
estão navegáveis e estilizadas, ainda sem persistência ou integração com API.

## Próximos passos

- Conectar as telas a uma API real (autenticação e CRUD de chamados)
- Integrar o serviço de classificação de complexidade dos chamados
- Extrair componentes compartilhados entre as áreas de usuário e administrador
