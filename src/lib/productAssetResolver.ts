import { cleanProductName, detectCategory, toKebab } from './images';

const productAssetModules = import.meta.glob('../assets/product/**/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}', { eager: true, import: 'default' }) as Record<string, string>;

export interface ProductAsset {
  path: string;
  image: string;
  folder: string;
  fileName: string;
  slug: string;
  name: string;
  category: string;
}

export interface LocalProductAssetQuery {
  name?: string | null;
  slug?: string | null;
  category?: string | null;
}

function normalizeAssetLookup(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\.(png|jpe?g|webp|avif)$/gi, '')
    .replace(/[^a-z0-9\s/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function lookupVariants(value: string): string[] {
  const normalized = normalizeAssetLookup(value);
  if (!normalized) return [];

  const words = normalized.split(' ');
  const last = words[words.length - 1];
  if (last.endsWith('sses') || last.endsWith('ches') || last.endsWith('shes') || last.endsWith('xes') || last.endsWith('zes')) {
    words[words.length - 1] = last.slice(0, -2);
  } else if (last.endsWith('ies') && last.length > 3) {
    words[words.length - 1] = `${last.slice(0, -3)}y`;
  } else if (last.endsWith('s') && !/(ss|us|is)$/.test(last)) {
    words[words.length - 1] = last.slice(0, -1);
  }

  const singular = words.join(' ');
  return singular === normalized ? [normalized] : [normalized, singular];
}

function includesWholePhrase(text: string, phrase: string): boolean {
  return text === phrase || text.startsWith(`${phrase} `) || text.endsWith(` ${phrase}`) || text.includes(` ${phrase} `);
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

function getAssetFolderPath(path: string): string {
  const segments = path.split(/[\\/]+/).filter(Boolean);
  const productIndex = segments.lastIndexOf('product');
  const folderSegments = productIndex >= 0 ? segments.slice(productIndex + 1, -1) : [];
  return folderSegments.length ? folderSegments.join('/') : 'Product Assets';
}

function createAsset(path: string, image: string): ProductAsset {
  const segments = path.split(/[\\/]+/).filter(Boolean);
  const productIndex = segments.lastIndexOf('product');
  const folder = getAssetFolderPath(path);
  const fileName = segments[segments.length - 1]?.replace(/\.(png|jpe?g|webp|avif)$/i, '') ?? 'Product Asset';
  const relativePath = productIndex >= 0 ? segments.slice(productIndex + 1).join('/') : fileName;
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

const EDUCATIONAL_FOLDER_MAP: Record<string, string[]> = {
  'kg classes': ['Educational Furniture/K G', 'Educational Furniture/KG'],
  'primary': ['Educational Furniture/PRIMARY'],
  'high school': ['Educational Furniture/HIGH SCHOOL'],
  'colleges and higher education': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'colleges higher education': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'higher education': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'junior college': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/HIGH SCHOOL'],
  'junior college basic comp table': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/HIGH SCHOOL'],
  'university': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'pg': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'p g': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
  'university and pg': ['Educational Furniture/Colleges & Higher Education', 'Educational Furniture/P.G = IMIVERSITY'],
};

function folderLookupKey(value: string): string {
  return normalizeAssetLookup(value)
    .replace(/\s+and\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function categoryAliases(value?: string): string[] {
  if (!value) return [];
  const normalized = normalizeAssetLookup(value);
  const condensed = normalized.replace(/\s+and\s+/g, ' ');
  const withoutAmpersand = condensed.replace(/\s+\&\s+/g, ' ');
  const variants = new Set<string>([
    normalized,
    condensed,
    withoutAmpersand,
    normalized.replace(/\s+/g, ' '),
  ]);

  return Array.from(variants).filter(Boolean);
}

function getExplicitFolderMatches(category?: string): string[] {
  if (!category) return [];

  const aliases = categoryAliases(category);
  const direct = aliases.flatMap((alias) => EDUCATIONAL_FOLDER_MAP[alias] ?? []);
  if (direct.length > 0) return direct;

  const possibleMatches = Object.entries(EDUCATIONAL_FOLDER_MAP)
    .filter(([key]) => {
      const keyAliases = categoryAliases(key);
      return aliases.some((alias) => keyAliases.some((keyAlias) => keyAlias.includes(alias) || alias.includes(keyAlias)));
    })
    .flatMap(([, paths]) => paths);

  return possibleMatches.length ? possibleMatches : [];
}

export const PRODUCT_ASSETS: ProductAsset[] = Object.entries(productAssetModules)
  .filter(([path]) => !isForbiddenAssetPath(path))
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, image]) => createAsset(path, image));

export function findLocalProductAsset(query: LocalProductAssetQuery): ProductAsset | null {
  const productNames = [...new Set([
    ...lookupVariants(query.name ?? ''),
    ...lookupVariants(query.slug ?? ''),
  ])];
  if (!productNames.length) return null;

  const categoryNames = lookupVariants(query.category ?? '');
  const matchingAssets = PRODUCT_ASSETS.flatMap((asset) => {
    const assetNames = [...new Set([
      ...lookupVariants(asset.name),
      ...lookupVariants(asset.fileName),
    ])];
    const assetCategory = normalizeAssetLookup(asset.folder.split('/')[0] ?? '');
    const categoryMatch = !categoryNames.length || categoryNames.some((category) =>
      lookupVariants(assetCategory).includes(category)
    );
    if (!categoryMatch) return [];

    const exactMatch = assetNames.some((assetName) => productNames.includes(assetName));
    if (exactMatch) return [{ asset, score: 2 }];

    const phraseMatch = assetNames.some((assetName) =>
      productNames.some((productName) => includesWholePhrase(productName, assetName))
    );
    return phraseMatch ? [{ asset, score: 1 }] : [];
  });

  if (!matchingAssets.length) return null;
  const highestScore = Math.max(...matchingAssets.map(({ score }) => score));
  const bestMatches = matchingAssets.filter(({ score }) => score === highestScore);
  return bestMatches.length === 1 ? bestMatches[0].asset : null;
}

export function findProductAssetByUrl(url: string): ProductAsset | null {
  return PRODUCT_ASSETS.find((asset) => asset.image === url) ?? null;
}

const CATEGORY_SUBCATEGORY_FILES: Record<string, Record<string, { folder?: string; fileName: string }>> = {
  'School Furniture': {
    'Student Desk': { fileName: 'Student Desk' },
    'Student Chair': { fileName: 'Student Chair' },
    'Dual Desk': { fileName: 'Dual Desk' },
    'Teacher Table': { fileName: 'Teacher Table' },
    'Teacher Chair': { fileName: 'Teacher Chair' },
    'Kids / Nursery Furniture': { fileName: 'Kids-Nursery' },
    'Activity Table': { fileName: 'Activity Table' },
    'Classroom Seating': { fileName: 'Classroom Seating' },
  },
  'Educational Furniture': {
    'KG Classes': { folder: 'K G', fileName: 'K G (4)' },
    'Primary': { folder: 'PRIMARY', fileName: 'PRIMARY (7)' },
    'High School': { folder: 'HIGH SCHOOL', fileName: 'HIGH SCHOOL' },
    'Colleges & Higher Education': { folder: 'Colleges & Higher Education', fileName: 'JUNIOR COLLEGE STEEL CHAIR' },
  },
  'Hostel Furniture': {
    'Hostel Cots': { fileName: 'Hostel Cots' },
    'Single Cots': { fileName: 'Single Cots' },
    'Bunker Cots': { fileName: 'Bunker Cots' },
    'Triple Cots': { fileName: 'Triple Cots' },
    'Cotton Bed / Spring': { fileName: 'Cotton Bed  Spring' },
    'Cushion Mattresses': { fileName: 'Cushion Mattresses' },
    'Washable Cushion Pillows': { fileName: 'Washable Cushion Pillows' },
    '100% Cotton Bed Sheets': { fileName: '100 Percent Cotton Bed Sheets' },
  },
  'Industrial Storage': {
    'Warehouse Rack': { fileName: 'Warehouse Rack' },
    'Industrial Rack': { fileName: 'Industrial Rack' },
    'Heavy-Duty Rack': { fileName: 'Heavy-Duty Rack' },
    'Slotted Angle Rack': { fileName: 'Slotted Angle Rack' },
    'Pallet Rack': { fileName: 'Pallet Rack' },
    'Long Span Shelving': { fileName: 'Long Span Shelving' },
    'SS Detachable Wire Rack': { fileName: 'SS Detachable Wire Rack' },
    'Steel Locker': { fileName: 'Steel Locker' },
  },
  'Bathroom Collection': {
    'Mirror Cabinet': { fileName: 'Mirror Cabinet' },
    'Vanity Unit': { fileName: 'Vanity Unit' },
    'Bathroom Shelf': { fileName: 'Bathroom Shelf' },
    'Towel Rack': { fileName: 'Towel Rack' },
    'Bathroom Storage': { fileName: 'Bathroom Storage' },
    'Wash Basin Cabinet': { fileName: 'Wash Basin Cabinet' },
    'Stainless Steel Rack': { fileName: 'Stainless Steel Rack' },
  },
  'Letter Box': {
    'ABS Plastic Letter Box': { fileName: 'ABS Plastic Letter Box' },
    'Metal Letter Box': { fileName: 'Metal Letter Box' },
    'Wooden Letter Box': { fileName: 'Wooden Letter Box' },
    'Wall-Mounted Letter Box': { fileName: 'Wall-Mounted Letter Box' },
    'Apartment Cluster System': { fileName: 'Apartment Cluster System' },
    'Society Letter Bank': { fileName: 'Society Letter Bank' },
  },
};

export function getCategorySubcategoryAsset(category: string, subcategory: string): ProductAsset | null {
  const mapping = CATEGORY_SUBCATEGORY_FILES[category]?.[subcategory];
  if (!mapping) return null;

  const expectedFolder = [category, mapping.folder].filter(Boolean).join('/');
  const expectedFolderKey = folderLookupKey(expectedFolder);
  const expectedFileName = normalizeAssetLookup(mapping.fileName);

  return PRODUCT_ASSETS.find((asset) =>
    folderLookupKey(asset.folder) === expectedFolderKey &&
    normalizeAssetLookup(asset.fileName) === expectedFileName
  ) ?? null;
}

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

export function getEducationalAssets(categoryName: string, limit = 3): ProductAsset[] {
  const folderTargets = getExplicitFolderMatches(categoryName);
  const candidates = PRODUCT_ASSETS.filter((asset) => {
    const assetFolder = folderLookupKey(asset.folder);
    const assetPath = folderLookupKey(asset.path);
    if (folderTargets.length > 0) {
      return folderTargets.some((folder) => {
        const normalizedFolder = folderLookupKey(folder);
        return assetFolder.includes(normalizedFolder) || assetPath.includes(normalizedFolder);
      });
    }
    const normalizedCategory = normalizeAssetLookup(categoryName);
    return asset.category.toLowerCase().includes(normalizedCategory) || assetFolder.includes(normalizedCategory) || assetPath.includes(normalizedCategory);
  });

  const unique: ProductAsset[] = [];
  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (!seen.has(candidate.path)) {
      seen.add(candidate.path);
      unique.push(candidate);
    }
  }

  return unique.slice(0, limit);
}

export function getHostelAssets(limit = 4): ProductAsset[] {
  const hostelNames = [
    'Hostel Cot',
    'Single Cot',
    'Bunker Cot',
    'Triple Cot',
  ];

  const hostelFallbacks = [
    'Open Wardrobe by the Pillar',
    'Softly Lit Cabinet Display Room',
    'Metal Storage Cabinet Interior',
    'Six-Door Steel Locker Cabinet',
    'Blue Work Jacket Inside Open Steel Locker',
    'Nine-Compartment Steel Locker Cabinet',
  ];

  const selected: ProductAsset[] = [];
  const seen = new Set<string>();

  for (const label of hostelNames) {
    const product = findProductAssetByName(label, 'Hostel Furniture');
    const fallback = PRODUCT_ASSETS.find((asset) => {
      const assetName = normalizeAssetLookup(asset.name);
      const targetName = normalizeAssetLookup(label);
      return asset.category === 'Hostel Furniture' || assetName.includes(targetName) || targetName.includes(assetName);
    }) ?? PRODUCT_ASSETS.find((asset) => {
      const assetName = normalizeAssetLookup(asset.name);
      return hostelFallbacks.some((fallbackName) => {
        const fallbackKey = normalizeAssetLookup(fallbackName);
        return assetName.includes(fallbackKey) || fallbackKey.includes(assetName);
      });
    });

    const match = product ?? fallback;
    if (match && !seen.has(match.path)) {
      selected.push(match);
      seen.add(match.path);
    }
  }

  if (selected.length < limit) {
    for (const asset of PRODUCT_ASSETS) {
      const normalized = normalizeAssetLookup(asset.name);
      const isHostelLike = /hostel|wardrobe|locker|cabinet|study|dorm|bed|cot|storage/i.test(normalized);
      if (isHostelLike && !seen.has(asset.path)) {
        selected.push(asset);
        seen.add(asset.path);
      }
      if (selected.length >= limit) break;
    }
  }

  return selected.slice(0, limit);
}

export function getHomepageHeroAssets(): ProductAsset[] {
  const candidates = [
    ...getEducationalAssets('KG Classes', 1),
    ...getEducationalAssets('Primary', 1),
    ...getEducationalAssets('High School', 1),
    ...getEducationalAssets('Colleges & Higher Education', 1),
    ...getHostelAssets(2),
  ];
  const unique = new Map<string, ProductAsset>();
  for (const asset of candidates) unique.set(asset.path, asset);
  return Array.from(unique.values()).slice(0, 6);
}

export function findProductAssetByName(name: string, category?: string): ProductAsset | null {
  const targetName = normalizeAssetLookup(cleanProductName(name || ''));
  const targetCategory = category ? normalizeAssetLookup(category) : '';
  const explicitFolders = getExplicitFolderMatches(category);

  const exact = PRODUCT_ASSETS.filter((asset) => {
    const assetName = normalizeAssetLookup(asset.name);
    const assetFileName = normalizeAssetLookup(asset.fileName);
    const assetFolder = folderLookupKey(asset.folder);
    const assetPath = folderLookupKey(asset.path);
    const sameName = assetName === targetName || assetFileName === targetName || assetName.includes(targetName) || targetName.includes(assetName) || assetFileName.includes(targetName) || targetName.includes(assetFileName);

    const explicitFolderMatch = explicitFolders.length > 0
      ? explicitFolders.some((folder) => {
          const normalizedFolder = folderLookupKey(folder);
          return assetFolder.includes(normalizedFolder) || assetPath.includes(normalizedFolder);
        })
      : !targetCategory || assetFolder.includes(targetCategory) || assetPath.includes(targetCategory) || normalizeAssetLookup(asset.category).includes(targetCategory) || targetCategory.includes(normalizeAssetLookup(asset.category));

    return sameName && explicitFolderMatch;
  });

  if (exact.length > 0) return exact[0];

  const partial = PRODUCT_ASSETS.find((asset) => {
    const assetName = normalizeAssetLookup(asset.name);
    const assetFileName = normalizeAssetLookup(asset.fileName);
    const assetFolder = folderLookupKey(asset.folder);
    const assetPath = folderLookupKey(asset.path);
    const sameName =
      assetName.includes(targetName) ||
      targetName.includes(assetName) ||
      assetFileName.includes(targetName) ||
      targetName.includes(assetFileName) ||
      `${assetFolder} ${assetFileName}`.includes(targetName) ||
      targetName.includes(`${assetFolder} ${assetFileName}`);
    const sameFolder = explicitFolders.length > 0
      ? explicitFolders.some((folder) => {
          const normalizedFolder = folderLookupKey(folder);
          return assetFolder.includes(normalizedFolder) || assetPath.includes(normalizedFolder);
        })
      : !targetCategory || assetFolder.includes(targetCategory) || assetPath.includes(targetCategory) || normalizeAssetLookup(asset.category).includes(targetCategory) || targetCategory.includes(normalizeAssetLookup(asset.category));
    return sameName && sameFolder;
  });

  return partial ?? null;
}

export function findProductAssetBySlug(slug: string): ProductAsset | null {
  const target = normalizeAssetLookup(slug || '');
  if (!target) return null;

  const asset = PRODUCT_ASSETS.find((candidate) => {
    const values = [
      candidate.slug,
      candidate.fileName,
      candidate.name,
      candidate.folder,
      `${candidate.folder} ${candidate.fileName}`,
    ];
    return values.some((value) => {
      const normalizedValue = normalizeAssetLookup(value);
      return normalizedValue === target || normalizedValue.includes(target) || target.includes(normalizedValue);
    });
  });

  if (!asset) return null;
  const searchable = `${asset.name} ${asset.folder}`.toLowerCase();
  if (/(play equipment|playground|double slide|slide playground|basketball hoop|swing set|seesaw|merry-go-round)/.test(searchable)) return null;
  return asset;
}
