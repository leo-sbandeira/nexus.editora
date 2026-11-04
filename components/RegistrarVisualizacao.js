"use client";

import { useEffect } from "react";

// Registra uma visualização por obra a cada sessão do navegador.
export default function RegistrarVisualizacao({ slug }) {
  useEffect(() => {
    const chave = `viz:${slug}`;
    try {
      if (sessionStorage.getItem(chave)) return;
      sessionStorage.setItem(chave, "1");
    } catch {
      // Sem sessionStorage, registra mesmo assim.
    }
    fetch("/api/visualizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
