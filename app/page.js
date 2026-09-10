import { listarLivros, totaisGerais } from "@/lib/livros";
import CardLivro from "@/components/CardLivro";
import NumeroDestaque from "@/components/NumeroDestaque";

export const revalidate = 0;

export default async function Home() {
  const [livros, totais] = await Promise.all([listarLivros(), totaisGerais()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <section className="max-w-2xl">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Livros publicados, disponíveis a quem quiser lê-los.
        </h1>
        <p className="mt-5 text-graphite">
          A Nexus Editora disponibiliza gratuitamente, em PDF, as obras do seu
          catálogo. Sem cadastro, sem custo — basta escolher um título e
          baixar.
        </p>
      </section>

      <section className="mt-10 grid grid-cols-2 gap-6 border-y border-ink/15 py-6 sm:grid-cols-3">
        <NumeroDestaque valor={totais.obras} rotulo="obras publicadas" />
        <NumeroDestaque valor={totais.visualizacoes} rotulo="visualizações" />
        <NumeroDestaque valor={totais.downloads} rotulo="downloads" />
      </section>

      <section className="mt-14">
        {livros.length === 0 ? (
          <p className="text-graphite">
            Nenhuma obra publicada ainda. Assim que forem cadastradas no
            catálogo, aparecerão aqui.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
            {livros.map((livro) => (
              <CardLivro key={livro.id} livro={livro} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
