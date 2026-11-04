import Link from "next/link";
import CapaMockup from "./CapaMockup";

// Card do carrossel de lançamentos: capa em mockup, título e autor.
export default function CardLancamento({ livro }) {
  return (
    <Link
      href={`/livros/${livro.slug}`}
      className="group flex h-full flex-col border border-cinza bg-branco transition-colors hover:border-azul"
    >
      <CapaMockup livro={livro} />
      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center">
        <h3 className="text-sm font-semibold leading-snug text-preto group-hover:text-azul">
          {livro.titulo}
        </h3>
        {livro.autor && <p className="mt-2 text-xs text-preto/60">{livro.autor}</p>}
      </div>
    </Link>
  );
}
