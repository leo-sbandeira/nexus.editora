import { NextResponse } from "next/server";
import { buscarLivroPorSlug } from "@/lib/livros";
import { registrar } from "@/lib/contador";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const slug = new URL(request.url).searchParams.get("slug");
  const livro = slug ? await buscarLivroPorSlug(slug) : null;

  if (!livro) {
    return NextResponse.json({ erro: "livro não encontrado" }, { status: 404 });
  }

  // O download nunca fica preso ao contador: se a planilha demorar, segue sem registrar.
  await registrar(livro.slug, "download", 2500);

  return NextResponse.redirect(new URL(livro.arquivo_url, request.url));
}
