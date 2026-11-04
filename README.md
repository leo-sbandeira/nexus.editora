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

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Domínio

`nexuseditoradigital.com.br`, configurado em Project Settings, Domains, na Vercel.
