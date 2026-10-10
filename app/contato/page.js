import CabecalhoPagina from "@/components/CabecalhoPagina";

export const metadata = {
  title: "Contato",
};

export default function Contato() {
  return (
    <div>
      <CabecalhoPagina titulo="Contato" texto="Fale com a equipe da Nexus Editora." />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <dl className="space-y-6">
          <div>
            <dt className="text-sm font-medium text-preto/60">E-mail</dt>
            <dd className="mt-1 text-lg">
              <a href="mailto:nexus.palmas@gmail.com" className="font-medium text-azul underline underline-offset-4">
                nexus.palmas@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-preto/60">Endereço</dt>
            <dd className="mt-1 text-lg text-preto/85">Palmas, Tocantins, Brasil</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
