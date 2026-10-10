import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buscarLivroPorSlug,
  contarTotais,
  estatisticasMensais,
  livrosDaColecao,
  registrarVisualizacao,
} from "@/lib/livros";
import NumeroDestaque from "@/components/NumeroDestaque";
import GraficoMensal from "@/components/GraficoMensal";
import Citacao from "@/components/Citacao";
import GradeLivros from "@/components/GradeLivros";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const livro = await buscarLivroPorSlug(params.slug);
  if (!livro) return { title: "Obra não encontrada" };
  return {
    title: livro.titulo,
    description: livro.sinopse?.slice(0, 160) ?? undefined,
  };
}

function FichaTecnica({ livro }) {
  const itens = [
    ["Autor", livro.autor],
    ["Coleção", livro.colecao?.nome],
    ["Ano", livro.ano],
    ["Edição", livro.edicao],
    ["Páginas", livro.paginas],
    ["Idioma", livro.idioma],
    ["Editora", livro.editora_nome],
    ["Cidade", livro.cidade],
    ["ISBN", livro.isbn],
    ["DOI", livro.doi],
    ["Licença", livro.licenca],
  ].filter(([, valor]) => valor !== null && valor !== undefined && valor !== "");

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
      {itens.map(([rotulo, valor]) => (
        <div key={rotulo} className="contents">
          <dt className="font-medium text-preto/60">{rotulo}</dt>
          <dd className="text-preto/90">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function PaginaLivro({ params }) {
  const livro = await buscarLivroPorSlug(params.slug);

  if (!livro) {
    notFound();
  }

  // Registra a visualização antes de calcular os totais exibidos na página.
  await registrarVisualizacao(livro.id);

  const [totais, dadosMensais, outras] = await Promise.all([
    contarTotais(livro.id),
    estatisticasMensais(livro.id),
    livro.colecao_id ? livrosDaColecao(livro.colecao_id, livro.id) : [],
  ]);

  const autores = livro.vinculos ?? [];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[260px_1fr]">
          <div className="relative aspect-[3/4] w-full border border-cinza bg-cinza-claro">
            {livro.capa_url ? (
              <Image
                src={livro.capa_url}
                alt={`Capa de ${livro.titulo}`}
                fill
                sizes="260px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-sm font-medium text-preto/60">
                {livro.titulo}
              </div>
            )}
          </div>

          <div>
            {livro.colecao && (
              <Link
                href={`/colecoes/${livro.colecao.slug}`}
                className="text-sm font-medium text-azul underline underline-offset-4"
              >
                {livro.colecao.nome}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-semibold text-azul sm:text-4xl">
              {livro.titulo}
            </h1>
            {livro.subtitulo && (
              <p className="mt-2 text-xl text-preto/70">{livro.subtitulo}</p>
            )}

            <p className="mt-4 text-preto/80">
              {autores.length > 0
                ? autores.map((v, i) => (
                    <span key={v.autor.slug}>
                      {i > 0 && ", "}
                      <Link href={`/autores/${v.autor.slug}`} className="font-medium text-azul underline underline-offset-4">
                        {v.autor.nome}
                      </Link>
                      {v.papel !== "autor" && ` (${v.papel})`}
                    </span>
                  ))
                : livro.autor}
              {livro.ano ? `, ${livro.ano}` : ""}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`/api/download?slug=${encodeURIComponent(livro.slug)}`}
                className="inline-block bg-azul px-6 py-3 text-sm font-medium tracking-wide text-branco transition-colors hover:bg-azul-escuro"
              >
                Baixar PDF gratuitamente
              </a>
              <a
                href={livro.arquivo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-azul px-6 py-3 text-sm font-medium tracking-wide text-azul transition-colors hover:bg-azul hover:text-branco"
              >
                Ler online
              </a>
            </div>

            {livro.sinopse && (
              <div className="mt-10 max-w-2xl">
                <h2 className="text-xl font-semibold text-azul">Sobre a obra</h2>
                <p className="mt-3 whitespace-pre-line text-justify leading-relaxed text-preto/85">
                  {livro.sinopse}
                </p>
              </div>
            )}

            {livro.descricao && !livro.sinopse && (
              <p className="mt-8 max-w-2xl text-justify text-preto/80">{livro.descricao}</p>
            )}

            <div className="mt-10">
              <h2 className="mb-3 text-xl font-semibold text-azul">Ficha técnica</h2>
              <FichaTecnica livro={livro} />
            </div>

            {livro.sumario && (
              <div className="mt-10 max-w-2xl">
                <h2 className="text-xl font-semibold text-azul">Sumário</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-preto/85">
                  {livro.sumario}
                </p>
              </div>
            )}
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
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid w-fit grid-cols-2 gap-8">
            <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" />
            <NumeroDestaque valor={totais.downloads} rotulo="downloads" />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-azul">Acessos por mês</h2>
          <div className="mt-4">
            <GraficoMensal dados={dadosMensais} />
          </div>
        </div>
      </section>

      {outras.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-2xl font-semibold text-azul">
            Mais da coleção {livro.colecao?.nome}
          </h2>
          <GradeLivros livros={outras} />
        </section>
      )}
    </div>
  );
}
