export type CategoryHighlightPill = {
  label: string;
  subcategory: string;
  homepageLabel?: string;
};

export type CategoryHighlightGroup = {
  subcategories: CategoryHighlightPill[];
  accessories?: CategoryHighlightPill[];
};

export const categoryHighlightGroups: Record<string, CategoryHighlightGroup> = {
  'educational-furniture': {
    subcategories: [
      { label: 'KG', subcategory: 'K G' },
      { label: 'Primary', subcategory: 'PRIMARY' },
      { label: 'High School', subcategory: 'HIGH SCHOOL' },
      { label: 'Junior College', subcategory: 'Colleges & Higher Education' },
      { label: 'PG College', subcategory: 'P.G = IMIVERSITY' },
    ],
  },
  'school-furniture': {
    subcategories: [
      { label: 'LKG', subcategory: 'LKG' },
      { label: 'Primary', subcategory: 'Primary' },
      { label: 'High School', subcategory: 'High School' },
      { label: 'Junior College', subcategory: 'Junior College' },
      { label: 'University College', subcategory: 'University College' },
    ],
  },
  'hostel-furniture': {
    subcategories: [
      { label: 'Hostel – Single Cot', homepageLabel: 'Single Cot', subcategory: 'Single Cots' },
      { label: 'Bunker Cots', subcategory: 'Bunker Cots' },
      { label: 'Triple Cots', subcategory: 'Triple Cots' },
      { label: 'Accessories', subcategory: 'Accessories' },
    ],
    accessories: [{ label: 'Protector', subcategory: 'Protector' }],
  },
  'industrial-storage': {
    subcategories: [
      { label: 'SS Detachable Wire Racks', subcategory: 'SS Detachable Wire Rack' },
      { label: 'Commercial Kitchen Rack', subcategory: 'Commercial Kitchen Rack' },
      { label: 'Industrial Heavy-Duty Racks', subcategory: 'Heavy-Duty Rack' },
    ],
  },
  'bathroom-collection': {
    subcategories: [
      { label: 'Waterproof Mirror', subcategory: 'Waterproof Mirror' },
      { label: 'Heart Shape', subcategory: 'Heart Shape' },
    ],
  },
  'letter-boxes': {
    subcategories: [
      { label: 'ABS Plastic Letter Box', subcategory: 'ABS Plastic Letter Box' },
      { label: 'Metal Letter Box', subcategory: 'Metal Letter Box' },
      { label: 'Wooden Letter Box', subcategory: 'Wooden Letter Box' },
      { label: 'Apartment Cluster System', subcategory: 'Apartment Cluster System' },
    ],
  },
};

export function getCategorySubcategoryRoute(categorySlug: string, subcategory: string): string {
  return `/products/category/${categorySlug}?subcategory=${encodeURIComponent(subcategory)}`;
}
