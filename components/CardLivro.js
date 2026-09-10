import Link from "next/link";
import Image from "next/image";

export default function CardLivro({ livro }) {
  return (
    <Link
      href={`/livros/${livro.slug}`}
      className="group flex flex-col gap-3"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-ink/20 bg-parchment">
        {livro.capa_url ? (
          <Image
            src={livro.capa_url}
            alt={`Capa de ${livro.titulo}`}
            fill
            sizes="(min-width: 768px) 25vw, 45vw"
            className="object-cover transition-opacity group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center font-serif text-lg text-graphite">
            {livro.titulo}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-serif text-lg leading-snug text-ink group-hover:text-wine">
          {livro.titulo}
        </h3>
        {livro.autor && (
          <p className="mt-1 text-sm text-graphite">{livro.autor}</p>
        )}
      </div>
    </Link>
  );
}
