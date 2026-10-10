import CabecalhoPagina from "@/components/CabecalhoPagina";

export const metadata = {
  title: "Como publicar",
};

const PASSOS = [
  {
    titulo: "Envie sua proposta",
    texto:
      "Escreva para nexus.palmas@gmail.com com o título provisório da obra, um resumo de uma página, o nome e a mini biografia de cada autor ou organizador e, se já existir, o texto completo em PDF ou DOCX.",
  },
  {
    titulo: "Avaliação editorial",
    texto:
      "A equipe da Nexus lê a proposta, verifica se ela se encaixa na linha editorial da editora e responde por e-mail com o resultado e, se for o caso, com pedidos de ajuste.",
  },
  {
    titulo: "Revisão e diagramação",
    texto:
      "Com a obra aprovada, combinamos com o autor a revisão do texto, a capa e a ficha catalográfica.",
  },
  {
    titulo: "Publicação em acesso aberto",
    texto:
      "A obra entra no catálogo em PDF, com download gratuito, página própria, citação pronta em ABNT e APA e contadores públicos de visualizações e downloads.",
  },
];

export default function ComoPublicar() {
  return (
    <div>
      <CabecalhoPagina
        titulo="Como publicar"
        texto="A Nexus Editora publica livros em acesso aberto. Veja como enviar sua proposta."
      />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <ol className="space-y-8">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="grid grid-cols-[auto_1fr] gap-5">
              <span className="flex h-10 w-10 items-center justify-center bg-azul text-lg font-semibold text-branco" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-azul">{p.titulo}</h2>
                <p className="mt-2 text-justify leading-relaxed text-preto/80">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 bg-cinza-claro p-6">
          <h2 className="text-lg font-semibold text-azul">Enviar proposta</h2>
          <p className="mt-2 text-preto/80">
            <a href="mailto:nexus.palmas@gmail.com?subject=Proposta%20de%20obra" className="font-medium text-azul underline underline-offset-4">
              nexus.palmas@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
