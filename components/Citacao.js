"use client";

import { useEffect, useState } from "react";
import { citacaoABNT, citacaoAPA, dataAcessoABNT } from "@/lib/citacoes";

function escaparHtml(texto) {
  return texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function BlocoCitacao({ rotulo, partes }) {
  const [copiado, setCopiado] = useState(false);
  const textoSimples = `${partes.antes}${partes.titulo}${partes.depois}`;
  const html = `${escaparHtml(partes.antes)}<strong>${escaparHtml(partes.titulo)}</strong>${escaparHtml(partes.depois)}`;

  async function copiar() {
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        // Copia com o negrito do título; editores de texto sem formatação recebem o texto simples.
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([textoSimples], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(textoSimples);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Ambiente sem suporte a clipboard: apenas ignora, o texto já está visível para seleção manual.
    }
  }

  return (
    <div className="border border-cinza p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-azul">
          {rotulo}
        </span>
        <button
          onClick={copiar}
          className="text-xs font-medium text-azul underline underline-offset-2 hover:text-azul-escuro"
        >
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </div>
      <p className="mt-2 break-words text-sm leading-relaxed text-preto/85">
        {partes.antes}
        <strong className="font-semibold">{partes.titulo}</strong>
        {partes.depois}
      </p>
    </div>
  );
}

export default function Citacao({ livro }) {
  // A data de acesso é a do dia em que o leitor abre a página, por isso é calculada no navegador.
  const [acessoEm, setAcessoEm] = useState(null);
  useEffect(() => {
    setAcessoEm(dataAcessoABNT());
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BlocoCitacao rotulo="ABNT" partes={citacaoABNT(livro, acessoEm)} />
      <BlocoCitacao rotulo="APA" partes={citacaoAPA(livro)} />
    </div>
  );
}
