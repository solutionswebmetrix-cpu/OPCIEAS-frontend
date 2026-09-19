import { cleanProductName, detectCategory, toKebab } from './images';

const productAssetModules = import.meta.glob('../assets/product/**/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>;

export interface ProductAsset {
  path: string;
  image: string;
  folder: string;
  fileName: string;
  slug: string;
  name: string;
  category: string;
}

function isForbiddenAssetPath(path: string): boolean {
  const normalized = path.toLowerCase();
  return (
    /[\\/]logo[\\/]/i.test(path) ||
    /[\\/]client[\\/]/i.test(path) ||
    /[\\/]trusted[\\/]/i.test(path) ||
    /trustedby/i.test(normalized) ||
    /trusted/i.test(normalized) ||
    /clientlogos?/i.test(normalized) ||
    /client[-_ ]?logo/i.test(normalized) ||
    /tata/i.test(normalized) ||
    /marriott/i.test(normalized) ||
    /educational institutions/i.test(normalized) ||
    /company[-_ ]?logos?/i.test(normalized)
  );
}

function createAsset(path: string, image: string): ProductAsset {
  const segments = path.split('/');
  const productIndex = segments.lastIndexOf('product');
  const folder = productIndex >= 0 && productIndex < segments.length - 2 ? segments[productIndex + 1] : 'Product Assets';
  const fileName = segments[segments.length - 1].replace(/\.(png|jpe?g|webp|avif)$/i, '');
  const relativePath = productIndex >= 0 ? segments.slice(productIndex + 1).join('-') : fileName;
  const slug = `asset-${toKebab(relativePath.replace(/\.[^.]+$/, ''))}`;
  const category = detectCategory(path, fileName);

  return {
    path,
    image,
    folder,
    fileName,
    slug,
    name: cleanProductName(fileName),
    category,
  };
}

export const PRODUCT_ASSETS: ProductAsset[] = Object.entries(productAssetModules)
  .filter(([path]) => !isForbiddenAssetPath(path))
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, image]) => createAsset(path, image));

const SHOWCASE_CURATION: Record<string, string[]> = {
  'Educational Furniture': [
    'Maroon Tablet-Arm Chair on Concrete',
    'Blue Lecture Chair with Writing Tablet',
    'White Lecture Chair with Writing Tablet',
    'Colourful Tiered Shelf Against Patterned Tapestry',
    'Blue Desk Training Room',
  ],
  'School Furniture': [
    'Black Furniture in a Minimal Classroom',
    'Colorful Kindergarten Classroom Furniture',
    "Colourful Children's Table and Chair Set",
    'Orange Desk and Bench Set',
    'Woodgrain Classroom Desk and Bench Set',
  ],
  'Hostel Furniture': [
    'Warm Wooden Wardrobes by the Window',
    'Wooden Storage Bed with Open Drawers',
    'Wooden Study Cabinet with Desk',
    'Open Wardrobe by the Pillar',
    'White Metal Wardrobe with Open Doors',
  ],
  'Industrial Storage': [
    'Chrome Wire Shelving on Terracotta Floor',
    'Modern White-Tier Shelving Unit',
    'Tall 18-Compartment Gray Metal Locker Cabinet',
    'Nine-Compartment Steel Locker Cabinet',
    'Six-Door Steel Locker Cabinet',
  ],
  'Bathroom Collection': [
    'Decorative Tile Plumbing Fixture',
    'Red Heart Mirror and Devotional Calendar',
    'Cream Storage Cabinet with Open Doors',
    'Cream Workshop Cabinet with Open Doors',
    'White Rolling Tool Cabinet with Green Shelves',
  ],
  'Letter Box': [
    'Wall-Mounted Letter Box',
    'Silver Key Safe with Open Door',
    'Open White Key Cabinet on Blue Tabletop',
    'Mobile filing cabinet with key lock',
    'Black Office Pedestal with Key',
  ],
};

function curateShowcase(categoryName: string, curatedNames: string[]): ProductAsset[] {
  const result: ProductAsset[] = [];
  const usedSlugs = new Set<string>();
  for (const name of curatedNames) {
    const found = findProductAssetByName(name, categoryName);
    if (found && !usedSlugs.has(found.slug)) {
      result.push(found);
      usedSlugs.add(found.slug);
    }
  }
  if (result.length < 5) {
    const fillers = PRODUCT_ASSETS.filter(
      (asset) => asset.category === categoryName && !usedSlugs.has(asset.slug),
    ).slice(0, 5 - result.length);
    for (const f of fillers) {
      result.push(f);
      usedSlugs.add(f.slug);
    }
  }
  return result.slice(0, 5);
}

const builtCatalog: Record<string, ProductAsset[]> = {};
for (const [category, names] of Object.entries(SHOWCASE_CURATION)) {
  builtCatalog[category] = curateShowcase(category, names);
}
builtCatalog['Letter Boxes'] = builtCatalog['Letter Box'] ?? [];

export const HOMEPAGE_SHOWCASE_CATALOG: Record<string, ProductAsset[]> = builtCatalog;

export function findProductAssetByName(name: string, category?: string): ProductAsset | null {
  const targetName = cleanProductName(name || '').toLowerCase();
  const targetCategory = category ? category.trim().toLowerCase() : '';

  const exact = PRODUCT_ASSETS.find((asset) => {
    const sameName = asset.name.toLowerCase() === targetName;
    const sameCategory = !targetCategory || asset.category.toLowerCase() === targetCategory;
    return sameName && sameCategory;
  });
  if (exact) return exact;

  const partial = PRODUCT_ASSETS.find((asset) => {
    const sameName = asset.name.toLowerCase().includes(targetName) || targetName.includes(asset.name.toLowerCase());
    const sameCategory = !targetCategory || asset.category.toLowerCase() === targetCategory;
    return sameName && sameCategory;
  });
  return partial ?? null;
}

export function findProductAssetBySlug(slug: string): ProductAsset | null {
  const asset = PRODUCT_ASSETS.find((candidate) => candidate.slug === slug);
  if (!asset) return null;
  const searchable = `${asset.name} ${asset.folder}`.toLowerCase();
  if (/(play equipment|playground|double slide|slide playground|basketball hoop|swing set|seesaw|merry-go-round)/.test(searchable)) return null;
  return asset;
}
