import { listarLivros } from "@/lib/livros";
import CardLivro from "@/components/CardLivro";

export const revalidate = 0;

export const metadata = {
  title: "Catálogo · Nexus Editora",
};

export default async function Catalogo() {
  const livros = await listarLivros();

  return (
    <div>
      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-semibold text-azul sm:text-5xl">
            Catálogo
          </h1>
          <p className="mt-4 max-w-md text-justify text-preto/70">
            Todas as obras publicadas pela Nexus Editora, disponíveis para
            download gratuito em PDF.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        {livros.length === 0 ? (
          <p className="text-preto/60">
            Nenhuma obra publicada ainda. Assim que forem cadastradas,
            aparecerão aqui.
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
