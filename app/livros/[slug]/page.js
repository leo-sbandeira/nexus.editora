import Image from "next/image";
import { notFound } from "next/navigation";
import {
  buscarLivroPorSlug,
  contarTotais,
  estatisticasMensais,
  registrarVisualizacao,
} from "@/lib/livros";
import NumeroDestaque from "@/components/NumeroDestaque";
import GraficoMensal from "@/components/GraficoMensal";

export const revalidate = 0;

export default async function PaginaLivro({ params }) {
  const livro = await buscarLivroPorSlug(params.slug);

  if (!livro) {
    notFound();
  }

  // Registra a visualização antes de calcular os totais exibidos na página.
  await registrarVisualizacao(livro.id);

  const [totais, dadosMensais] = await Promise.all([
    contarTotais(livro.id),
    estatisticasMensais(livro.id),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid gap-10 sm:grid-cols-[240px_1fr]">
        <div className="relative aspect-[3/4] w-full border border-ink/20 bg-parchment">
          {livro.capa_url ? (
            <Image
              src={livro.capa_url}
              alt={`Capa de ${livro.titulo}`}
              fill
              sizes="240px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center font-serif text-lg text-graphite">
              {livro.titulo}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-3xl text-ink sm:text-4xl">
            {livro.titulo}
          </h1>
          {livro.autor && (
            <p className="mt-2 text-graphite">{livro.autor}</p>
          )}
          {livro.descricao && (
            <p className="mt-5 max-w-xl text-ink/90">{livro.descricao}</p>
          )}

          <a
            href={`/api/download?slug=${encodeURIComponent(livro.slug)}`}
            className="mt-7 inline-block border border-ink bg-ink px-6 py-3 font-sans text-sm tracking-wide text-paper transition-colors hover:bg-wine hover:border-wine"
          >
            Baixar PDF gratuitamente
          </a>
        </div>
      </div>

      <section className="mt-14 border-t border-ink/15 pt-10">
        <div className="grid grid-cols-2 gap-6 sm:w-fit sm:grid-cols-2">
          <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" />
          <NumeroDestaque valor={totais.downloads} rotulo="downloads" />
        </div>

        <h2 className="mt-10 font-serif text-xl text-ink">
          Acessos por mês
        </h2>
        <div className="mt-4">
          <GraficoMensal dados={dadosMensais} />
        </div>
      </section>
    </div>
  );
}
