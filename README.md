# Marly Cestas e Flores

**A vitrine digital da Marly, no Fundão, em Recife.** Fotos reais ajudam a escolher o presente. Um clique no produto leva o nome e o link do item direto para a conversa com a loja.

[Visitar o catálogo](https://marly.srv1113578.stayx.cloud/) · [Ver com animações](https://marly.srv1113578.stayx.cloud/?movimento=ativo) · [Como chegar](https://marly.srv1113578.stayx.cloud/#localizacao)

![Página inicial da Marly com fotos de buquês sobrepostas e acesso ao catálogo](docs/preview-desktop.webp)

## O que tem na vitrine

| Recurso | Como funciona |
| --- | --- |
| Catálogo | 89 produtos da Marly, com foto, preço em reais e categorias para flores, cestas, presentes e Natal. |
| Busca | Encontra termos com ou sem acento. Os filtros ajudam a comparar itens da mesma categoria. |
| Encomenda | O cartão inteiro abre uma mensagem editável no WhatsApp com o nome e o link individual do produto. |
| Localização | O mapa mostra o ponto comercial e oferece um link para traçar a rota. |
| Animações | A abertura e as transições seguem a preferência de movimento do dispositivo. A opção no rodapé salva uma escolha para este site. |

<img src="docs/preview-mobile.webp" width="360" alt="Abertura do catálogo da Marly em um celular, com acesso às categorias de produtos">

## Rodar no computador

O projeto usa **Node.js 24**, **Astro**, **TypeScript** e **CSS**. As fotos são preparadas em WebP e as fontes DM Sans e Fraunces são servidas pelo próprio site.

```bash
git clone https://github.com/Vercuno/catalogo-flor.git
cd catalogo-flor
npm ci
npm run dev
```

O Astro exibe o endereço local no terminal. No PowerShell, use `npm.cmd` no lugar de `npm` se a política de execução bloquear `npm.ps1`.

```bash
npm run build
npm run preview
```

O build gera a pasta `dist/`. A produção serve esses arquivos estáticos pela VPS da StayCloud.

## Atualizar produtos e preços

| Local | O que editar |
| --- | --- |
| [`src/data/products.json`](src/data/products.json) | Nome, categoria, descrição, preço e link público de cada item. |
| [`src/assets/products/`](src/assets/products/) | Fotos WebP com o ID do produto no nome do arquivo. |
| [`src/catalog.ts`](src/catalog.ts) | Contatos da loja, produtos em destaque, endereço e ponto no Google Maps. |

Os campos `price` e `oldPrice` usam centavos. Por exemplo, `5000` representa **R$ 50,00**. Use `oldPrice` quando houver um valor anterior confirmado.

Para importar ou atualizar itens em lote, prepare um TSV UTF-8 com uma linha por produto. Separe ID, preço em centavos, preço anterior opcional e nome do produto com tabulações.

```bash
node scripts/import-catalog.mjs caminho-da-lista.tsv
npm run build
```

O importador confere a ficha pública do WhatsApp, atualiza o item pelo ID e salva a foto localmente. Os preços da seleção inicial foram conferidos no catálogo comercial em 24 de novembro de 2026. A foto do pedido pode aparecer na prévia do link quando o WhatsApp a exibir.

## Repositórios

[Vercuno/catalogo-flor](https://github.com/Vercuno/catalogo-flor) · [RafaelADSdev/catalogo-flor](https://github.com/RafaelADSdev/catalogo-flor)
