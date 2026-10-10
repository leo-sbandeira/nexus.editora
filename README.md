# Nexus Editora

Site da Nexus Editora: catálogo de obras em PDF, gratuitas para download, com
contadores públicos de visualizações e downloads (total e por mês).

## Stack

- **Next.js** (App Router), site e rotas de API
- **Supabase**, banco de dados (Postgres) com os contadores e o catálogo
- **Vercel**, hospedagem e deploy automático a cada push no GitHub
- **Tailwind CSS** + **Recharts**, estilo e gráfico mensal

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta / novo projeto.
2. No painel do projeto, vá em **SQL Editor** → **New query**, cole o conteúdo
   do arquivo [`supabase/schema.sql`](./supabase/schema.sql) e execute. Isso
   cria as tabelas `livros`, `visualizacoes` e `downloads`.
3. Vá em **Project Settings → API** e copie:
   - **Project URL**
   - **anon public key**

## 2. Configurar as variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha com os valores do
passo anterior:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Ao publicar na Vercel, adicione as mesmas duas variáveis em
**Project Settings → Environment Variables**.

## 3. Cadastrar os livros

Por enquanto o cadastro é feito direto no Supabase (**Table editor → livros
→ Insert row**), com os campos:

| campo         | descrição                                             |
|---------------|--------------------------------------------------------|
| `slug`        | identificador na URL, ex: `contabilidade-ambiental`     |
| `titulo`      | título do livro                                         |
| `autor`       | nome do autor (opcional)                                |
| `descricao`   | resumo curto (opcional)                                 |
| `capa_url`    | link da imagem de capa (opcional, sem ela, mostra o título) |
| `arquivo_url` | link direto do PDF (ex: um arquivo no Supabase Storage) |

Para hospedar os PDFs: em **Storage**, crie um bucket público (ex:
`livros-pdf`), suba os arquivos e copie o link público de cada um para o
campo `arquivo_url`.

## 4. Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## 5. Publicar

O repositório já está conectado ao GitHub. Basta importar o repositório na
Vercel (vercel.com → Add New → Project), configurar as variáveis de ambiente
do passo 2, e o deploy acontece automaticamente a cada push.

Depois, em **Project Settings → Domains** na Vercel, adicione o domínio
`nexuseditoradigital.com.br` (registrado no Registro.br) e siga as instruções
de DNS mostradas pela própria Vercel.

## Como funcionam os contadores

- Cada vez que a página de um livro é aberta, uma linha é inserida na tabela
  `visualizacoes`.
- Cada clique em "Baixar PDF" passa pela rota `/api/download`, que registra
  uma linha em `downloads` e só então redireciona para o arquivo.
- Os totais e o gráfico mensal (últimos 6 meses) são calculados a partir
  dessas duas tabelas, em tempo real, a cada carregamento da página.

## Atualização da Fase 1 (coleções, autores e ficha técnica)

Antes de publicar esta versão, execute no Supabase (SQL Editor) o arquivo
[`supabase/migracao_fase1.sql`](./supabase/migracao_fase1.sql). Ele cria as
tabelas `colecoes`, `autores` e `livros_autores`, os campos de ficha técnica
em `livros` (ISBN, DOI, páginas, edição, licença, sinopse, sumário, rascunho)
e a visão `livros_estatisticas`. Os dados existentes são preservados.

Para esconder uma obra do site enquanto ela não está pronta, deixe
`publicado = false` na linha dela.
