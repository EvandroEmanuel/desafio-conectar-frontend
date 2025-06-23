# 💻 Desafio Conectar - Frontend

Este repositório contém o desenvolvimento do **frontend** do Desafio Conectar, utilizando **Next.js** com **React**, com foco em performance, organização de código e escalabilidade.

---

## 🎯 Estratégia e Planejamento

A aplicação foi estruturada com base nos seguintes pilares:

- **Componentização**: separação clara entre componentes reutilizáveis e páginas.
- **Organização de pastas**: seguindo a arquitetura recomendada pelo Next.js (App Router).
- **Consistência visual**: uso de Tailwind CSS e componentes reutilizáveis para UI.
- **Separação de responsabilidades**: camadas bem definidas entre UI, lógica de negócio e integração com API.
- **Performance e SEO**: aproveitamento dos recursos nativos do Next.js como SSR e SSG, garantindo carregamento rápido e indexação por mecanismos de busca.

---

## 🚀 Funcionalidades

- Tela de login com autenticação via API
- Registro de novos usuários
- Página de dashboard protegida
- Gerenciamento de perfil
- Controle de acesso com base na role (`admin` e `user`)
- Gerenciamento de usuários (admin)
- Integração com API externa (backend)
- Armazenamento seguro de token e dados do usuário

---

## 🧰 Tecnologias utilizadas

- **[Next.js](https://nextjs.org/)** — Framework React com suporte a SSR/SSG, App Router e otimizações automáticas.
- **React 18** — Biblioteca principal de construção da UI.
- **TypeScript** — Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS** — Utilitário CSS para construção rápida e responsiva de estilos.
- **Axios** — Cliente HTTP para requisições à API.
- **Zod** — Validação de dados em formulários.
- **JWT** — Autenticação baseada em tokens.
- **Lucide React** — Ícones modernos e leves.
- **ESLint + Prettier** — Padronização e qualidade de código.

---

## 💡 Por que Next.js com React?

- **Renderização híbrida (SSR, SSG e CSR)** que se adapta às necessidades de performance e SEO.
- **Roteamento nativo com App Router**, facilitando a navegação entre páginas com layouts dinâmicos.
- **Melhor DX (Developer Experience)** com recursos como `API Routes`, `Middleware`, `Static Files`, e integração fácil com Vercel.
- **Escalável e pronto para produção**, com suporte direto da Vercel.

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/EvandroEmanuel/desafio-conectar-frontend.git
cd desafio-conectar-frontend
```

### 2. Instale as dependências

```bash
pnpm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=https://sua-api-no-render.com
```

> Substitua pela URL real da sua API backend hospedada (por exemplo, Render, Railway, etc.)

### 4. Rode o projeto localmente

```bash
pnpm dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`.
login ADMIN: admin@email.com
senha: 12345
login USER: user@email.com
senha:12345

---

## ⚙️ COMO RODAR O PROJETO AO VIVO

O projeto estará disponível em `https://desafio-conectar-frontend-pi.vercel.app`.
login ADMIN: admin@email.com
senha: 12345
login USER: user@email.com
senha:12345

---

## 🌐 Deploy

Este projeto pode ser facilmente hospedado na [Vercel](https://vercel.com), com integração direta com o GitHub. Ao fazer push para o repositório, a Vercel faz o deploy automático.

---

📝 Justificativa — Melhoria com Integração à API do Google
Durante o desenvolvimento do projeto, foi identificado o potencial de melhoria e valor agregado por meio da integração com a API do Google — seja para autenticação (Google OAuth), serviços de geolocalização (Google Maps), ou outro recurso específico.

Entretanto, devido à limitação de tempo estabelecida no escopo inicial do desafio, optamos por priorizar funcionalidades essenciais como a autenticação tradicional, o controle de acesso por perfil de usuário, e a estrutura base do dashboard.

A integração com a API do Google permanece no roadmap de melhorias futuras, uma vez que oferece:

Melhor experiência ao usuário (ex: login simplificado com Google)

Acesso a funcionalidades avançadas (ex: localização, autocomplete, mapas)

Redução de atrito na jornada do usuário

Reforço que a arquitetura da aplicação já foi pensada de forma modular e escalável, de modo que a adição dessa funcionalidade pode ser feita facilmente em ciclos futuros, sem comprometer a base atual do sistema.

## 🛠️ Melhorias futuras

- Login com Google
- Upload de imagem de perfil
- Melhorias de acessibilidade

---

## 🧑‍💻 Autor

Evandro Emanoel  
[GitHub - @EvandroEmanuel](https://github.com/EvandroEmanuel)
