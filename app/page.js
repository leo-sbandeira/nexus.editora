import Link from "next/link";
import { listarLivros, listarColecoes } from "@/lib/livros";
import {
  carregarEstatisticas,
  totaisGerais,
  maisBaixadosSlugs,
} from "@/lib/contador";
import { buscarLivroPorSlug } from "@/lib/livros";
import GradeLivros from "@/components/GradeLivros";
import NumeroDestaque from "@/components/NumeroDestaque";
import Carrossel from "@/components/Carrossel";
import CardLancamento from "@/components/CardLancamento";
import CardInstitucional from "@/components/CardInstitucional";
import Secao from "@/components/Secao";

// Os números do contador são atualizados a cada 5 minutos.
export const revalidate = 300;

export default async function Home() {
  const [lancamentos, colecoes, todas, estatisticas] = await Promise.all([
    listarLivros({ limite: 12 }),
    listarColecoes(),
    listarLivros(),
    carregarEstatisticas(),
  ]);
  const totais = totaisGerais(estatisticas);
  const populares = (
    await Promise.all(maisBaixadosSlugs(estatisticas, 4).map((slug) => buscarLivroPorSlug(slug)))
  ).filter(Boolean);

  const colecoesComObras = colecoes.filter((c) => c.total > 0);

  return (
    <div>
      <Carrossel
        titulo="Lançamentos"
        verTodos={{ href: "/catalogo", rotulo: "Ver catálogo completo" }}
      >
        {lancamentos.map((livro) => (
          <CardLancamento key={livro.id} livro={livro} />
        ))}
      </Carrossel>

      <Carrossel
        titulo="A Nexus Editora"
        fundo="cinza"
        larguraItem="w-[85%] sm:w-[48%] lg:w-[32%]"
      >
        <CardInstitucional
          logo
          titulo="Ciência, técnica e pesquisa em acesso aberto"
          texto="A Nexus Editora publica obras científicas, técnicas e de divulgação, além de resultados de pesquisa, com a finalidade de ampliar a circulação do conhecimento produzido em instituições de ensino e pesquisa."
          link={{ href: "/sobre", rotulo: "Conheça a editora" }}
        />
        <CardInstitucional
          titulo="Livros gratuitos, sem cadastro"
          texto="Os livros são publicados em PDF e podem ser lidos e baixados gratuitamente, sem necessidade de cadastro, com licença definida em acordo com os autores."
          link={{ href: "/catalogo", rotulo: "Ver catálogo" }}
        />
        <CardInstitucional
          titulo="Oito grandes áreas do conhecimento"
          texto="A Editora recebe propostas de obras nas oito grandes áreas da CAPES, de Ciências Exatas e da Terra a Linguística, Letras e Artes."
          link={{ href: "/como-publicar", rotulo: "Como publicar" }}
        />
      </Carrossel>

      {estatisticas && (
        <section className="bg-azul" aria-label="Números da editora">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3">
            <NumeroDestaque valor={todas.length} rotulo="obras publicadas" tema="escuro" />
            <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" tema="escuro" />
            <NumeroDestaque valor={totais.downloads} rotulo="downloads" tema="escuro" />
          </div>
        </section>
      )}

      {populares.length > 0 && (
        <Secao titulo="Mais baixados" fundo="cinza">
          <GradeLivros livros={populares} />
        </Secao>
      )}

      {colecoesComObras.length > 0 && (
        <Secao
          titulo="Coleções"
          verTodos={{ href: "/colecoes", rotulo: "Ver todas as coleções" }}
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colecoesComObras.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/colecoes/${c.slug}`}
                  className="block h-full border border-cinza p-5 transition-colors hover:border-azul"
                >
                  <span className="block text-lg font-semibold text-azul">{c.nome}</span>
                  <span className="mt-1 block text-sm text-preto/60">
                    {c.total} {c.total === 1 ? "obra" : "obras"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Secao>
      )}

      <section className="bg-azul">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-branco">Quer publicar com a Nexus?</h2>
            <p className="mt-2 max-w-md text-justify text-branco/80">
              Veja como enviar sua proposta de obra.
            </p>
          </div>
          <Link
            href="/como-publicar"
            className="border border-branco px-6 py-3 text-sm font-medium text-branco transition-colors hover:bg-branco hover:text-azul"
          >
            Como publicar
          </Link>
        </div>
      </section>
    </div>
  );
}
