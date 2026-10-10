"use client";

import { useEffect, useState } from "react";

const TAMANHOS = [87.5, 100, 112.5, 125];

function ler(chave, padrao) {
  try {
    const v = window.localStorage.getItem(chave);
    return v === null ? padrao : JSON.parse(v);
  } catch {
    return padrao;
  }
}

function gravar(chave, valor) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // Sem armazenamento disponível: a preferência vale só nesta visita.
  }
}

export default function BarraAcessibilidade() {
  const [nivel, setNivel] = useState(1);
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    setNivel(ler("nexus-tamanho", 1));
    setContraste(ler("nexus-contraste", false));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${TAMANHOS[nivel]}%`;
    document.documentElement.classList.toggle("alto-contraste", contraste);
  }, [nivel, contraste]);

  function mudarNivel(delta) {
    const novo = Math.min(TAMANHOS.length - 1, Math.max(0, nivel + delta));
    setNivel(novo);
    gravar("nexus-tamanho", novo);
  }

  function alternarContraste() {
    const novo = !contraste;
    setContraste(novo);
    gravar("nexus-contraste", novo);
  }

  const botao =
    "px-2.5 py-1 text-xs font-semibold text-branco hover:bg-branco/15 focus-visible:outline-offset-0";

  return (
    <div className="bg-azul-escuro">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-1 px-6 py-1.5">
        <span className="mr-1 text-xs text-branco/70">Acessibilidade</span>
        <button type="button" className={botao} onClick={() => mudarNivel(-1)} aria-label="Diminuir o tamanho do texto">
          A-
        </button>
        <button type="button" className={botao} onClick={() => mudarNivel(1)} aria-label="Aumentar o tamanho do texto">
          A+
        </button>
        <button type="button" className={botao} onClick={alternarContraste} aria-pressed={contraste}>
          Alto contraste
        </button>
      </div>
    </div>
  );
}
