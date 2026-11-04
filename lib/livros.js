import livrosJson from "@/data/livros.json";
import colecoesJson from "@/data/colecoes.json";
import autoresJson from "@/data/autores.json";

// Catálogo mantido em arquivos JSON no próprio repositório (pasta data/).
// Para cadastrar uma obra: adicione um item em data/livros.json e coloque
// o PDF em public/pdf/ e a capa em public/capas/.

function colecaoPorSlug(slug) {
  return colecoesJson.find((c) => c.slug === slug) ?? null;
}

function montarLivro(livro) {
  const colecao = colecaoPorSlug(livro.colecao);
  const vinculos = (livro.autores ?? [])
    .map((v, ordem) => {
      const autor = autoresJson.find((a) => a.slug === v.autor);
      return autor
        ? { ordem, papel: v.papel ?? "autor", autor: { slug: autor.slug, nome: autor.nome } }
        : null;
    })
    .filter(Boolean);

  return {
    ...livro,
    colecao: colecao ? { slug: colecao.slug, nome: colecao.nome } : null,
    colecao_id: colecao ? colecao.id : null,
    vinculos,
  };
}

function publicados() {
  return livrosJson.filter((l) => l.publicado !== false).map(montarLivro);
}

function normalizar(texto) {
  return (texto ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export async function listarLivros({ busca, colecao, ano, ordem = "recentes", limite } = {}) {
  let livros = publicados();

  const termo = normalizar(busca).trim();
  if (termo) {
    livros = livros.filter((l) =>
      [l.titulo, l.subtitulo, l.autor].some((campo) => normalizar(campo).includes(termo))
    );
  }
  if (colecao) livros = livros.filter((l) => l.colecao?.slug === colecao);
  if (ano) livros = livros.filter((l) => l.ano === Number(ano));

  if (ordem === "titulo") livros.sort((a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"));
  else if (ordem === "ano") livros.sort((a, b) => (b.ano ?? 0) - (a.ano ?? 0));
  else livros.sort((a, b) => (b.criado_em ?? "").localeCompare(a.criado_em ?? ""));

  return limite ? livros.slice(0, limite) : livros;
}

export async function listarAnos() {
  const anos = publicados().map((l) => l.ano).filter(Boolean);
  return [...new Set(anos)].sort((a, b) => b - a);
}

export async function listarColecoes() {
  const livros = publicados();
  return [...colecoesJson]
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0) || a.nome.localeCompare(b.nome, "pt-BR"))
    .map((c) => ({ ...c, total: livros.filter((l) => l.colecao?.slug === c.slug).length }));
}

export async function buscarColecao(slug) {
  return colecaoPorSlug(slug);
}

export async function livrosDaColecao(colecaoId, exceto) {
  return publicados().filter((l) => l.colecao_id === colecaoId && l.id !== exceto);
}

export async function listarAutores() {
  const livros = publicados();
  return [...autoresJson]
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    .map((a) => ({
      ...a,
      total: livros.filter((l) => l.vinculos.some((v) => v.autor.slug === a.slug)).length,
    }));
}

export async function buscarAutor(slug) {
  const autor = autoresJson.find((a) => a.slug === slug);
  if (!autor) return null;
  const livros = publicados().filter((l) => l.vinculos.some((v) => v.autor.slug === slug));
  return { ...autor, livros };
}

export async function buscarLivroPorSlug(slug) {
  return publicados().find((l) => l.slug === slug) ?? null;
}

