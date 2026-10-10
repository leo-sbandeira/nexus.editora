import CabecalhoPagina from "@/components/CabecalhoPagina";

export const metadata = {
  title: "Termos de uso e direitos autorais",
};

const BLOCOS = [
  {
    titulo: "Acesso livre",
    texto:
      "As obras do catálogo da Nexus Editora podem ser lidas e baixadas gratuitamente, sem cadastro.",
  },
  {
    titulo: "Direitos autorais",
    texto:
      "Os direitos autorais de cada obra pertencem aos seus autores. Cada página de obra informa a licença de uso aplicável. Quando nenhuma licença específica for indicada, vale o uso pessoal, acadêmico e sem fins comerciais, com citação da fonte.",
  },
  {
    titulo: "Como citar",
    texto:
      "Toda obra citada deve ser referenciada. Cada página de livro traz a referência pronta nos formatos ABNT e APA.",
  },
  {
    titulo: "Estatísticas de acesso",
    texto:
      "O site registra o número de visualizações e de downloads de cada obra, sem armazenar dados pessoais dos visitantes.",
  },
  {
    titulo: "Contato",
    texto:
      "Dúvidas sobre uso, reprodução ou solicitações de remoção de conteúdo podem ser enviadas para nexus.palmas@gmail.com.",
  },
];

export default function Termos() {
  return (
    <div>
      <CabecalhoPagina titulo="Termos de uso e direitos autorais" />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-8">
          {BLOCOS.map((b) => (
            <div key={b.titulo}>
              <h2 className="text-xl font-semibold text-azul">{b.titulo}</h2>
              <p className="mt-2 text-justify leading-relaxed text-preto/80">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
