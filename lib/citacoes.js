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

function tituloCompleto(livro) {
  return livro.subtitulo
    ? `${livro.titulo}: ${livro.subtitulo}`
    : livro.titulo;
}

function tituloCompletoApa(livro) {
  return livro.subtitulo
    ? `${livro.titulo}: ${primeiraMaiuscula(livro.subtitulo)}`
    : livro.titulo;
}

export function citacaoABNT(livro) {
  const { sobrenome, resto } = partesNome(livro.autor);
  const autorFormatado = sobrenome
    ? `${sobrenome.toUpperCase()}, ${resto.join(" ")}.`
    : "";
  const local = livro.cidade ? `${livro.cidade}: ` : "";
  const editora = livro.editora_nome ?? "Nexus Editora";
  const ano = livro.ano ? `, ${livro.ano}` : "";

  return `${autorFormatado} ${tituloCompleto(livro)}. ${local}${editora}${ano}.`.replace(
    /\s+/g,
    " "
  );
}

export function citacaoAPA(livro) {
  const { sobrenome, resto } = partesNome(livro.autor);
  const iniciais = resto
    .map((parte) =>
      CONECTIVOS.has(parte.toLowerCase()) ? parte.toLowerCase() : `${parte[0].toUpperCase()}.`
    )
    .join(" ");
  const autorFormatado = sobrenome ? `${sobrenome}, ${iniciais}` : "";
  const ano = livro.ano ? `(${livro.ano})` : "(s.d.)";
  const editora = livro.editora_nome ?? "Nexus Editora";

  return `${autorFormatado} ${ano}. ${tituloCompletoApa(livro)}. ${editora}.`.replace(
    /\s+/g,
    " "
  );
}
