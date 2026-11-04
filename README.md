# Nexus Editora

Site da Nexus Editora: catálogo de obras em PDF, gratuitas para download.

## Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Vercel**, hospedagem e deploy automático a cada push no GitHub

Não há banco de dados. O catálogo fica em arquivos do próprio repositório.

## Onde ficam os dados

| caminho            | conteúdo                                   |
|--------------------|--------------------------------------------|
| `data/livros.json`   | obras do catálogo                          |
| `data/autores.json`  | autores                                    |
| `data/colecoes.json` | coleções (opcional)                        |
| `public/pdf/`        | arquivos PDF das obras                     |
| `public/capas/`      | imagens de capa (JPG ou PNG)               |

## Cadastrar uma nova obra

1. Coloque o PDF em `public/pdf/<slug>.pdf` e a capa em `public/capas/<slug>.jpg`.
2. Se o autor ainda não existe, adicione-o em `data/autores.json`.
3. Adicione um item em `data/livros.json`, seguindo o modelo das obras já cadastradas
   (`slug`, `titulo`, `subtitulo`, `autor`, `autores`, `ano`, `cidade`, `editora_nome`,
   `edicao`, `paginas`, `idioma`, `isbn`, `doi`, `licenca`, `colecao`, `sinopse`,
   `sumario`, `capa_url`, `arquivo_url`, `criado_em`).
4. Use `"publicado": false` para manter a obra como rascunho.
5. Faça o commit. A Vercel publica sozinha.

## Contador público (planilha do Google)

Visualizações e downloads são registrados em uma planilha do Google, por um script
(`contador/apps-script.gs`). O site mostra os totais na página inicial e em cada obra.
Se as variáveis abaixo não existirem, o contador some do site.

1. Crie uma planilha no Google Sheets e abra Extensões, Apps Script.
2. Cole o conteúdo de `contador/apps-script.gs` e troque `TROQUE_POR_UMA_SENHA_LONGA` por uma senha.
3. Implantar, Nova implantação, tipo App da Web: executar como **você**, acesso **qualquer pessoa**.
4. Na Vercel, em Settings, Environment Variables, crie:
   - `CONTADOR_URL`: a URL do app da Web (termina em `/exec`)
   - `CONTADOR_TOKEN`: a mesma senha do script
5. Faça um novo deploy.

Cada evento vira uma linha na aba `eventos` da planilha. Os números do site são atualizados a cada 5 minutos.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Domínio

`nexuseditoradigital.com.br`, configurado em Project Settings, Domains, na Vercel.

## Padrão das capas

Toda capa de livro é exibida em mockup (lombada, sombra e páginas na lateral) pelo componente
`components/CapaMockup.js`. Ao criar qualquer tela nova que mostre uma obra, use `CapaMockup`
(ou os cartões `CardLivro` e `CardLancamento`, que já o utilizam) e não renderize `capa_url`
diretamente. Para cadastrar uma obra nova, basta adicionar o item em `data/livros.json` e a capa
em `public/capas/`: o mockup é aplicado automaticamente. Use a capa plana (frente), proporção
aproximada 873 x 1242 px.
