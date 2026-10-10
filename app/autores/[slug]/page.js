import { notFound } from "next/navigation";
import { buscarAutor } from "@/lib/livros";
import GradeLivros from "@/components/GradeLivros";
import CabecalhoPagina from "@/components/CabecalhoPagina";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const autor = await buscarAutor(params.slug);
  return { title: autor ? autor.nome : "Autor" };
}

export default async function PaginaAutor({ params }) {
  const autor = await buscarAutor(params.slug);
  if (!autor) notFound();

  return (
    <div>
      <CabecalhoPagina titulo={autor.nome} />
      <section className="mx-auto max-w-6xl px-6 py-14">
        {autor.minibio && (
          <p className="max-w-3xl text-justify leading-relaxed text-preto/85">{autor.minibio}</p>
        )}
        {(autor.lattes_url || autor.orcid) && (
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {autor.lattes_url && (
              <a href={autor.lattes_url} className="font-medium text-azul underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                Currículo Lattes
              </a>
            )}
            {autor.orcid && (
              <a href={`https://orcid.org/${autor.orcid}`} className="font-medium text-azul underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                ORCID {autor.orcid}
              </a>
            )}
          </p>
        )}

        <h2 className="mt-12 mb-8 text-2xl font-semibold text-azul">Obras</h2>
        {autor.livros.length === 0 ? (
          <p className="text-preto/70">Nenhuma obra publicada ainda.</p>
        ) : (
          <GradeLivros livros={autor.livros} />
        )}
      </section>
    </div>
  );
}
