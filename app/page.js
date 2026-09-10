import Link from "next/link";
import { listarLivros, totaisGerais } from "@/lib/livros";
import CardLivro from "@/components/CardLivro";
import NumeroDestaque from "@/components/NumeroDestaque";

export const revalidate = 0;

export default async function Home() {
  const [livros, totais] = await Promise.all([listarLivros(), totaisGerais()]);
  const destaques = livros.slice(0, 4);

  return (
    <div>
      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-azul sm:text-5xl">
            Livros publicados, disponíveis a quem quiser lê-los.
          </h1>
          <p className="mt-5 max-w-md text-justify text-preto/70">
            A Nexus Editora publica livros em PDF, gratuitos e sem cadastro.
            Basta escolher um título e baixar.
          </p>
        </div>
      </section>

      <section className="bg-azul">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-3">
          <NumeroDestaque
            valor={totais.obras}
            rotulo="obras publicadas"
            tema="escuro"
          />
          <NumeroDestaque
            valor={totais.visualizacoes}
            rotulo="visualizações"
            tema="escuro"
          />
          <NumeroDestaque
            valor={totais.downloads}
            rotulo="downloads"
            tema="escuro"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        {destaques.length === 0 ? (
          <p className="text-preto/60">
            Nenhuma obra publicada ainda. Assim que forem cadastradas no
            catálogo, aparecerão aqui.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
              {destaques.map((livro) => (
                <CardLivro key={livro.id} livro={livro} />
              ))}
            </div>
            {livros.length > destaques.length && (
              <div className="mt-12 text-center">
                <Link
                  href="/catalogo"
                  className="inline-block border border-azul px-6 py-3 text-sm font-medium tracking-wide text-azul transition-colors hover:bg-azul hover:text-branco"
                >
                  Ver catálogo completo
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
