import Link from "next/link";
import {
  listarLivros,
  listarColecoes,
  maisBaixados,
  totaisGerais,
} from "@/lib/livros";
import GradeLivros from "@/components/GradeLivros";
import NumeroDestaque from "@/components/NumeroDestaque";
import CampoBusca from "@/components/CampoBusca";
import Secao from "@/components/Secao";

export const revalidate = 0;

export default async function Home() {
  const [lancamentos, colecoes, populares, totais] = await Promise.all([
    listarLivros({ limite: 4 }),
    listarColecoes(),
    maisBaixados(4),
    totaisGerais(),
  ]);

  const colecoesComObras = colecoes.filter((c) => c.total > 0);

  return (
    <div>
      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-azul sm:text-5xl">
            Livros publicados, disponíveis a quem quiser lê-los.
          </h1>
          <p className="mt-5 max-w-md text-justify text-preto/70">
            A Nexus Editora publica livros em PDF, gratuitos e sem cadastro.
            Basta escolher um título e baixar.
          </p>
          <div className="mt-8">
            <CampoBusca grande />
          </div>
        </div>
      </section>

      <section className="bg-azul" aria-label="Números da editora">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3">
          <NumeroDestaque valor={totais.obras} rotulo="obras publicadas" tema="escuro" />
          <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" tema="escuro" />
          <NumeroDestaque valor={totais.downloads} rotulo="downloads" tema="escuro" />
        </div>
      </section>

      <Secao
        titulo="Lançamentos"
        verTodos={{ href: "/catalogo", rotulo: "Ver catálogo completo" }}
      >
        {lancamentos.length === 0 ? (
          <p className="text-preto/60">
            Nenhuma obra publicada ainda. Assim que forem cadastradas,
            aparecerão aqui.
          </p>
        ) : (
          <GradeLivros livros={lancamentos} />
        )}
      </Secao>

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
