import rawProducts from './data/products.json';

export const shop = {
  name: 'Marly Cestas e Flores',
  whatsapp: '5581986827981',
  formattedPhone: '(81) 98682-7981',
  instagram: 'https://www.instagram.com/marlycestas/',
  address: 'Rua Ribeirão Claro, 28, Fundão, Recife–PE',
  postalCode: '52130-480',
};

export const categories = ['Buquês e flores', 'Cestas e cafés', 'Presentes', 'Natal'] as const;

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description?: string;
  source: string;
};

const featuredIds = [
  '39880555904892546',
  '28882814374643575',
  '29288031094215502',
  '38540194298959297',
  '25373757912320811',
  '27628918143464864',
  '40413348244918941',
  '27953133824365887',
  '26807601862252808',
  '25497427219955154',
  '27816496724610063',
  '27820410850948567',
];
const allProducts: Product[] = rawProducts;
const productsById = new Map(allProducts.map(product => [product.id, product]));
const featured = featuredIds.flatMap(id => {
  const item = productsById.get(id);
  return item ? [item] : [];
});
const featuredSet = new Set(featured.map(product => product.id));
export const products = [...featured, ...allProducts.filter(product => !featuredSet.has(product.id))];
export const heroProduct = productsById.get('40413348244918941') ?? featured[0] ?? products[0];
export const heroAccent = productsById.get('39880555904892546');

const mapPlace = `${shop.name} Fundão Recife PE`;
export const mapEmbed = `https://www.google.com/maps?${new URLSearchParams({ q: mapPlace, z: '16', hl: 'pt-BR', output: 'embed' })}`;
export const mapDirections = `https://www.google.com/maps/dir/?${new URLSearchParams({
  api: '1',
  destination: mapPlace,
  destination_place_id: 'ChIJBQZvXPwZqwcRio26ubO3ppw',
})}`;

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatPrice(cents: number) {
  return currency.format(cents / 100);
}

export function orderLink(product?: Product) {
  const message = product
    ? `Olá, Marly! Me interessei por “${product.name}”. Está disponível para encomenda?\n\n${product.source}`
    : 'Olá, Marly! Gostaria de saber mais sobre as flores e os presentes do catálogo.';
  const url = new URL(`https://wa.me/${shop.whatsapp}`);
  url.search = `text=${encodeURIComponent(message)}`;
  return url.href;
}
