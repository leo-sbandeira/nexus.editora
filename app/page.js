import { listarLivros, totaisGerais } from "@/lib/livros";
import CardLivro from "@/components/CardLivro";
import NumeroDestaque from "@/components/NumeroDestaque";

export const revalidate = 0;

export default async function Home() {
  const [livros, totais] = await Promise.all([listarLivros(), totaisGerais()]);

  return (
    <div>
      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-azul sm:text-5xl">
            Livros publicados, disponíveis a quem quiser lê-los.
          </h1>
          <p className="mt-5 max-w-md text-preto/70">
            A Nexus Editora disponibiliza gratuitamente, em PDF, as obras do
            seu catálogo. Sem cadastro, sem custo — basta escolher um título e
            baixar.
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
        {livros.length === 0 ? (
          <p className="text-preto/60">
            Nenhuma obra publicada ainda. Assim que forem cadastradas no
            catálogo, aparecerão aqui.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
            {livros.map((livro) => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
