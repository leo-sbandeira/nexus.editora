import CardLivro from "./CardLivro";

export default function GradeLivros({ livros }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
      {livros.map((livro) => (
        <CardLivro key={livro.id} livro={livro} />
      ))}
    </div>
  );
}
