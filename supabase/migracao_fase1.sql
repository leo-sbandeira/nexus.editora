-- Fase 1: coleções, autores, campos de ficha técnica, rascunho/publicado e estatísticas

create table if not exists colecoes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  descricao text,
  ordem smallint not null default 0,
  criado_em timestamptz not null default now()
);

create table if not exists autores (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  minibio text,
  lattes_url text,
  orcid text,
  foto_url text,
  criado_em timestamptz not null default now()
);

alter table livros
  add column if not exists colecao_id uuid references colecoes(id) on delete set null,
  add column if not exists isbn text,
  add column if not exists doi text,
  add column if not exists paginas smallint,
  add column if not exists idioma text default 'Português',
  add column if not exists edicao text,
  add column if not exists licenca text,
  add column if not exists sinopse text,
  add column if not exists sumario text,
  add column if not exists destaque boolean not null default false,
  add column if not exists publicado boolean not null default true;

create table if not exists livros_autores (
  livro_id uuid not null references livros(id) on delete cascade,
  autor_id uuid not null references autores(id) on delete cascade,
  ordem smallint not null default 0,
  papel text not null default 'autor',
  primary key (livro_id, autor_id)
);

create index if not exists idx_livros_colecao on livros (colecao_id);
create index if not exists idx_livros_autores_autor on livros_autores (autor_id);

-- Totais por obra (evita baixar todas as linhas de visualizações e downloads)
create or replace view livros_estatisticas
with (security_invoker = true) as
select
  l.id as livro_id,
  (select count(*) from visualizacoes v where v.livro_id = l.id) as visualizacoes,
  (select count(*) from downloads d where d.livro_id = l.id) as downloads
from livros l;

-- Segurança: leitura pública das novas tabelas
alter table colecoes enable row level security;
alter table autores enable row level security;
alter table livros_autores enable row level security;

create policy "colecoes_leitura_publica" on colecoes for select using (true);
create policy "autores_leitura_publica" on autores for select using (true);
create policy "livros_autores_leitura_publica" on livros_autores for select using (true);

-- Rascunhos não podem ser lidos pelo público
drop policy if exists "livros_leitura_publica" on livros;
create policy "livros_leitura_publica" on livros for select using (publicado = true);
