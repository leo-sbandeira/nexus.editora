-- Execute este script no Supabase: Project > SQL Editor > New query

create extension if not exists "pgcrypto";

create table if not exists livros (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  autor text,
  descricao text,
  capa_url text,
  arquivo_url text not null,
  criado_em timestamptz not null default now()
);

create table if not exists visualizacoes (
  id bigint generated always as identity primary key,
  livro_id uuid not null references livros(id) on delete cascade,
  criado_em timestamptz not null default now()
);

create table if not exists downloads (
  id bigint generated always as identity primary key,
  livro_id uuid not null references livros(id) on delete cascade,
  criado_em timestamptz not null default now()
);

create index if not exists idx_visualizacoes_livro on visualizacoes (livro_id, criado_em);
create index if not exists idx_downloads_livro on downloads (livro_id, criado_em);

-- Segurança: os contadores são públicos por natureza (como em bases de artigos),
-- então permitimos leitura e inserção anônima apenas nessas três tabelas.
alter table livros enable row level security;
alter table visualizacoes enable row level security;
alter table downloads enable row level security;

create policy "livros_leitura_publica" on livros
  for select using (true);

create policy "visualizacoes_leitura_publica" on visualizacoes
  for select using (true);

create policy "visualizacoes_insercao_publica" on visualizacoes
  for insert with check (true);

create policy "downloads_leitura_publica" on downloads
  for select using (true);

create policy "downloads_insercao_publica" on downloads
  for insert with check (true);
