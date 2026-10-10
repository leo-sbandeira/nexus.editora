import Link from "next/link";
import { listarLivros, listarColecoes, listarAnos } from "@/lib/livros";
import GradeLivros from "@/components/GradeLivros";
import CabecalhoPagina from "@/components/CabecalhoPagina";

export const revalidate = 0;

export const metadata = {
  title: "Catálogo",
};

const ORDENS = [
  { valor: "recentes", rotulo: "Mais recentes" },
  { valor: "titulo", rotulo: "Título (A a Z)" },
  { valor: "ano", rotulo: "Ano de publicação" },
];

const campo = "w-full border border-cinza bg-branco px-3 py-2.5 text-sm text-preto";

export default async function Catalogo({ searchParams }) {
  const busca = typeof searchParams?.busca === "string" ? searchParams.busca : "";
  const colecao = typeof searchParams?.colecao === "string" ? searchParams.colecao : "";
  const ano = typeof searchParams?.ano === "string" ? searchParams.ano : "";
  const ordem = typeof searchParams?.ordem === "string" ? searchParams.ordem : "recentes";

  const [livros, colecoes, anos] = await Promise.all([
    listarLivros({ busca, colecao, ano, ordem }),
    listarColecoes(),
    listarAnos(),
  ]);

  const colecoesComObras = colecoes.filter((c) => c.total > 0);
  const filtrando = Boolean(busca || colecao || ano);

  return (
    <div>
      <CabecalhoPagina
        titulo="Catálogo"
        texto="Todas as obras publicadas pela Nexus Editora, disponíveis para download gratuito em PDF."
      />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <form method="get" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <div>
            <label htmlFor="f-busca" className="mb-1 block text-xs font-medium text-preto/70">
              Título ou autor
            </label>
            <input id="f-busca" name="busca" type="search" defaultValue={busca} className={campo} />
          </div>

          {colecoesComObras.length > 0 && (
            <div>
              <label htmlFor="f-colecao" className="mb-1 block text-xs font-medium text-preto/70">
                Coleção
              </label>
              <select id="f-colecao" name="colecao" defaultValue={colecao} className={campo}>
                <option value="">Todas</option>
                {colecoesComObras.map((c) => (
                  <option key={c.id} value={c.slug}>{c.nome}</option>
                ))}
              </select>
            </div>
          )}

          {anos.length > 1 && (
            <div>
              <label htmlFor="f-ano" className="mb-1 block text-xs font-medium text-preto/70">
                Ano
              </label>
              <select id="f-ano" name="ano" defaultValue={ano} className={campo}>
                <option value="">Todos</option>
                {anos.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="f-ordem" className="mb-1 block text-xs font-medium text-preto/70">
              Ordenar por
            </label>
            <select id="f-ordem" name="ordem" defaultValue={ordem} className={campo}>
              {ORDENS.map((o) => (
                <option key={o.valor} value={o.valor}>{o.rotulo}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button type="submit" className="bg-azul px-5 py-2.5 text-sm font-medium text-branco transition-colors hover:bg-azul-escuro">
              Filtrar
            </button>
            {filtrando && (
              <Link href="/catalogo" className="py-2.5 text-sm font-medium text-azul underline underline-offset-4">
                Limpar
              </Link>
            )}
          </div>
        </form>

        <p className="mt-8 text-sm text-preto/60" aria-live="polite">
          {livros.length} {livros.length === 1 ? "obra encontrada" : "obras encontradas"}
        </p>

        <div className="mt-6">
          {livros.length === 0 ? (
            <p className="text-preto/70">
              {filtrando
                ? "Nenhuma obra corresponde a esses filtros. Tente outro termo ou limpe a busca."
                : "Nenhuma obra publicada ainda. Assim que forem cadastradas, aparecerão aqui."}
            </p>
          ) : (
            <GradeLivros livros={livros} />
          )}
        </div>
      </section>
    </div>
  );
}
