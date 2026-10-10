export default function CampoBusca({ valor = "", grande = false }) {
  return (
    <form action="/catalogo" method="get" role="search" className="flex w-full max-w-xl">
      <label htmlFor="busca" className="sr-only">
        Buscar por título ou autor
      </label>
      <input
        id="busca"
        name="busca"
        type="search"
        defaultValue={valor}
        placeholder="Buscar por título ou autor"
        className={`min-w-0 flex-1 border border-cinza bg-branco px-4 text-preto placeholder:text-preto/45 ${
          grande ? "py-3.5 text-base" : "py-2.5 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`bg-azul px-5 font-medium text-branco transition-colors hover:bg-azul-escuro ${
          grande ? "text-base" : "text-sm"
        }`}
      >
        Buscar
      </button>
    </form>
  );
}
