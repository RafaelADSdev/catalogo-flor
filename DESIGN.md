---
name: Marly Cestas e Flores
description: Vitrine de flores, cestas e presentes com fotos do catálogo e pedidos por WhatsApp.
colors:
  cream: "#fbf6ed"
  paper: "#fffaf4"
  blush: "#f6ddd9"
  rose-ink: "#98394d"
  berry: "#63273f"
  plum: "#351926"
  ink: "#36202c"
  muted: "#69505a"
  line: "#ddc6c2"
  sky: "#deebef"
  light-ink: "#f7e8e5"
typography:
  display:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontSize: "clamp(3.35rem, 6.65vw, 6.25rem)"
    fontWeight: 550
    lineHeight: 0.97
    letterSpacing: "-.045em"
  headline:
    fontFamily: "Fraunces Variable, Georgia, serif"
    fontSize: "clamp(2.55rem, 5vw, 4.3rem)"
    fontWeight: 550
    lineHeight: 0.99
    letterSpacing: "-.045em"
  title:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 720
    lineHeight: 1.28
  body:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: ".88rem"
    fontWeight: 690
    lineHeight: 1.55
rounded:
  capsule: "2rem"
  collection: ".65rem"
  product-photo: ".68rem"
spacing:
  regular: "1rem"
  wide: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.berry}"
    textColor: "{colors.paper}"
    rounded: "{rounded.capsule}"
    padding: ".68rem 1.2rem"
  button-primary-hover:
    backgroundColor: "{colors.plum}"
  button-secondary:
    textColor: "{colors.berry}"
    rounded: "{rounded.capsule}"
    padding: ".55rem .95rem"
  button-secondary-hover:
    backgroundColor: "{colors.berry}"
    textColor: "{colors.paper}"
  button-contact:
    textColor: "{colors.berry}"
    rounded: "{rounded.capsule}"
    padding: ".55rem .85rem"
  button-contact-hover:
    backgroundColor: "{colors.berry}"
    textColor: "{colors.paper}"
  button-directions:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.plum}"
    rounded: "{rounded.capsule}"
    padding: ".55rem .88rem"
  chip-category:
    textColor: "{colors.berry}"
    typography: "{typography.label}"
    rounded: "{rounded.capsule}"
    padding: ".48rem .82rem"
  chip-category-selected:
    backgroundColor: "{colors.berry}"
    textColor: "{colors.paper}"
  field-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.capsule}"
  card-product:
    textColor: "{colors.ink}"
  product-photo:
    backgroundColor: "{colors.blush}"
    rounded: "{rounded.product-photo}"
  hero-photo:
    backgroundColor: "{colors.blush}"
  link-collection:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.paper}"
    rounded: "{rounded.collection}"
  nav-header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.berry}"
  location-footer:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.paper}"
  toggle-motion-active:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.plum}"
    rounded: "{rounded.capsule}"
---

# Design System: Marly Cestas e Flores

## Overview

**Creative North Star: "Vitrine de floricultura"**

A logo original identifica a Marly. Na apresentação, duas fotos de produtos com molduras de papel se sobrepõem sobre um degradê rosado. O título em Fraunces acompanha a leve inclinação das imagens com uma linha em itálico.

As coleções por foto levam à grade. O catálogo mantém a leitura direta com imagem, nome, preço e uma seta discreta. O rodapé ameixa concentra endereço, mapa, contatos e preferência de movimento.

**Key Characteristics:**

- Fotos dos produtos dão identidade à vitrine.
- Fraunces nos títulos e DM Sans nas informações e ações.
- Movimento nas entradas e respostas a ações, com ajuste disponível no rodapé.

## Colors

Creme e papel sustentam a navegação e a grade. Rosa aquece a abertura e ameixa dá profundidade aos títulos e à área de localização.

### Primary

- **Vinho** (`berry`) marca a chamada principal, a categoria ativa, os preços e as setas dos produtos.
- **Ameixa** (`plum`) aparece nos títulos maiores, nos rótulos das coleções e no rodapé.

### Secondary

