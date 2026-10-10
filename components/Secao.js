import Link from "next/link";

export default function Secao({ titulo, verTodos, children, fundo = "branco" }) {
  const fundos = { branco: "bg-branco", cinza: "bg-cinza-claro", azul: "bg-azul" };
  const escuro = fundo === "azul";

  return (
    <section className={fundos[fundo]}>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className={`text-2xl font-semibold ${escuro ? "text-branco" : "text-azul"}`}>
            {titulo}
          </h2>
          {verTodos && (
            <Link
              href={verTodos.href}
              className={`shrink-0 text-sm font-medium underline underline-offset-4 ${
                escuro ? "text-branco" : "text-azul"
              }`}
            >
              {verTodos.rotulo}
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
