import { NextResponse } from "next/server";
import { buscarLivroPorSlug } from "@/lib/livros";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ erro: "slug não informado" }, { status: 400 });
  }

  const livro = await buscarLivroPorSlug(slug);

  if (!livro) {
    return NextResponse.json({ erro: "livro não encontrado" }, { status: 404 });
  }

  const { error } = await supabase
    .from("downloads")
    .insert({ livro_id: livro.id });

  if (error) {
    console.error("Erro ao registrar download:", error.message);
  }

  return NextResponse.redirect(livro.arquivo_url);
}
