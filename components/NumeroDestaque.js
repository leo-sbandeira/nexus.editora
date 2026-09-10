export default function NumeroDestaque({ valor, rotulo, tema = "claro" }) {
  const escuro = tema === "escuro";

  return (
    <div
      className={`border-l-2 pl-4 ${escuro ? "border-branco/40" : "border-azul"}`}
    >
      <div
        className={`text-3xl font-semibold ${escuro ? "text-branco" : "text-azul"}`}
      >
        {new Intl.NumberFormat("pt-BR").format(valor)}
      </div>
      <div className={`mt-1 text-sm ${escuro ? "text-branco/75" : "text-preto/60"}`}>
        {rotulo}
      </div>
    </div>
  );
}
