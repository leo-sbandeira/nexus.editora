import Link from "next/link";
import { listarAutores } from "@/lib/livros";
import CabecalhoPagina from "@/components/CabecalhoPagina";

export const revalidate = 0;

export const metadata = {
  title: "Autores",
};

export default async function Autores() {
  const autores = await listarAutores();

  return (
    <div>
      <CabecalhoPagina
        titulo="Autores"
        texto="Quem escreve, organiza e traduz as obras publicadas pela Nexus Editora."
      />
      <section className="mx-auto max-w-6xl px-6 py-14">
        {autores.length === 0 ? (
          <p className="text-preto/70">Nenhum autor cadastrado ainda.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {autores.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/autores/${a.slug}`}
                  className="block h-full border border-cinza p-6 transition-colors hover:border-azul"
                >
                  <span className="block text-lg font-semibold text-azul">{a.nome}</span>
                  {a.minibio && (
                    <span className="mt-2 block text-justify text-sm text-preto/70 line-clamp-4">
                      {a.minibio}
                    </span>
                  )}
                  <span className="mt-3 block text-sm text-preto/60">
                    {a.total} {a.total === 1 ? "obra" : "obras"}
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
