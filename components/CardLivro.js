import Link from "next/link";
import Image from "next/image";

export default function CardLivro({ livro }) {
  return (
    <Link
      href={`/livros/${livro.slug}`}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-cinza bg-cinza-claro">
        {livro.capa_url ? (
          <Image
            src={livro.capa_url}
            alt={`Capa de ${livro.titulo}`}
            fill
            sizes="(min-width: 768px) 25vw, 45vw"
            className="object-cover transition-opacity group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm font-medium text-preto/60">
            {livro.titulo}
          </div>
        )}
      </div>
      <div className="mt-3 w-full px-1">
        <h3 className="text-sm font-semibold leading-snug text-preto group-hover:text-azul">
          {livro.titulo}
        </h3>
        <p className="mt-1 text-xs text-preto/55">
          {[livro.autor, livro.ano].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
