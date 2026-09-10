import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const nexus = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nexus",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nexuseditoradigital.com.br"),
  title: "Nexus Editora",
  description:
    "Obras publicadas pela Nexus Editora, disponíveis gratuitamente em PDF.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={nexus.variable}>
      <body className="flex min-h-screen flex-col font-sans text-preto">
        <header className="bg-azul">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-branco-transparente.png"
                alt="Nexus Editora"
                width={360}
                height={152}
                priority
                className="h-24 w-auto sm:h-28"
              />
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium tracking-wide text-branco/90">
              <Link href="/" className="transition-colors hover:text-branco">
                Página Inicial
              </Link>
              <Link
                href="/catalogo"
                className="transition-colors hover:text-branco"
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                className="transition-colors hover:text-branco"
              >
                Sobre a Editora
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-azul-escuro">
          <div className="mx-auto max-w-5xl px-6 py-10 text-center text-sm text-branco/70">
            <p className="font-semibold text-branco">Nexus Editora</p>
            <p className="mt-1">Palmas, Tocantins, Brasil</p>
            <a
              href="mailto:nexus.palmas@gmail.com"
              className="mt-1 inline-block text-branco/70 transition-colors hover:text-branco"
            >
              nexus.palmas@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
