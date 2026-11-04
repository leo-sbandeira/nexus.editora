/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // O botão "Baixar PDF" acrescenta ?baixar=1 e o navegador salva o arquivo em vez de abri-lo.
        source: "/pdf/:arquivo*",
        has: [{ type: "query", key: "baixar" }],
        headers: [{ key: "Content-Disposition", value: "attachment" }],
      },
    ];
  },
};

module.exports = nextConfig;
