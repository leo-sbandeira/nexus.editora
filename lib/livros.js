import { supabase } from "./supabaseClient";

export async function listarLivros() {
  const { data, error } = await supabase
    .from("livros")
    .select("id, slug, titulo, autor, ano, descricao, capa_url")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao listar livros:", error.message);
    return [];
  }
  return data ?? [];
}

export async function buscarLivroPorSlug(slug) {
  const { data, error } = await supabase
    .from("livros")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Erro ao buscar livro:", error.message);
    return null;
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
