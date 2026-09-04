type AssetModules = Record<string, string>;

const categoryAssetModules: Record<string, AssetModules> = {
  educational: import.meta.glob('../assets/product/School Furniture/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
  institutional: import.meta.glob('../assets/product/vInstitutional Furniture/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
  storage: import.meta.glob('../assets/product/Storage Solutions/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
  fiberglass: import.meta.glob('../assets/product/Fiberglass  Special Order/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as AssetModules,
};

import { CANONICAL_CATEGORIES, PRODUCT_IMAGE_GROUPS, cleanProductName, toKebab, type CanonicalCategoryName } from './images';

function categorySlugsToIds(slugs: readonly string[]): string[] {
  return CANONICAL_CATEGORIES.filter((c) => slugs.includes(c.slug)).map((c) => c.id);
}

const fiberglassNamePatterns = [
  'frp', 'fiberglass', 'glassfiber', 'glass-fiber', 'glass fiber',
  'play', 'playground', 'play ground', 'park', 'garden',
  'outdoor furniture', 'slide', 'swing', 'seesaw', 'merry-go-round', 'merry go round',
  'nursery', 'jungle gym', 'climber', 'multiplay', 'multi play',
];

export type BusinessVerticalKey = keyof typeof categoryAssetModules;

export const BUSINESS_VERTICALS = {
  'educational-furniture': {
    name: 'Educational Furniture',
    categorySlugs: ['educational-furniture', 'school-furniture'],
    categoryIds: categorySlugsToIds(['educational-furniture', 'school-furniture']),
    overview: 'Classroom, library, laboratory and activity furniture engineered for schools, colleges, institutes and campuses.',
    highlights: ['Classroom Dual Desks', 'Student Chairs', 'Library Furniture', 'Laboratory Benches', 'Teacher Tables', 'Play Equipment'],
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
    highlights: ['Warehouse Racks', 'Pallet & Long Span', 'Steel Lockers', 'SS Wire Racks', 'Bathroom Storage', 'Letter Boxes'],
  },
  'fiberglass-special-order': {
    name: 'Fiberglass / Special Order',
    categorySlugs: ['school-furniture'],
    categoryIds: categorySlugsToIds(['school-furniture']),
    namePatterns: fiberglassNamePatterns,
    overview: 'FRP / fiberglass, play equipment, and special-order custom products — corrosion-free solutions for outdoor, coastal and custom projects.',
    highlights: ['FRP / Fiberglass Furniture', 'Outdoor Play Equipment', 'Slides & Swings', 'Custom Molded FRP', 'Special Order Items', 'Coastal / Rustproof'],
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
  return CANONICAL_CATEGORIES.filter((c) => v.categoryIds.includes(c.id)).map((c) => c.name as CanonicalCategoryName);
}
