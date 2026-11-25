import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataFolder = join(root, 'src', 'data');
const imageFolder = join(root, 'src', 'assets', 'products');
const sourceInput = process.argv[2];

if (!sourceInput) {
  throw new Error('Informe um arquivo TSV com ID do produto, preço em centavos, preço anterior opcional e nome.');
}

const categories = {
  flowers: 'Buquês e flores',
  baskets: 'Cestas e cafés',
  gifts: 'Presentes',
  christmas: 'Natal',
};

const restricted = /\b(vinho|vinhos|cerveja|heineken|budweiser|corona|longs? neck|espumante|champanhe|champagne|vodka|gin|whisk[ye]|licor|alco[oó]lic\w*|cacha[çc]a|brahma|stella artois|skol|chandon|prosecco)\b/i;

function decodeHtml(value) {
  const known = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity.startsWith('#x')) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith('#')) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return known[entity] ?? match;
  });
}

function readMetadata(html, key) {
  const value = html.match(new RegExp(`<meta\\s+property="og:${key}"\\s+content="([^"]*)"`, 'i'))?.[1];
  return value ? decodeHtml(value).trim() : '';
}

function normalize(value) {
  return value.normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('pt-BR');
}

function parseCents(value) {
  return Number(value.replace(/[^\d]/g, ''));
}

function getCategory(name) {
  if (/natal/i.test(name)) return categories.christmas;
  if (/^ramalhete de doces/i.test(name)) return categories.gifts;
  if (/^(ramalhete|mini\s+(bouquet|buquê|ramalhete)|buquê|bouquet|arranjo|flores?\b|girass[oó]l|l[ií]rio|rosas?\b|p[eé]talas)/i.test(name)) {
    return categories.flowers;
  }
  if (/cesta|café|cafe|bandeja|\bbaú\b|lanche/i.test(name)) return categories.baskets;
  return categories.gifts;
}

async function checkedFetch(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7' },
        signal: AbortSignal.timeout(14000),
      });
      if (response.ok) return response;
      if (response.status < 500 && response.status !== 429) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (attempt === 2 || /^HTTP 4(?!29)/.test(error.message)) throw error;
    }
    await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 350));
  }
  throw new Error('A fonte ficou indisponível');
}

async function importProduct(line) {
  const parts = line.split('\t');
  const [id, priceText] = parts;
  const [oldPriceText, sourceName] = parts.length === 4 ? parts.slice(2) : ['', parts[2]];
  if (!/^\d{12,20}$/.test(id) || !/^\d+$/.test(priceText) || !sourceName ||
    (oldPriceText && !/^\d+$/.test(oldPriceText))) throw new Error('Linha TSV inválida');
  if (restricted.test(sourceName)) return null;

  const source = `https://wa.me/p/${id}/558186827981`;
  const page = await checkedFetch(source);
  const html = await page.text();
  const title = readMetadata(html, 'title').replace(/ (?:da empresa|from) Marly Cestas e Flores (?:no|on) WhatsApp\.$/i, '');
  const description = readMetadata(html, 'description');
  const imageUrl = readMetadata(html, 'image');
  if (normalize(title) !== normalize(sourceName)) throw new Error(`Nome divergente: ${title || 'ausente'}`);
  if (restricted.test(description)) return null;
  const descriptionPrice = description.match(/R\$\s*[\d.,]+\s*$/)?.[0];
  if (descriptionPrice && parseCents(descriptionPrice) !== Number(priceText)) {
    const oldPriceShown = oldPriceText && parseCents(descriptionPrice) === Number(oldPriceText);
    if (!oldPriceShown) throw new Error(`Preço divergente na ficha: ${descriptionPrice}`);
  }
  if (!imageUrl || !/(^|\.)fbcdn\.net$|(^|\.)whatsapp\.net$/i.test(new URL(imageUrl).hostname)) {
    throw new Error('A ficha não disponibilizou uma foto do produto');
  }
  const photo = await checkedFetch(imageUrl);
  if (!photo.headers.get('content-type')?.startsWith('image/')) throw new Error('A foto não é uma imagem válida');
  const photoBytes = Buffer.from(await photo.arrayBuffer());
  await sharp(photoBytes)
    .rotate()
    .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
    .withXmp(`<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:source>${source}</dc:source></rdf:Description></rdf:RDF></x:xmpmeta>`)
    .webp({ quality: 85 })
    .toFile(join(imageFolder, `${id}.webp`));

  const name = sourceName.replace(/\s+\(A imagem apresentada[\s\S]+\)$/i, '').trim();
  const sourceNote = sourceName.match(/\((A imagem apresentada[\s\S]+)\)$/i)?.[1];
  const details = (sourceNote || description.replace(/\s*·?\s*R\$\s*[\d.,]+\s*$/, '')).trim();
  return {
    id,
    name,
    category: getCategory(name),
    price: Number(priceText),
    ...(oldPriceText && Number(oldPriceText) > Number(priceText) ? { oldPrice: Number(oldPriceText) } : {}),
    ...(details ? { description: details } : {}),
    source,
  };
}

await Promise.all([mkdir(dataFolder, { recursive: true }), mkdir(imageFolder, { recursive: true })]);
const rows = (await readFile(sourceInput, 'utf8')).trim().split(/\r?\n/).filter(Boolean);
const products = [];
const errors = [];
const skipped = [];
for (let index = 0; index < rows.length; index += 6) {
  const batch = rows.slice(index, index + 6);
  const results = await Promise.allSettled(batch.map(importProduct));
  results.forEach((result, itemIndex) => {
    if (result.status === 'fulfilled' && result.value) products.push(result.value);
    else if (result.status === 'fulfilled') skipped.push(batch[itemIndex].split('\t')[0]);
    else errors.push({ id: batch[itemIndex].split('\t')[0], reason: result.reason.message });
  });
}

if (!products.length) throw new Error(`Nenhum produto importado. ${JSON.stringify(errors)}`);

const file = join(dataFolder, 'products.json');
const existing = await readFile(file, 'utf8')
  .then(JSON.parse)
  .catch(error => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
const byId = new Map(existing.map(product => [product.id, product]));
for (const product of products) byId.set(product.id, product);
await writeFile(file, `${JSON.stringify([...byId.values()], null, 2)}\n`);
console.log(JSON.stringify({ imported: products.length, total: byId.size, skipped, errors }, null, 2));
