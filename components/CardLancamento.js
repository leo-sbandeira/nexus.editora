import Link from "next/link";
import Image from "next/image";

// Card de lançamento: capa em mockup de livro (lombada, sombra e laterais),
// título e autor.
export default function CardLancamento({ livro }) {
  return (
    <Link
      href={`/livros/${livro.slug}`}
      className="group flex h-full flex-col border border-cinza bg-branco transition-colors hover:border-azul"
    >
      <div
        className="flex items-center justify-center bg-cinza-claro px-6 py-8"
        style={{ perspective: "900px" }}
      >
        <div className="relative w-[62%] max-w-[190px] transition-transform duration-300 [transform:rotateY(-16deg)] group-hover:[transform:rotateY(-6deg)]">
          {/* páginas, visíveis na lateral direita */}
          <span
            aria-hidden="true"
            className="absolute -right-[5px] bottom-[3px] top-[3px] w-[5px] border-y border-r border-cinza bg-[repeating-linear-gradient(90deg,#ffffff_0,#ffffff_1px,#d4d5d6_1px,#d4d5d6_2px)]"
          />
          <div className="relative aspect-[873/1242] w-full overflow-hidden bg-azul shadow-[8px_10px_18px_rgba(0,0,0,0.3)]">
            {livro.capa_url ? (
              <Image
                src={livro.capa_url}
                alt={`Capa de ${livro.titulo}`}
                fill
                sizes="(min-width: 1024px) 15vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-3 text-center text-xs font-semibold text-branco">
                {livro.titulo}
              </div>
            )}
            {/* lombada */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/30 via-white/25 to-transparent"
            />
            {/* brilho suave */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center">
        <h3 className="text-sm font-semibold leading-snug text-preto group-hover:text-azul">
          {livro.titulo}
        </h3>
        {livro.autor && <p className="mt-2 text-xs text-preto/60">{livro.autor}</p>}
      </div>
    </Link>
  );
}
