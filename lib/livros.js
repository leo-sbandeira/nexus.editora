import { supabase } from "./supabaseClient";

const CAMPOS_CARD =
  "id, slug, titulo, subtitulo, autor, ano, capa_url, destaque, criado_em, colecao:colecoes(slug, nome)";

function limparBusca(texto) {
  // Remove caracteres que têm significado especial nos filtros do PostgREST
  return (texto ?? "").replace(/[,()%*\\]/g, " ").trim();
}

export async function listarLivros({
  busca,
  colecao,
  ano,
  ordem = "recentes",
  limite,
} = {}) {
  const campos = colecao
    ? CAMPOS_CARD.replace("colecoes(slug, nome)", "colecoes!inner(slug, nome)")
    : CAMPOS_CARD;

  let consulta = supabase.from("livros").select(campos);

  const termo = limparBusca(busca);
  if (termo) {
    consulta = consulta.or(
      `titulo.ilike.%${termo}%,subtitulo.ilike.%${termo}%,autor.ilike.%${termo}%`
    );
  }
  if (colecao) consulta = consulta.eq("colecoes.slug", colecao);
  if (ano) consulta = consulta.eq("ano", Number(ano));

  if (ordem === "titulo") consulta = consulta.order("titulo", { ascending: true });
  else if (ordem === "ano") consulta = consulta.order("ano", { ascending: false });
  else consulta = consulta.order("criado_em", { ascending: false });

  if (limite) consulta = consulta.limit(limite);

  const { data, error } = await consulta;
  if (error) {
    console.error("Erro ao listar livros:", error.message);
    return [];
  }
  return data ?? [];
}

export async function listarAnos() {
  const { data } = await supabase
    .from("livros")
    .select("ano")
    .not("ano", "is", null)
    .order("ano", { ascending: false });
  return [...new Set((data ?? []).map((l) => l.ano))];
}

export async function listarColecoes() {
  const { data, error } = await supabase
    .from("colecoes")
    .select("id, slug, nome, descricao, ordem, livros(count)")
    .order("ordem", { ascending: true })
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao listar coleções:", error.message);
    return [];
  }
  return (data ?? []).map((c) => ({
    ...c,
    total: c.livros?.[0]?.count ?? 0,
  }));
}

export async function buscarColecao(slug) {
  const { data } = await supabase
    .from("colecoes")
    .select("id, slug, nome, descricao")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}

export async function livrosDaColecao(colecaoId, exceto) {
  let consulta = supabase
    .from("livros")
    .select(CAMPOS_CARD)
    .eq("colecao_id", colecaoId)
    .order("criado_em", { ascending: false });
  if (exceto) consulta = consulta.neq("id", exceto);
  const { data } = await consulta;
  return data ?? [];
}

export async function listarAutores() {
  const { data, error } = await supabase
    .from("autores")
    .select("id, slug, nome, minibio, foto_url, livros_autores(count)")
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao listar autores:", error.message);
    return [];
  }
  return (data ?? []).map((a) => ({
    ...a,
    total: a.livros_autores?.[0]?.count ?? 0,
  }));
}

export async function buscarAutor(slug) {
  const { data: autor } = await supabase
    .from("autores")
    .select("id, slug, nome, minibio, lattes_url, orcid, foto_url")
    .eq("slug", slug)
    .maybeSingle();
  if (!autor) return null;

  const { data: vinculos } = await supabase
    .from("livros_autores")
    .select(`livros(${CAMPOS_CARD})`)
    .eq("autor_id", autor.id);

  const livros = (vinculos ?? []).map((v) => v.livros).filter(Boolean);
  return { ...autor, livros };
}

export async function maisBaixados(quantidade = 4) {
  const { data: ranking } = await supabase
    .from("livros_estatisticas")
    .select("livro_id, downloads")
    .gt("downloads", 0)
    .order("downloads", { ascending: false })
    .limit(quantidade);

  const ids = (ranking ?? []).map((r) => r.livro_id);
  if (ids.length === 0) return [];

  const { data: livros } = await supabase
    .from("livros")
    .select(CAMPOS_CARD)
    .in("id", ids);

  const porId = new Map((livros ?? []).map((l) => [l.id, l]));
  return ids.map((id) => porId.get(id)).filter(Boolean);
}

export async function buscarLivroPorSlug(slug) {
  const { data, error } = await supabase
    .from("livros")
    .select(
      "*, colecao:colecoes(slug, nome), vinculos:livros_autores(ordem, papel, autor:autores(slug, nome))"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar livro:", error.message);
    return null;
  }
  if (data?.vinculos) {
    data.vinculos.sort((a, b) => a.ordem - b.ordem);
  }
  return data;
}

export async function contarTotais(livroId) {
  const [{ count: visualizacoes }, { count: downloads }] = await Promise.all([
    supabase
      .from("visualizacoes")
      .select("id", { count: "exact", head: true })
      .eq("livro_id", livroId),
    supabase
      .from("downloads")
      .select("id", { count: "exact", head: true })
      .eq("livro_id", livroId),
  ]);

  return {
    visualizacoes: visualizacoes ?? 0,
    downloads: downloads ?? 0,
  };
}

export async function totaisGerais() {
  const [{ count: visualizacoes }, { count: downloads }, { count: obras }] =
    await Promise.all([
      supabase.from("visualizacoes").select("id", { count: "exact", head: true }),
      supabase.from("downloads").select("id", { count: "exact", head: true }),
      supabase.from("livros").select("id", { count: "exact", head: true }),
    ]);

  return {
    visualizacoes: visualizacoes ?? 0,
    downloads: downloads ?? 0,
    obras: obras ?? 0,
  };
}

export async function registrarVisualizacao(livroId) {
  const { error } = await supabase
    .from("visualizacoes")
    .insert({ livro_id: livroId });

  if (error) {
    console.error("Erro ao registrar visualização:", error.message);
  }
}

function agruparPorMes(linhas) {
  const mapa = new Map();
  for (const linha of linhas) {
    const mes = linha.criado_em.slice(0, 7); // "AAAA-MM"
    mapa.set(mes, (mapa.get(mes) ?? 0) + 1);
  }
  return mapa;
}

function ultimosMeses(quantidade) {
  const meses = [];
  const hoje = new Date();
  for (let i = quantidade - 1; i >= 0; i--) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    meses.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return meses;
}

const NOMES_MES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

export async function estatisticasMensais(livroId, meses = 6) {
  const desde = new Date();
  desde.setMonth(desde.getMonth() - (meses - 1));
  desde.setDate(1);
  desde.setHours(0, 0, 0, 0);

  const [{ data: viz }, { data: down }] = await Promise.all([
    supabase
      .from("visualizacoes")
      .select("criado_em")
      .eq("livro_id", livroId)
      .gte("criado_em", desde.toISOString()),
    supabase
      .from("downloads")
      .select("criado_em")
      .eq("livro_id", livroId)
      .gte("criado_em", desde.toISOString()),
  ]);

  const vizPorMes = agruparPorMes(viz ?? []);
  const downPorMes = agruparPorMes(down ?? []);
  const chaves = ultimosMeses(meses);

  return chaves.map((chave) => {
    const [, mesNumero] = chave.split("-");
    return {
      mes: NOMES_MES[Number(mesNumero) - 1],
      visualizacoes: vizPorMes.get(chave) ?? 0,
      downloads: downPorMes.get(chave) ?? 0,
    };
  });
}
