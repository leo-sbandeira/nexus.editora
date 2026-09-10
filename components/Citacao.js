"use client";

import { useState } from "react";
import { citacaoABNT, citacaoAPA } from "@/lib/citacoes";

function BlocoCitacao({ rotulo, texto }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
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
      <p className="mt-2 text-sm leading-relaxed text-preto/85">{texto}</p>
    </div>
  );
}

export default function Citacao({ livro }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BlocoCitacao rotulo="ABNT" texto={citacaoABNT(livro)} />
      <BlocoCitacao rotulo="APA" texto={citacaoAPA(livro)} />
    </div>
  );
}
