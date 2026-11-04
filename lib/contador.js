// Contador público alimentado por uma planilha do Google (veja contador/apps-script.gs).
// Sem as variáveis CONTADOR_URL e CONTADOR_TOKEN o contador fica desligado e some do site.

const URL_CONTADOR = process.env.CONTADOR_URL;
const TOKEN = process.env.CONTADOR_TOKEN;

export const contadorAtivo = Boolean(URL_CONTADOR && TOKEN);

const NOMES_MES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export async function registrar(slug, tipo, limiteMs = 4000) {
  if (!contadorAtivo) return false;
  try {
    const resposta = await fetch(URL_CONTADOR, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: TOKEN, slug, tipo }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(limiteMs),
    });
    return resposta.ok;
  } catch (erro) {
    console.error("Erro ao registrar no contador:", erro.message);
    return false;
  }
}

// Lê os totais da planilha. O resultado fica em cache por 5 minutos.
export async function carregarEstatisticas() {
  if (!contadorAtivo) return null;
  try {
    const resposta = await fetch(`${URL_CONTADOR}?token=${encodeURIComponent(TOKEN)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!resposta.ok) return null;
    const dados = await resposta.json();
    return dados && dados.livros ? dados : null;
  } catch (erro) {
    console.error("Erro ao ler o contador:", erro.message);
    return null;
  }
}

export function totaisDaObra(dados, slug) {
  const obra = dados?.livros?.[slug];
  return { visualizacoes: obra?.visualizacoes ?? 0, downloads: obra?.downloads ?? 0 };
}

export function mensalDaObra(dados, slug, quantidade = 6) {
  const meses = dados?.livros?.[slug]?.meses ?? {};
  const resultado = [];
  const hoje = new Date();
  for (let i = quantidade - 1; i >= 0; i--) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    resultado.push({
      mes: NOMES_MES[d.getMonth()],
      visualizacoes: meses[chave]?.visualizacoes ?? 0,
      downloads: meses[chave]?.downloads ?? 0,
    });
  }
  return resultado;
}

export function totaisGerais(dados) {
  let visualizacoes = 0;
  let downloads = 0;
  for (const obra of Object.values(dados?.livros ?? {})) {
    visualizacoes += obra.visualizacoes ?? 0;
    downloads += obra.downloads ?? 0;
  }
  return { visualizacoes, downloads };
}

export function maisBaixadosSlugs(dados, quantidade = 4) {
  return Object.entries(dados?.livros ?? {})
    .filter(([, obra]) => (obra.downloads ?? 0) > 0)
    .sort((a, b) => b[1].downloads - a[1].downloads)
    .slice(0, quantidade)
    .map(([slug]) => slug);
}
