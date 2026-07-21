# SoftCo — Front-end

Interface web da **SoftCo**, uma plataforma de suporte técnico desenvolvida como desafio para a
**Soft Tech**. Feita em **React + Vite**, com as telas públicas, a área do usuário, o painel
administrativo e a **triagem de chamados com IA generativa**.

A ideia do produto é reduzir o tempo de atendimento: em vez de o atendente ler cada chamado e
decidir manualmente para onde ele vai, a IA classifica a complexidade e já devolve uma resposta
pronta para revisão.

## Triagem com IA (Google Gemini)

Na tela **Análise** (`/analise_adm`), o atendente cola o título e a descrição do chamado. A
integração com o Gemini devolve:

- **Nível 1** — dúvidas de uso, procedimentos padrão, redefinição de senha, primeiro acesso;
  coisas que o atendente resolve pelo roteiro.
- **Nível 2** — erros do sistema, falhas de integração, comportamento inesperado; casos que
  exigem investigação técnica.

Além do nível, a resposta traz a **categoria**, uma **justificativa** da classificação e uma
**resposta sugerida** pronta para copiar e enviar ao cliente.

A comunicação com a API pede `responseMimeType: application/json`, então a resposta já chega
estruturada em vez de texto solto para interpretar.

### Configuração

Crie uma chave no [Google AI Studio](https://aistudio.google.com/apikey) e configure:

```bash
cp .env.example .env.local
```

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
VITE_GEMINI_MODEL=gemini-2.0-flash   # opcional
```

Sem a chave, a tela continua funcionando e exibe um aviso explicando o que falta.

> ⚠️ **Sobre a chave:** o Vite injeta variáveis `VITE_*` no bundle, ou seja, a chave fica
> visível para quem abrir o DevTools. Isso é aceitável neste contexto acadêmico e de
> demonstração, mas **em produção a chamada precisa sair do navegador** e ir para um back-end
> ou serverless function. Por isso toda a comunicação com a API está isolada em
> `src/services/gemini.js` — para migrar, basta trocar a URL do `fetch` pelo seu endpoint.

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
| `/analise_adm` | **Análise de chamados com IA** |
| `/chat_adm` | Chat do atendente |

## Stack

- **React 18**
- **Vite 5** — build e dev server
- **React Router 6** — roteamento entre as áreas
- **Google Gemini** — classificação e sugestão de resposta
- **ESLint 9** — padronização de código

## Como executar

**Pré-requisito:** Node.js 18 ou superior.

```bash
git clone https://github.com/AdriYNishimoto/Softco_React.git
cd Softco_React/SoftcoReact
npm install
cp .env.example .env.local    # preencha a chave do Gemini
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
│   ├── services/
│   │   └── gemini.js         # única porta de saída para a API do Gemini
│   ├── components/
│   │   └── HeaderHome/
│   └── pages/
│       ├── Home/  Login/  Cadastro/  EsqueciMinhaSenha/
│       ├── User/             # Dashboard, Tickets, Chat, Contato
│       └── ADM/              # DashboardAdm, TicketsAdm, AnaliseAdm, ChatAdm, ContatoAdm
├── .env.example
├── index.html
└── vite.config.js
```

## Status

Projeto acadêmico desenvolvido em equipe. A triagem com IA está implementada e funcional; as
demais telas estão navegáveis, ainda sem persistência ou API própria por trás.

## Próximos passos

- Mover a chamada do Gemini para um back-end, tirando a chave do navegador
- Conectar as telas a uma API real (autenticação e CRUD de chamados)
- Alimentar a triagem direto da fila de chamados, sem colar o texto manualmente
- Extrair componentes compartilhados entre as áreas de usuário e administrador
