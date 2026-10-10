import { notFound } from "next/navigation";
import { buscarColecao, livrosDaColecao } from "@/lib/livros";
import GradeLivros from "@/components/GradeLivros";
import CabecalhoPagina from "@/components/CabecalhoPagina";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const colecao = await buscarColecao(params.slug);
  return { title: colecao ? colecao.nome : "Coleção" };
}

export default async function PaginaColecao({ params }) {
  const colecao = await buscarColecao(params.slug);
  if (!colecao) notFound();

  const livros = await livrosDaColecao(colecao.id);

  return (
    <div>
      <CabecalhoPagina titulo={colecao.nome} texto={colecao.descricao} />
      <section className="mx-auto max-w-6xl px-6 py-14">
        {livros.length === 0 ? (
          <p className="text-preto/70">Esta coleção ainda não tem obras publicadas.</p>
        ) : (
          <GradeLivros livros={livros} />
        )}
      </section>
    </div>
  );
}
