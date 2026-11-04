import Link from "next/link";
import Image from "next/image";

// Card do segundo carrossel. Com `logo`, usa fundo azul e a logo da Nexus Editora;
// sem ela, usa fundo cinza-claro.
export default function CardInstitucional({ titulo, texto, link, logo = false }) {
  const azul = logo;
  return (
    <div
      className={`flex h-full min-h-[280px] flex-col justify-between p-7 ${
        azul ? "bg-azul text-branco" : "border border-cinza bg-cinza-claro text-preto"
      }`}
    >
      <div>
        {azul && (
          <Image
            src="/images/logo-branco-transparente.png"
            alt="Nexus Editora"
            width={360}
            height={191}
            className="mb-5 h-16 w-auto"
          />
        )}
        <h3 className={`text-lg font-semibold ${azul ? "text-branco" : "text-azul"}`}>{titulo}</h3>
        <p className={`mt-3 text-left text-sm leading-relaxed ${azul ? "text-branco/90" : "text-preto/75"}`}>
          {texto}
        </p>
      </div>
      {link && (
        <Link
          href={link.href}
          className={`mt-6 inline-block self-start border px-5 py-2 text-sm font-medium transition-colors ${
            azul
              ? "border-branco text-branco hover:bg-branco hover:text-azul"
              : "border-azul text-azul hover:bg-azul hover:text-branco"
          }`}
        >
          {link.rotulo}
        </Link>
      )}
    </div>
  );
}
