type AssetModules = Record<string, string>;

const categoryAssetModules: Record<string, AssetModules> = {
  educational: import.meta.glob('../assets/product/School Furniture/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
  institutional: import.meta.glob('../assets/product/vInstitutional Furniture/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
  storage: import.meta.glob('../assets/product/Storage Solutions/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
};

import { CANONICAL_CATEGORIES, PRODUCT_IMAGE_GROUPS, cleanProductName, toKebab, type CanonicalCategoryName } from './images';

function categorySlugsToIds(slugs: readonly string[]): string[] {
  return CANONICAL_CATEGORIES.filter((c) => slugs.includes(c.slug)).map((c) => c.id);
}

export type BusinessVerticalKey = keyof typeof categoryAssetModules;

export const BUSINESS_VERTICALS = {
  'Student For Writing Pad Chair': {
    name: 'Student For Writing Pad Chair',
    categorySlugs: ['educational-furniture', 'school-furniture'],
    categoryIds: categorySlugsToIds(['educational-furniture', 'school-furniture']),
    overview: 'Classroom, library, laboratory and activity furniture engineered for schools, colleges, institutes and campuses.',
    highlights: ['Classroom Dual Desks', 'Student Chairs', 'Library Furniture', 'Laboratory Benches', 'Teacher Tables', 'Classroom Seating'],
  },
  'institutional-furniture': {
    name: 'Institutional Furniture',
    categorySlugs: ['office-furniture', 'hospital-furniture', 'hostel-furniture'],
    categoryIds: categorySlugsToIds(['office-furniture', 'hospital-furniture', 'hostel-furniture']),
    overview: 'Heavy-duty furniture for offices, hospitals, hostels and public institutions — tender-compliant and built for daily commercial use.',
    highlights: ['Executive Office', 'Reception & Boardroom', 'Patient Beds', 'Hospital Carts', 'Hostel Cots', 'Wardrobes / Lockers'],
  },
  'storage-solutions': {
    name: 'Storage Solutions',
    categorySlugs: ['industrial-storage', 'bathroom-collection', 'letter-boxes'],
    categoryIds: categorySlugsToIds(['industrial-storage', 'bathroom-collection', 'letter-boxes']),
    overview: 'Industrial racks, lockers, cabinets, bathroom storage and letter boxes — direct-manufactured steel and SS for every sector.',
    highlights: ['Warehouse Racks', 'Pallet & Long Span', 'Steel Lockers', 'SS Detachable Wire Rack', 'Bathroom Storage', 'Letter Boxes'],
  },
} as const;

export type BusinessVerticalSlug = keyof typeof BUSINESS_VERTICALS;

export function getBusinessVerticalImages(category: BusinessVerticalKey): string[] {
  return Object.entries(categoryAssetModules[category])
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
    .map(([, url]) => url);
}

export function findLocalProductImage(productName: string): string | null {
  const productKey = toKebab(cleanProductName(productName));
  const exactMatch = PRODUCT_IMAGE_GROUPS.find((group) => toKebab(group.cleanName) === productKey);
  return exactMatch?.image || null;
}

export function verticalCategoriesSummary(verticalSlug: BusinessVerticalSlug): CanonicalCategoryName[] {
  const v = BUSINESS_VERTICALS[verticalSlug];
  const categoryIds = new Set<string>(v.categoryIds);
  return CANONICAL_CATEGORIES.filter((c) => categoryIds.has(c.id)).map((c) => c.name as CanonicalCategoryName);
}