- **Rosa suave** (`blush`) serve de base às fotografias e à seleção de texto. **Rosa intenso** (`rose-ink`) destaca o itálico e o foco no fundo claro.

### Tertiary

- **Azul claro** (`sky`) aparece na ação de rota e na superfície inicial do mapa.

### Neutral

- **Creme** (`cream`) forma o fundo do catálogo. **Papel** (`paper`) aparece no cabeçalho, na busca, nas molduras e no texto em fundo ameixa.
- **Tinta** (`ink`), **texto secundário** (`muted`), **texto claro** (`light-ink`) e **linha** (`line`) definem leitura e divisões.

## Typography

Fraunces Variable, com Georgia de apoio, dá forma à marca e aos títulos. DM Sans Variable, com Arial de apoio, atende a nomes, preços, filtros e ações.

- **Display** e **Headline** usam Fraunces 550 e entrelinha próxima de 1. A ênfase em itálico na abertura usa peso 500 e rosa intenso.
- **Title** usa DM Sans 720 a 1rem nos nomes dos produtos, com .9rem até 799px.
- **Body** usa DM Sans a 1rem e entrelinha 1.55. A contagem e os preços usam algarismos tabulares.

## Layout

O contêiner chega a 79rem, com margem mínima de 2rem por lado e 1rem até 799px. A abertura e a área do mapa usam duas colunas em telas largas e empilham até 799px. A faixa de coleções mantém três imagens por linha.

A grade de produtos tem quatro colunas a partir de 1120px, três de 800px a 1119px e duas até 799px. Na mesma faixa, a busca ocupa a largura abaixo dos filtros. O cabeçalho compacto mantém a marca, o acesso à localização e o WhatsApp.

## Elevation & Depth

A colagem usa sombras difusas sob as molduras e sobreposição de papel, foto e fundo rosa. Os produtos usam uma linha sob as informações. Com animações ligadas, o título e as fotos entram em sequência, as coleções animam ao entrar na tela, e cliques em filtros ou em “Ver mais produtos” movimentam a entrada dos itens. O controle no rodapé salva a escolha quando o armazenamento local está disponível. Sem uma escolha salva, vale a preferência de movimento do sistema.

### Named Rules

**The Profundidade na Colagem Rule.** Use as sombras difusas na composição de fotos sobrepostas e mantenha os produtos planos.

## Shapes

Ações, filtros e busca usam cápsulas de 2rem. Fotos da grade têm proporção 1.05 e cantos de .68rem. Coleções usam cantos de .65rem, imagem de ponta a ponta e degradê escuro sob o rótulo. Na abertura, a foto maior tem um canto superior arredondado e a foto menor sobrepõe a moldura em outro ângulo.

## Components

- **Ações.** A chamada do catálogo é preenchida em vinho. As ações secundárias e o WhatsApp do cabeçalho usam contorno. A rota tem preenchimento azul claro no rodapé ameixa.
- **Coleções, filtros e busca.** As coleções fotográficas acionam os filtros do catálogo. A cápsula selecionada tem fundo vinho e texto papel. A busca tem lupa, rótulo acessível e contorno rosa ao receber foco.
- **Produto.** O link reúne foto, nome completo, preço em reais e seta diagonal. O texto acessível identifica o pedido por WhatsApp. Preço anterior e selo de oferta aparecem juntos quando há desconto. A nota “Foto ilustrativa” acompanha a indicação da loja.
- **Localização.** Endereço, rota e contatos acompanham o mapa incorporado. O controle de animações mostra seu estado em uma cápsula.

### Named Rules

**The Pedido no Produto Rule.** Faça do cartão inteiro o link para pedir o item e indique a ação com uma seta discreta e nome acessível.

## Do's and Don'ts

### Do:

- **Do** preserve a logo original e use as fotos dos produtos do catálogo da loja.
- **Do** mantenha nomes completos, preços em reais e foco visível em links, filtros e busca.
- **Do** mantenha conteúdo e navegação disponíveis com as animações desligadas.

### Don't:

- **Don't** repita um botão de WhatsApp em cada cartão.
- **Don't** acrescente selo de oferta a um item sem preço anterior.
