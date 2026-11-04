const CONECTIVOS = new Set(["de", "da", "do", "das", "dos", "e"]);

function partesNome(nomeCompleto) {
  const partes = (nomeCompleto ?? "").trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return { sobrenome: "", resto: [] };
  const sobrenome = partes[partes.length - 1];
  const resto = partes.slice(0, -1);
  return { sobrenome, resto };
}

function primeiraMaiuscula(texto) {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Endereço público do site, usado nas citações (não depende do endereço de preview da Vercel).
export const URL_BASE = "https://nexuseditoradigital.com.br";

export function enderecoDaObra(livro) {
  return `${URL_BASE}/livros/${livro.slug}`;
}

const MESES_ABNT = [
  "jan.", "fev.", "mar.", "abr.", "maio", "jun.",
  "jul.", "ago.", "set.", "out.", "nov.", "dez.",
];

// Data de acesso no padrão ABNT, por exemplo "4 nov. 2026".
export function dataAcessoABNT(data = new Date()) {
  return `${data.getDate()} ${MESES_ABNT[data.getMonth()]} ${data.getFullYear()}`;
}

function limpar(texto) {
  return texto.replace(/\s+/g, " ");
}

// Cada citação é devolvida em três partes: o título principal vai em negrito.
export function citacaoABNT(livro, acessoEm) {
  const { sobrenome, resto } = partesNome(livro.autor);
  const autorFormatado = sobrenome
    ? `${sobrenome.toUpperCase()}, ${resto.join(" ")}. `
    : "";
  const local = livro.cidade ? `${livro.cidade}: ` : "";
  const editora = livro.editora_nome ?? "Nexus Editora";
  const ano = livro.ano ? `, ${livro.ano}` : "";
  const subtitulo = livro.subtitulo ? `: ${livro.subtitulo}` : "";
  const acesso = acessoEm ? ` Acesso em: ${acessoEm}.` : "";

  return {
    antes: limpar(autorFormatado),
    titulo: livro.titulo,
    depois: limpar(
      `${subtitulo}. ${local}${editora}${ano}. Disponível em: ${enderecoDaObra(livro)}.${acesso}`
    ),
  };
}

export function citacaoAPA(livro) {
  const { sobrenome, resto } = partesNome(livro.autor);
  const iniciais = resto
    .map((parte) =>
      CONECTIVOS.has(parte.toLowerCase()) ? parte.toLowerCase() : `${parte[0].toUpperCase()}.`
    )
    .join(" ");
  const autorFormatado = sobrenome ? `${sobrenome}, ${iniciais} ` : "";
  const ano = livro.ano ? `(${livro.ano})` : "(s.d.)";
  const editora = livro.editora_nome ?? "Nexus Editora";
  const subtitulo = livro.subtitulo ? `: ${primeiraMaiuscula(livro.subtitulo)}` : "";

  return {
    antes: limpar(`${autorFormatado}${ano}. `),
    titulo: livro.titulo,
    depois: limpar(`${subtitulo}. ${editora}. Recuperado de ${enderecoDaObra(livro)}`),
  };
}
