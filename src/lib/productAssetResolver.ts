import { cleanProductName, toKebab } from './images';

const productAssetModules = import.meta.glob('../assets/product/**/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>;

export interface ProductAsset {
  path: string;
  image: string;
  folder: string;
  fileName: string;
  slug: string;
  name: string;
}

function createAsset(path: string, image: string): ProductAsset {
  const segments = path.split('/');
  const productIndex = segments.lastIndexOf('product');
  const folder = productIndex >= 0 && productIndex < segments.length - 2 ? segments[productIndex + 1] : 'Product Assets';
  const fileName = segments[segments.length - 1].replace(/\.(png|jpe?g|webp|avif)$/i, '');
  const relativePath = productIndex >= 0 ? segments.slice(productIndex + 1).join('-') : fileName;
  const slug = `asset-${toKebab(relativePath.replace(/\.[^.]+$/, ''))}`;

  return {
    path,
    image,
    folder,
    fileName,
    slug,
    name: cleanProductName(fileName),
  };
}

export const PRODUCT_ASSETS: ProductAsset[] = Object.entries(productAssetModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, image]) => createAsset(path, image));

export function findProductAssetBySlug(slug: string): ProductAsset | null {
  const asset = PRODUCT_ASSETS.find((candidate) => candidate.slug === slug);
  if (!asset) return null;
  const searchable = `${asset.name} ${asset.folder}`.toLowerCase();
  if (/(play equipment|playground|double slide|slide playground|basketball hoop|swing set|seesaw|merry-go-round)/.test(searchable)) return null;
  return asset;
}
