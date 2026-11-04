"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Carrossel horizontal com rolagem por encaixe (scroll-snap), setas de navegação
// e rolagem por toque ou teclado. Cada filho vira um item da lista.
export default function Carrossel({
  titulo,
  verTodos,
  fundo = "branco",
  larguraItem = "w-[72%] sm:w-[40%] md:w-[30%] lg:w-[23%]",
  children,
}) {
  const trilho = useRef(null);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(true);

  const atualizar = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setNoInicio(el.scrollLeft <= 2);
    setNoFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, [atualizar, children]);

  function mover(direcao) {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const fundos = { branco: "bg-branco", cinza: "bg-cinza-claro" };
  const semRolagem = noInicio && noFim;
  const botao =
    "flex h-10 w-10 items-center justify-center border border-azul text-azul transition-colors hover:bg-azul hover:text-branco disabled:cursor-not-allowed disabled:border-cinza disabled:text-cinza disabled:hover:bg-transparent disabled:hover:text-cinza";

  return (
    <section className={fundos[fundo]} aria-roledescription="carrossel" aria-label={titulo}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-azul">{titulo}</h2>
          <div className="flex items-center gap-4">
            {verTodos && (
              <Link
                href={verTodos.href}
                className="hidden shrink-0 text-sm font-medium text-azul underline underline-offset-4 sm:inline"
              >
                {verTodos.rotulo}
              </Link>
            )}
            {!semRolagem && (
              <div className="flex gap-2">
                <button
                  type="button"
                  className={botao}
                  onClick={() => mover(-1)}
                  disabled={noInicio}
                  aria-label={`${titulo}: itens anteriores`}
                >
                  <span aria-hidden="true">&#8249;</span>
                </button>
                <button
                  type="button"
                  className={botao}
                  onClick={() => mover(1)}
                  disabled={noFim}
                  aria-label={`${titulo}: próximos itens`}
                >
                  <span aria-hidden="true">&#8250;</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <ul
          ref={trilho}
          onScroll={atualizar}
          tabIndex={0}
          aria-label={`${titulo}, role horizontalmente para ver mais`}
          className="sem-barra -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
        >
          {Children.toArray(children).map((filho, i) => (
            <li key={i} className={`shrink-0 snap-start ${larguraItem}`}>
              {filho}
            </li>
          ))}
        </ul>

        {verTodos && (
          <p className="mt-4 text-center sm:hidden">
            <Link href={verTodos.href} className="text-sm font-medium text-azul underline underline-offset-4">
              {verTodos.rotulo}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
