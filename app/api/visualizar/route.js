import { NextResponse } from "next/server";
import { buscarLivroPorSlug } from "@/lib/livros";
import { registrar } from "@/lib/contador";

export const dynamic = "force-dynamic";

export async function POST(request) {
  let slug = null;
  try {
    ({ slug } = await request.json());
  } catch {
    return NextResponse.json({ erro: "formato inválido" }, { status: 400 });
  }

  const livro = typeof slug === "string" ? await buscarLivroPorSlug(slug) : null;
  if (!livro) {
    return NextResponse.json({ erro: "livro não encontrado" }, { status: 404 });
  }

  await registrar(livro.slug, "visualizacao");
  return NextResponse.json({ ok: true });
}
