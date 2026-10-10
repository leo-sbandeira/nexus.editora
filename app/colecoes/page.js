import Link from "next/link";
import { listarColecoes } from "@/lib/livros";
import CabecalhoPagina from "@/components/CabecalhoPagina";

export const revalidate = 0;

export const metadata = {
  title: "Coleções",
};

export default async function Colecoes() {
  const colecoes = await listarColecoes();

  return (
    <div>
      <CabecalhoPagina
        titulo="Coleções"
        texto="As obras da Nexus Editora reunidas por área e linha editorial."
      />
      <section className="mx-auto max-w-6xl px-6 py-14">
        {colecoes.length === 0 ? (
          <p className="text-preto/70">Nenhuma coleção cadastrada ainda.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {colecoes.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/colecoes/${c.slug}`}
                  className="block h-full border border-cinza p-6 transition-colors hover:border-azul"
                >
                  <span className="block text-xl font-semibold text-azul">{c.nome}</span>
                  {c.descricao && (
                    <span className="mt-2 block text-justify text-sm text-preto/70">{c.descricao}</span>
                  )}
                  <span className="mt-3 block text-sm text-preto/60">
                    {c.total} {c.total === 1 ? "obra" : "obras"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
