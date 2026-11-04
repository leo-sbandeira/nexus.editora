import Link from "next/link";
import CapaMockup from "./CapaMockup";

// Card usado nas grades (catálogo, coleções, autores, mais baixados).
export default function CardLivro({ livro }) {
  return (
    <Link
      href={`/livros/${livro.slug}`}
      className="group flex h-full flex-col border border-cinza bg-branco transition-colors hover:border-azul"
    >
      <CapaMockup livro={livro} sizes="(min-width: 768px) 20vw, 40vw" />
      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center">
        <h3 className="text-sm font-semibold leading-snug text-preto group-hover:text-azul">
          {livro.titulo}
        </h3>
        <p className="mt-2 text-xs text-preto/60">
          {[livro.autor, livro.ano].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
