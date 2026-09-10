export default function NumeroDestaque({ valor, rotulo }) {
  return (
    <div className="border-l-2 border-gold pl-4">
      <div className="font-serif text-3xl text-ink">
        {new Intl.NumberFormat("pt-BR").format(valor)}
      </div>
      <div className="mt-1 text-sm text-graphite">{rotulo}</div>
    </div>
  );
}
