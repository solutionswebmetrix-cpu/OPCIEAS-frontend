import { PRODUCT_ASSETS, type ProductAsset } from './productAssetResolver';
import type { Category, Product } from './types';

const CATEGORY_DEFINITIONS = [
  { id: '2', name: 'Educational Furniture', slug: 'educational-furniture', assetFolder: 'educational furniture' },
  { id: '3', name: 'School Furniture', slug: 'school-furniture', assetFolder: 'school furniture' },
  { id: '5', name: 'Hostel Furniture', slug: 'hostel-furniture', assetFolder: 'hostel furniture' },
  { id: '6', name: 'Industrial Storage', slug: 'industrial-storage', assetFolder: 'industrial storage' },
  { id: '7', name: 'Bathroom Collection', slug: 'bathroom-collection', assetFolder: 'bathroom collection' },
  { id: '8', name: 'Letter Box', slug: 'letter-boxes', assetFolder: 'letter box' },
  { id: 'commercial-furniture', name: 'Commercial Furniture', slug: 'commercial-furniture', assetFolder: 'commercial furniture' },
] as const;

const HIDDEN_PUBLIC_LETTER_BOX_PRODUCTS = new Set([
  'wall mounted letter box',
  'society letter bank',
]);

const EDUCATIONAL_SUBCATEGORY_BY_FOLDER: Record<string, string> = {
  'k g': 'K G',
  primary: 'PRIMARY',
  'high school': 'HIGH SCHOOL',
  'colleges and higher education': 'Colleges & Higher Education',
  'p g imiversity': 'P.G = IMIVERSITY',
};

const SCHOOL_SUBCATEGORY_BY_FOLDER: Record<string, string> = {
  lkg: 'LKG',
  primary: 'Primary',
  'high school': 'High School',
  'junior college': 'Junior College',
  'university college': 'University College',
};

const SUBCATEGORY_BY_PRODUCT: Record<string, Record<string, string>> = {
  'school furniture': {
    'student desk': 'Student Desk',
    'student chair': 'Student Chair',
    'dual desk': 'Dual Desk',
    'teacher table': 'Teacher Table',
    'teacher chair': 'Teacher Chair',
    'kids nursery': 'Kids / Nursery Furniture',
    'activity table': 'Activity Table',
    'classroom seating': 'Classroom Seating',
  },
  'hostel furniture': {
    'hostel cots': 'Hostel Cots',
    'single cots': 'Single Cots',
    'bunker cots': 'Bunker Cots',
    'triple cots': 'Triple Cots',
    'cotton bed spring': 'Cotton Bed / Spring',
    'cushion mattresses': 'Cushion Mattresses',
    'washable cushion pillows': 'Washable Cushion Pillows',
    '100 percent cotton bed sheets': '100% Cotton Bed Sheets',
  },
  'industrial storage': {
    'warehouse rack': 'Warehouse Rack',
    'industrial rack': 'Industrial Rack',
    'heavy duty rack': 'Heavy-Duty Rack',
    'slotted angle rack': 'Slotted Angle Rack',
    'pallet rack': 'Pallet Rack',
    'long span shelving': 'Long Span Shelving',
    'ss detachable wire rack': 'SS Detachable Wire Rack',
    'steel locker': 'Steel Locker',
  },
  'bathroom collection': {
    'mirror cabinet': 'Mirror Cabinet',
    'vanity unit': 'Vanity Unit',
    'bathroom shelf': 'Bathroom Shelf',
    'towel rack': 'Towel Rack',
    'bathroom storage': 'Bathroom Storage',
    'wash basin cabinet': 'Wash Basin Cabinet',
    'stainless steel rack': 'Stainless Steel Rack',
  },
  'letter box': {
    'abs plastic letter box': 'ABS Plastic Letter Box',
    'metal letter box': 'Metal Letter Box',
    'wooden letter box': 'Wooden Letter Box',
    'apartment cluster system': 'Apartment Cluster System',
  },
};

export const HOSTEL_ACCESSORY_SUBCATEGORIES = Object.entries(SUBCATEGORY_BY_PRODUCT['hostel furniture'])
  .filter(([productName]) => !productName.endsWith('cots'))
  .map(([, subcategory]) => subcategory);

function normalizeAssetLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function getCategoryForAsset(asset: ProductAsset) {
  const folder = normalizeAssetLabel(asset.folder.split('/')[0] ?? '');
  return CATEGORY_DEFINITIONS.find((category) => normalizeAssetLabel(category.assetFolder) === folder);
}

function getSubcategoryForAsset(asset: ProductAsset, categoryFolder: string): string | null {
  const [normalizedAssetCategory, ...assetSubcategoryFolders] = asset.folder
    .split('/')
    .map(normalizeAssetLabel);
  const normalizedCategoryFolder = normalizeAssetLabel(categoryFolder);
  if (normalizedAssetCategory === 'educational furniture' && assetSubcategoryFolders.length) {
    const educationalSubcategory = EDUCATIONAL_SUBCATEGORY_BY_FOLDER[assetSubcategoryFolders.join(' ')];
    if (educationalSubcategory) return educationalSubcategory;
  }
  if (normalizedAssetCategory === 'school furniture' && assetSubcategoryFolders.length) {
    const schoolSubcategory = SCHOOL_SUBCATEGORY_BY_FOLDER[assetSubcategoryFolders.join(' ')];
    if (schoolSubcategory) return schoolSubcategory;
  }

  const normalizedProductName = normalizeAssetLabel(asset.fileName);
  const subcategory = SUBCATEGORY_BY_PRODUCT[normalizedCategoryFolder]?.[normalizedProductName];
  if (subcategory) return subcategory;

  if (normalizedCategoryFolder === 'industrial storage' && normalizedProductName.includes('steel locker')) {
    return 'Steel Locker';
  }

  return null;
}

const catalogAssets = PRODUCT_ASSETS.flatMap((asset) => {
  const category = getCategoryForAsset(asset);
  if (!category) return [];
  if (
    category.slug === 'letter-boxes' &&
    HIDDEN_PUBLIC_LETTER_BOX_PRODUCTS.has(normalizeAssetLabel(asset.fileName))
  ) {
    return [];
  }
  return [{ asset, category }];
});

export const FRONTEND_PUBLIC_CATEGORIES: Category[] = CATEGORY_DEFINITIONS
  .filter((category) => catalogAssets.some(({ category: assetCategory }) => assetCategory.slug === category.slug))
  .map((category, index) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: null,
    tagline: null,
    image: null,
    banner_image: null,
    icon: null,
    sort_order: index + 1,
    is_featured: false,
    status: 'active',
    meta_title: null,
    meta_description: null,
    parent_id: null,
  }));

const usedProductSlugs = new Set<string>();

export const FRONTEND_PUBLIC_PRODUCTS: Product[] = catalogAssets.map(({ asset, category }) => {
  let slug = asset.slug;
  let suffix = 2;
  while (usedProductSlugs.has(slug)) {
    slug = `${asset.slug}-${suffix}`;
    suffix += 1;
  }
  usedProductSlugs.add(slug);

  return {
    id: slug,
    category_id: category.id,
    category_name: category.name,
    category_slug: category.slug,
    subcategory: getSubcategoryForAsset(asset, category.assetFolder),
    name: asset.name,
    slug,
    features: [],
    specs: {},
    image: asset.image,
    gallery: [asset.image],
    price_range: null,
    created_at: '',
  };
});
