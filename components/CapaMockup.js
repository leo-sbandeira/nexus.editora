import Image from "next/image";

// PADRÃO DE CAPA DO SITE: toda capa de livro deve ser exibida por este componente,
// em mockup (lombada, sombra e páginas na lateral). Não renderize capa_url diretamente.
//
// - tamanho: "p" (cartões e grades), "m" (destaques) ou "g" (página da obra)
// - fundo: quando verdadeiro, desenha o painel cinza-claro atrás do livro
export default function CapaMockup({ livro, tamanho = "p", fundo = true, sizes }) {
  const larguras = {
    p: "w-[62%] max-w-[190px]",
    m: "w-[62%] max-w-[230px]",
    g: "w-[78%] max-w-[250px]",
  };

  const livroEmMockup = (
    <div
      className={`relative ${larguras[tamanho]} transition-transform duration-300 [transform:rotateY(-16deg)] group-hover:[transform:rotateY(-6deg)]`}
    >
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
            sizes={sizes ?? "(min-width: 1024px) 15vw, 45vw"}
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
  );

  if (!fundo) return livroEmMockup;

  return (
    <div
      className="flex items-center justify-center bg-cinza-claro px-6 py-8"
      style={{ perspective: "900px" }}
    >
      {livroEmMockup}
    </div>
  );
}
