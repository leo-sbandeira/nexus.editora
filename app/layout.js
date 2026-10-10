import { Poppins } from "next/font/google";
import Link from "next/link";
import Cabecalho from "@/components/Cabecalho";
import BarraAcessibilidade from "@/components/BarraAcessibilidade";
import "./globals.css";

const nexus = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nexus",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nexuseditoradigital.com.br"),
  title: {
    default: "Nexus Editora",
    template: "%s · Nexus Editora",
  },
  description:
    "Livros publicados pela Nexus Editora, disponíveis gratuitamente em PDF.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={nexus.variable}>
      <body className="flex min-h-screen flex-col font-sans text-preto">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-branco focus:px-4 focus:py-2 focus:text-azul"
        >
          Ir para o conteúdo
        </a>
        <BarraAcessibilidade />
        <Cabecalho />

        <main id="conteudo" className="flex-1">
          {children}
        </main>

        <footer className="bg-azul-escuro">
          <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-branco/75">
            <nav aria-label="Rodapé" className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/catalogo" className="hover:text-branco">Catálogo</Link>
              <Link href="/colecoes" className="hover:text-branco">Coleções</Link>
              <Link href="/autores" className="hover:text-branco">Autores</Link>
              <Link href="/como-publicar" className="hover:text-branco">Como publicar</Link>
              <Link href="/termos" className="hover:text-branco">Termos de uso e direitos autorais</Link>
            </nav>
            <p className="font-semibold text-branco">Nexus Editora</p>
            <p className="mt-1">Palmas, Tocantins, Brasil</p>
            <a
              href="mailto:nexus.palmas@gmail.com"
              className="mt-1 inline-block transition-colors hover:text-branco"
            >
              nexus.palmas@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
