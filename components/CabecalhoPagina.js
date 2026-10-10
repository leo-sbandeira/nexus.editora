export default function CabecalhoPagina({ titulo, texto, fundo = "cinza", children }) {
  const escuro = fundo === "azul";
  return (
    <section className={escuro ? "bg-azul-escuro" : "bg-cinza-claro"}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h1 className={`text-4xl font-semibold sm:text-5xl ${escuro ? "text-branco" : "text-azul"}`}>
          {titulo}
        </h1>
        {texto && (
          <p className={`mt-4 max-w-xl text-justify ${escuro ? "text-branco/80" : "text-preto/70"}`}>
            {texto}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
