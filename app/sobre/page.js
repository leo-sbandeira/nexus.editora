export const metadata = {
  title: "Sobre a Editora · Nexus Editora",
};

export default function Sobre() {
  return (
    <div>
      <section className="bg-azul-escuro">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-semibold text-branco sm:text-5xl">
            Sobre a Editora
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-justify text-lg leading-relaxed text-preto/85">
          A Nexus Editora nasce com o propósito de publicar e disponibilizar
          livros em formato digital, especialmente em PDF, tornando o acesso
          ao conhecimento mais simples e imediato. Acreditamos que boas obras
          devem circular livremente, sem barreiras de custo ou burocracia,
          por isso todo o nosso catálogo pode ser baixado gratuitamente, a
          qualquer momento.
        </p>
        <p className="mt-6 text-justify text-lg leading-relaxed text-preto/85">
          Fundada por Leonardo Bandeira e Felipe Cavalcante, a editora nasceu
          da vontade de dar corpo a pesquisas, materiais didáticos e
          reflexões que, de outra forma, ficariam restritos a um público
          pequeno. Cada título publicado carrega esse compromisso: chegar a
          quem precisa, sem intermediários.
        </p>
      </section>

      <section className="bg-cinza-claro">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="text-xl font-semibold text-azul">Fundadores</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-medium text-preto">Leonardo Bandeira</p>
            </div>
            <div>
              <p className="font-medium text-preto">Felipe Cavalcante</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
