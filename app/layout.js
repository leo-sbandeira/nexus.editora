import { Lora, Manrope } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Nexus Editora",
  description:
    "Obras publicadas pela Nexus Editora, disponíveis gratuitamente em PDF.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans flex min-h-screen flex-col">
        <header className="border-b border-ink/15">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-preto.png"
                alt="Nexus Editora"
                width={140}
                height={54}
                priority
                className="h-9 w-auto"
              />
            </Link>
            <nav className="font-sans text-sm tracking-wide text-graphite">
              <Link href="/" className="hover:text-ink">
                Catálogo
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink/15">
          <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-graphite">
            <p>
              Nexus Editora — obras publicadas gratuitamente em formato
              digital.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
