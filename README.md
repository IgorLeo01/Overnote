# **Overnote**

**Overnote** é uma aplicação de anotações onde os usuários podem criar, editar e gerenciar notas de forma simples e eficiente. As notas podem ser privadas ou públicas, permitindo que os usuários compartilhem suas anotações com outros.

**Deploy da aplicação: overnoteapp.netlify.app**

## **Funcionalidades principais**
- **Editor WYSIWYG** (What You See Is What You Get) para a criação e edição de notas.
- **Autosave**: As notas são salvas automaticamente a cada 3 segundos durante a edição.
- **Privacidade de Notas**: As notas podem ser públicas ou privadas.
- **Feed de Notas**: Visualização de notas do usuário e notas públicas no feed.
- **Links Públicos**: Geração de links para acesso público às notas.
- **Edição de Notas**: Acesso para edição de notas no feed do usuário.
- **Autenticação**: Sistema de login utilizando NextAuth para autenticação de usuários.

## **Tecnologias Utilizadas**
- **Frontend**:
  - **Next.js 14+** com **App Directory** (novo recurso do Next.js).
  - **React** para componentes dinâmicos.
  - **Tiptap** para editor de texto (WYSIWYG).
  - **Tailwind CSS** para estilização.
  - **React Query** para gerenciamento de estado e requisições assíncronas.
  - **NextAuth.js** para autenticação.

- **Backend**:
  - **Prisma ORM** para manipulação de banco de dados.
  - **PostgreSQL** como banco de dados relacional.
  - **API Routes** no Next.js para manipulação de dados.
 
## **Estrutura de pastas**

```
├── app/                   # Contém as páginas principais do Next.js (App Directory)
│   ├── api/               # API Routes para manipulação dos dados (Notas, Usuários, etc.)
│   ├── notes/             # Páginas de visualização e edição de notas
│   ├── layout.tsx         # Layout principal da aplicação
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis da UI (Card, Button, Toolbar, etc.)
├── lib/                   # Bibliotecas auxiliares (como a configuração do Prisma)
├── prisma/                # Arquivos de migração e configuração do Prisma
├── public/                # Arquivos públicos (como imagens e ícones)
├── styles/                # Arquivos CSS (usando Tailwind)
├── .env                   # Arquivo de configuração de variáveis de ambiente
├── package.json           # Dependências e scripts do projeto
└── tsconfig.json          # Configurações do TypeScript
```
## **Passos para Executar a Aplicação Localmente**


### 1. **Clone o Repositório**

Clone o repositório para o seu diretório local:

```bash
git clone https://github.com/IgorLeo01/Overnote
```

### 2. **Instale as dependências**

```bash
cd overnote
npm install
```
### 3. **Siga o env.example para setar seu .env com as váriaveis de ambiente**

```bash
POSTGRES_PASSWORD="pass"
POSTGRES_USER="admin"
POSTGRES_DB="main"

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

AUTH_SECRET="chave-secreta-para-auth"
```

### 4. **Rode as migrations do prisma**

```bash
npx prisma migrate dev
```

### 5. **Rode a aplicação**

```bash
npm run dev
```
**Isso irá iniciar a aplicação no modo de desenvolvimento. Acesse no navegador em http://localhost:3000.**


# Desafio Técnico Dev Fullstack - Overlens

Disponível em: [desafio-tecnico.md](./desafio-tecnico.md)

