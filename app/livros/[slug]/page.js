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
import Citacao from "@/components/Citacao";

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
    <div>
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[240px_1fr]">
          <div className="relative aspect-[3/4] w-full border border-cinza bg-cinza-claro">
            {livro.capa_url ? (
              <Image
                src={livro.capa_url}
                alt={`Capa de ${livro.titulo}`}
                fill
                sizes="240px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-sm font-medium text-preto/60">
                {livro.titulo}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-azul sm:text-4xl">
              {livro.titulo}
            </h1>
            <p className="mt-2 text-preto/60">
              {[livro.autor, livro.ano].filter(Boolean).join(" · ")}
            </p>
            {livro.descricao && (
              <p className="mt-5 max-w-xl text-preto/80">{livro.descricao}</p>
            )}

            <a
              href={`/api/download?slug=${encodeURIComponent(livro.slug)}`}
              className="mt-7 inline-block bg-azul px-6 py-3 text-sm font-medium tracking-wide text-branco transition-colors hover:bg-azul-escuro"
            >
              Baixar PDF gratuitamente
            </a>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-semibold text-azul">Como citar</h2>
          <div className="mt-4">
            <Citacao livro={livro} />
          </div>
        </div>
      </div>

      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid w-fit grid-cols-2 gap-8">
            <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" />
            <NumeroDestaque valor={totais.downloads} rotulo="downloads" />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-azul">
            Acessos por mês
          </h2>
          <div className="mt-4">
            <GraficoMensal dados={dadosMensais} />
          </div>
        </div>
      </section>
    </div>
  );
}
