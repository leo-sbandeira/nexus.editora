// Contador da Nexus Editora: registra visualizações e downloads em uma planilha do Google.
// Cole este código em Extensões > Apps Script, na própria planilha, e implante como app da Web.

const TOKEN = "TROQUE_POR_UMA_SENHA_LONGA"; // mesma senha da variável CONTADOR_TOKEN na Vercel
const ABA = "eventos";
const FUSO = "America/Sao_Paulo";

function aba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(["data_hora", "obra", "tipo"]);
    aba.setFrozenRows(1);
  }
  return aba;
}

function resposta_(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Recebe um evento do site: { token, slug, tipo } com tipo "visualizacao" ou "download"
function doPost(e) {
  let dados;
  try {
    dados = JSON.parse(e.postData.contents);
  } catch (erro) {
    return resposta_({ erro: "formato invalido" });
  }
  if (dados.token !== TOKEN) return resposta_({ erro: "nao autorizado" });
  if (!dados.slug || ["visualizacao", "download"].indexOf(dados.tipo) === -1) {
    return resposta_({ erro: "dados invalidos" });
  }

  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    aba_().appendRow([new Date(), String(dados.slug).slice(0, 200), dados.tipo]);
    CacheService.getScriptCache().remove("totais");
  } finally {
    trava.releaseLock();
  }
  return resposta_({ ok: true });
}

// Devolve os totais por obra e por mês: { livros: { slug: { visualizacoes, downloads, meses } } }
function doGet(e) {
  if (!e || !e.parameter || e.parameter.token !== TOKEN) {
    return resposta_({ erro: "nao autorizado" });
  }

  const cache = CacheService.getScriptCache();
  const guardado = cache.get("totais");
  if (guardado) {
    return ContentService.createTextOutput(guardado).setMimeType(ContentService.MimeType.JSON);
  }

  const aba = aba_();
  const ultima = aba.getLastRow();
  const livros = {};
  if (ultima > 1) {
    const linhas = aba.getRange(2, 1, ultima - 1, 3).getValues();
    linhas.forEach(function (linha) {
      const data = linha[0];
      const slug = linha[1];
      const tipo = linha[2] === "download" ? "downloads" : "visualizacoes";
      if (!(data instanceof Date) || !slug) return;
      const mes = Utilities.formatDate(data, FUSO, "yyyy-MM");
      const obra = livros[slug] || (livros[slug] = { visualizacoes: 0, downloads: 0, meses: {} });
      obra[tipo] += 1;
      const m = obra.meses[mes] || (obra.meses[mes] = { visualizacoes: 0, downloads: 0 });
      m[tipo] += 1;
    });
  }

  const texto = JSON.stringify({ livros: livros });
  try {
    cache.put("totais", texto, 300);
  } catch (erro) {
    // Se passar do limite do cache, apenas segue sem guardar.
  }
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.JSON);
}
