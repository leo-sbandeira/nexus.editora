"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/", rotulo: "Página Inicial" },
  { href: "/catalogo", rotulo: "Catálogo" },
  { href: "/colecoes", rotulo: "Coleções" },
  { href: "/autores", rotulo: "Autores" },
  { href: "/como-publicar", rotulo: "Como publicar" },
  { href: "/sobre", rotulo: "Sobre a Editora" },
  { href: "/contato", rotulo: "Contato" },
];

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="bg-azul">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setAberto(false)}>
          <Image
            src="/images/logo-branco-transparente.png"
            alt="Nexus Editora, página inicial"
            width={360}
            height={152}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-5 text-sm font-medium text-branco/90 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-branco">
              {l.rotulo}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="border border-branco/60 px-4 py-2 text-sm font-medium text-branco lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? "Fechar" : "Menu"}
        </button>
      </div>

      {aberto && (
        <nav id="menu-movel" aria-label="Principal" className="border-t border-branco/20 lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="block py-3 text-base font-medium text-branco/90 hover:text-branco"
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
