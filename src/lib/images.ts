
export const CANONICAL_CATEGORIES = [
  { id: '1', slug: 'office-furniture',       name: 'Office Furniture'       },
  { id: '2', slug: 'educational-furniture',  name: 'Educational Furniture'  },
  { id: '3', slug: 'school-furniture',       name: 'School Furniture'       },
  { id: '4', slug: 'hospital-furniture',     name: 'Hospital Furniture'     },
  { id: '5', slug: 'hostel-furniture',       name: 'Hostel Furniture'       },
  { id: '6', slug: 'industrial-storage',     name: 'Industrial Storage'     },
  { id: '7', slug: 'bathroom-collection',    name: 'Bathroom Collection'    },
  { id: '8', slug: 'letter-boxes',           name: 'Letter Box'             },
] as const;

export type CanonicalCategoryName = typeof CANONICAL_CATEGORIES[number]['name'];

const STRICT_RAW_NAME_OVERRIDE: Record<string, CanonicalCategoryName> = {
  'Adjustable Height Table': 'Office Furniture',
  'Adjustable Wood-Top Workshop Table': 'Office Furniture',
  'Beige Seat Tripod Workshop Stool': 'Office Furniture',
  'Bisleri Counter Corner': 'Office Furniture',
  'Black Furniture in a Minimal Classroom': 'School Furniture',
  'Black Office Pedestal with Key': 'Office Furniture',
  'Blank Classroom Notice Board': 'Educational Furniture',
  'Blue Backdrop School Desk Chair': 'School Furniture',
  'Blue Chair in a Workshop Setting': 'Industrial Storage',
  'Blue Corner Study Desk Set': 'School Furniture',
  'Blue Desk Training Room': 'Educational Furniture',
  'Blue Lecture Chair with Writing Tablet': 'Educational Furniture',
  'Blue Pipe Fitting in Workshop': 'Industrial Storage',
  'Blue Work Jacket Inside Open Steel Locker': 'Industrial Storage',
  'Blue and White Two-Tier Step Bench': 'School Furniture',
  'Blue and White Worksite Benches': 'Industrial Storage',
  'Bright Twin Slide Playground': 'School Furniture',
  'Burgundy Classroom Chair with Writing Tablet': 'School Furniture',
  'Chrome Three-Seat Waiting Bench': 'Office Furniture',
  'Chrome Wire Shelving on Terracotta Floor': 'Industrial Storage',
  'Colorful Kindergarten Classroom Furniture': 'School Furniture',
  'Colorful Outdoor Student Desk and Bench': 'School Furniture',
  'Colour-blocked playground swings': 'School Furniture',
  'Colourful Benches in Workshop Storage': 'Industrial Storage',
  "Colourful Children's Table and Chair Set": 'School Furniture',
  'Colourful Multishelf Cabinet Against Blue': 'School Furniture',
  'Colourful Outdoor School Desk Set': 'School Furniture',
  'Colourful Stools on Blue Background': 'School Furniture',
  'Colourful Tiered Shelf Against Patterned Tapestry': 'Educational Furniture',
  'Cream Storage Cabinet with Open Doors': 'Hostel Furniture',
  'Cream Utility Hopper on Casters': 'Industrial Storage',
  'Cream Workshop Cabinet with Open Doors': 'Industrial Storage',
  'Decorative Tile Plumbing Fixture': 'Bathroom Collection',
  'Empty wooden shelf against blue tarp': 'Industrial Storage',
  'Floral Cups on a Pink Classroom Desk': 'School Furniture',
  'Gray Adjustable Drafting Table': 'Office Furniture',
  'Green Stool on Outdoor Ground': 'School Furniture',
  'Green and White Outdoor Student Desk': 'School Furniture',
  'Industrial Cafeteria Table and Stools': 'Industrial Storage',
  'Ivory Tusk Display Cabinet Decor': 'Office Furniture',
  'Lavender Wall with Minimal Pedestal Table': 'Office Furniture',
  'Light Wood Office Desk Set': 'Office Furniture',
  'Light-Wood Modular Workstation Cabinet': 'Office Furniture',
  'Lightwood Rolling Utility Cart': 'Office Furniture',
  'Maroon Tablet-Arm Chair on Concrete': 'Educational Furniture',
  'Metal Frame Bed in a Minimal Room': 'Hostel Furniture',
  'Metal Storage Cabinet Interior': 'Office Furniture',
  'Minimal Desk and Bench Set': 'School Furniture',
  'Minimal Mint Corner with Table and Chair': 'School Furniture',
  'Minimalist Desk and Chair Corner': 'Office Furniture',
  'Minimalist Table and Chair on Blue Backdrop': 'School Furniture',
  'Minimalist Taupe Metal Locker': 'Hostel Furniture',
  'Mobile Beechwood Storage Cabinet': 'Hostel Furniture',
  'Mobile filing cabinet with key lock': 'Office Furniture',
  'Modern Beige Desk with Black Trim': 'Office Furniture',
  'Modern Table with Colourful Chairs': 'School Furniture',
  'Modern White-Tier Shelving Unit': 'Industrial Storage',
  'Modern Wooden Cubicles in Office Lab': 'Office Furniture',
  'Multicolour Children’s Table Set': 'School Furniture',
  'Multicoloured Playground Against a Weathered Wall': 'School Furniture',
  'Naval blue wooden desk on tiled floor': 'School Furniture',
  'Nine-Compartment Steel Locker Cabinet': 'Industrial Storage',
  'Open Wardrobe by the Pillar': 'Hostel Furniture',
  'Open White Key Cabinet on Blue Tabletop': 'Office Furniture',
  'Orange Desk and Bench Set': 'School Furniture',
  'Orange Motorcycle Graphic Chair': 'School Furniture',
  'Orange and Yellow Outdoor School Desk Set': 'School Furniture',
  'Painted Rainbow Cubby Shelf Against Pink Wall': 'School Furniture',
  'Pastel Study Nook in Mint Corner': 'Hostel Furniture',
  'Peach and White Study Set in Mint Room': 'Hostel Furniture',
  'Red Basketball Hoop in a Schoolyard': 'School Furniture',
  'Red Chair with Writing Tablet': 'School Furniture',
  'Red Heart Mirror and Devotional Calendar': 'Bathroom Collection',
  'Red and Black X-Frame Classroom Furniture': 'School Furniture',
  'Red, Gold, and Blue Basketball Hoop': 'School Furniture',
  'Rolling wooden cubby cabinet': 'Hostel Furniture',
  'Round Stool': 'Industrial Storage',
  'Rows of Burgundy Seats in a Bright Classroom': 'School Furniture',
  'Silver Key Safe with Open Door': 'Office Furniture',
  'Simple outdoor wooden utility desk': 'Industrial Storage',
  'Single Beige Student Desk Chair': 'School Furniture',
  'Single Wooden School Desk and Bench': 'School Furniture',
  'Six-Compartment Steel Locker': 'Industrial Storage',
  'Six-Door Steel Locker Cabinet': 'Industrial Storage',
  'Sky Blue Apollo Rack Outdoors': 'Industrial Storage',
  'Softly Lit Cabinet Display Room': 'Office Furniture',
  'Striped Basketball Hoop Under Blue Skies': 'School Furniture',
  'Tall 18-Compartment Gray Metal Locker Cabinet': 'Industrial Storage',
  'Two-Compartment Silver Metal Locker': 'Hostel Furniture',
  'Wall-Mounted Letter Box': 'Letter Box',
  'Warm Wooden Storage Bench in Modern Lobby': 'Office Furniture',
  'Warm Wooden Wardrobes by the Window': 'Hostel Furniture',
  'White Industrial Chair Against Mint Wall': 'Industrial Storage',
  'White Lecture Chair with Writing Tablet': 'Educational Furniture',
  'White Metal Wardrobe with Open Doors': 'Hostel Furniture',
  'White Rolling Tool Cabinet with Green Shelves': 'Industrial Storage',
  'Wooden Storage Bed with Open Drawers': 'Hostel Furniture',
  'Wooden Study Cabinet with Desk': 'Hostel Furniture',
  'Woodgrain Classroom Desk and Bench Set': 'School Furniture',
  'Yellow Platform Table Outdoors': 'School Furniture',
};

function normalizeForOverride(s: string): string {
  return s
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .trim();
}

function lookupStrictOverride(rawName: string): CanonicalCategoryName | null {
  const key = normalizeForOverride(rawName);
  if ((STRICT_RAW_NAME_OVERRIDE as Record<string, CanonicalCategoryName>)[key]) {
    return (STRICT_RAW_NAME_OVERRIDE as Record<string, CanonicalCategoryName>)[key];
  }
  for (const [k, v] of Object.entries(STRICT_RAW_NAME_OVERRIDE)) {
    if (normalizeForOverride(k) === key) return v;
  }
  return null;
}

const CATEGORY_KEYWORDS: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture': [
    'office desk','executive desk','ceo desk','computer table','office table',
    'manager table','conference table','meeting table','reception table',
    'office chair','executive chair','visitor chair','workstation','cubicle',
    'office sofa','office cabinet','mobile pedestal','mobile filing','pedestal',
    'filing cabinet','storage cabinet','bookshelf','office rack','office cupboard',
    'office locker','office','desk','executive','workstation','cabinet','pedestal',
    'locker','reception','cubicle','drafting table','modular workstation',
    'minimal desk','minimalist desk','minimalist table','minimal table',
    'modern desk','naval blue wooden desk','rolling utility cart','lobby bench',
    'storage bench','corner study desk','study nook','peach study set',
    'pastel study nook','workshop table','workshop stool','waiting bench',
    'cafeteria table','key cabinet','key safe','display cabinet','ivory tusk',
    'lavender pedestal table','wood top workshop table','beige seat tripod',
  ],
  'Educational Furniture': [
    'library table','library chair','library rack','reading table','reading chair',
    'laboratory table','laboratory stool','lab bench','science table',
    'lecture stand','podium','training desk','training chair','college furniture',
    'lecture chair','writing tablet','tablet arm','tablet-arm','blue pipe fitting',
    'notice board','step bench','blue desk training','training room',
  ],
  'School Furniture': [
    'student desk','dual desk','single desk','desk bench','student chair',
    'school chair','school bench','teacher table','teacher chair','kids table',
    'kids chair','nursery table','nursery chair','activity table','activity chair',
    'classroom desk','classroom furniture','school stool','kindergarten','nursery',
    'play equipment','playground','slide','swings','basketball','outdoor school',
    'school desk','classroom chair','colorful children','children table',
    'children chair','kids table set','rainbow cubby','playground slide',
    'twin slide','colour-blocked swings','multishelf cabinet against blue',
    'colourful tiered shelf','orange motorcycle graphic chair','striped basketball',
    'red basketball','red gold blue basketball','outdoor student',
    'classroom notice board','student desk chair','blue backdrop school desk',
    'blue corner study desk set','green stool outdoor','woodgrain classroom',
    'minimal desk and bench','single wooden school desk','orange desk and bench',
    'orange yellow outdoor school desk','colourful outdoor school desk set',
    'colourful stools','rows of burgundy seats','x-frame classroom',
    'blue and white two-tier','blue and white worksite benches','floral cups pink',
    'yellow platform table','modern table with colourful chairs','minimal mint corner',
    'multicolour children table set','simple outdoor wooden utility desk',
  ],
  'Hospital Furniture': [
    'hospital bed','patient bed','icu bed','fowler bed','semi fowler',
    'over bed table','bedside locker','hospital chair','doctor table',
    'doctor chair','medicine cabinet','hospital rack','hospital stool',
    'examination table','crash cart','hospital trolley','hospital','medical',
    'clinic','patient','semi-fowler','overbed',
  ],
  'Hostel Furniture': [
    'hostel bed','bunk bed','metal bed','steel bed','hostel locker','wardrobe',
    'cupboard','hostel table','study table','hostel chair','hostel rack',
    'hostel cabinet','student wardrobe','hostel','dormitory','metal frame bed',
    'wooden storage bed','wooden study cabinet','warm wooden wardrobes',
    'open wardrobe by the pillar','white metal wardrobe','rolling wooden cubby',
    'mobile beechwood storage cabinet','cream storage cabinet','cream workshop',
    'cream utility hopper','softly lit cabinet display room','open white key cabinet',
    'blue work jacket inside open steel locker',
  ],
  'Industrial Storage': [
    'industrial rack','warehouse rack','heavy duty rack','steel rack','storage rack',
    'long span rack','slotted angle rack','pallet rack','warehouse shelf',
    'industrial shelf','industrial cabinet','ss wire rack','wire shelving',
    'wire rack','chrome wire','white rolling tool cabinet','industrial storage',
    'sky blue apollo rack','modern white-tier shelving','tiered shelf',
    'patterned tapestry shelf','tall 18-compartment','nine compartment',
    'six door steel locker cabinet','six compartment steel locker',
    'two compartment silver metal locker','minimalist taupe metal locker',
    'metal storage cabinet interior','empty wooden shelf','apollo rack',
    'heavy-duty rack','warehouse','galvanized rack','slotted angle',
  ],
  'Bathroom Collection': [
    'bathroom cabinet','vanity','mirror cabinet','wash basin cabinet',
    'bathroom shelf','storage shelf','towel rack','bathroom rack',
    'washroom cabinet','bathroom storage','red heart mirror','heart mirror',
    'devotional calendar','decorative tile plumbing fixture','bathroom','mirror',
    'washroom','plumbing','tiled bathroom fixture',
  ],
  'Letter Box': [
    'letter box','mailbox','mail box','apartment letter box','society letter box',
    'wall mounted letter box','outdoor letter box','wall-mounted letter box',
    'letterbox','mail box','wall letter','mail','letter',
  ],
};

const bannerAssetModules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>;
const allAssetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>;

function getFileName(path: string): string {
  return path.split('/').pop()?.replace(/\.(png|jpe?g|webp|avif)$/i, '') ?? '';
}

const NOISE_WORDS = ['final', 'copy', 'duplicate', 'new', 'edited'];
const FILENAME_NOISE_REGEX = new RegExp(
  `(\\s*\\(\\d+\\)\\s*|_\\d+|-\\d+|\\s*(?:${NOISE_WORDS.join('|')})\\s*)+$`,
  'gi'
);
const VARIANT_SUFFIX_REGEX = /\s*\(\d+\)\s*$/;

export function cleanProductName(raw: string): string {
  let name = raw.replace(/_/g, ' ');
  let prev: string;
  do {
    prev = name;
    name = name.replace(FILENAME_NOISE_REGEX, '');
  } while (name !== prev);
  name = name.replace(/\s+/g, ' ').trim();
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function toKebab(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function detectCategoryByName(rawName: string): CanonicalCategoryName {
  const lowered = rawName.toLowerCase().replace(/_/g, ' ');
  const scored: { name: CanonicalCategoryName; score: number }[] = CANONICAL_CATEGORIES.map((c) => {
    const keywords = CATEGORY_KEYWORDS[c.name];
    let score = 0;
    for (const kw of keywords) {
      const k = kw.toLowerCase();
      if (lowered.includes(k)) {
        score += 3 + Math.max(0, k.split(' ').length - 1);
      }
    }
    if (lowered.includes(c.name.toLowerCase())) score += 8;
    return { name: c.name, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  return best && best.score > 0 ? best.name : 'Office Furniture';
}

export function resolveCategoryByPath(path: string, fallback: CanonicalCategoryName): CanonicalCategoryName {
  const lower = path.toLowerCase();
  for (const c of CANONICAL_CATEGORIES) {
    const pieces = [c.name, c.slug, c.slug.replace(/-/g, ' ')];
    for (const p of pieces) {
      if (lower.includes(p.toLowerCase())) return c.name;
    }
  }
  const segments = lower.split('/');
  const folder = segments[segments.length - 2] ?? '';
  const folderCat = detectCategoryByName(folder);
  if (folderCat === 'Office Furniture') return fallback;
  return folderCat;
}

const folderNameToCategory: Record<string, CanonicalCategoryName> = {
  'office': 'Office Furniture',
  'office furniture': 'Office Furniture',
  'educational': 'Educational Furniture',
  'educational furniture': 'Educational Furniture',
  'school': 'School Furniture',
  'school furniture': 'School Furniture',
  'hospital': 'Hospital Furniture',
  'hospital furniture': 'Hospital Furniture',
  'hostel': 'Hostel Furniture',
  'hostel furniture': 'Hostel Furniture',
  'industrial': 'Industrial Storage',
  'industrial storage': 'Industrial Storage',
  'warehouse': 'Industrial Storage',
  'bathroom': 'Bathroom Collection',
  'bathroom collection': 'Bathroom Collection',
  'washroom': 'Bathroom Collection',
  'letter box': 'Letter Box',
  'letter boxes': 'Letter Box',
  'mailbox': 'Letter Box',
  'mail box': 'Letter Box',
};

export function detectCategory(path: string, rawName: string): CanonicalCategoryName {
  const strict = lookupStrictOverride(rawName);
  if (strict) return strict;
  const lower = path.toLowerCase().replace(/\\/g, '/');
  const segments = lower.split('/');
  const productFolderIndex = segments.lastIndexOf('product');
  if (productFolderIndex >= 0 && productFolderIndex < segments.length - 2) {
    const subFolder = segments[productFolderIndex + 1];
    if (folderNameToCategory[subFolder]) return folderNameToCategory[subFolder];
  }
  const directFolder = segments[segments.length - 2] ?? '';
  if (folderNameToCategory[directFolder]) return folderNameToCategory[directFolder];
  const nameCat = detectCategoryByName(rawName);
  if (nameCat !== 'Office Furniture') return nameCat;
  return resolveCategoryByPath(path, nameCat);
}

export interface ProductImageGroup {
  key: string;
  cleanName: string;
  category: CanonicalCategoryName;
  image: string;
  gallery: string[];
  filePaths: string[];
}

function isBlacklisted(path: string): boolean {
  return /[\\/]logo[\\/]/i.test(path) || /[\\/]client[\\/]/i.test(path);
}

function buildProductImageGroups(): ProductImageGroup[] {
  const candidates: { path: string; url: string; rawName: string; cleanName: string; category: CanonicalCategoryName }[] = [];
  for (const [path, url] of Object.entries(allAssetModules)) {
    if (isBlacklisted(path)) continue;
    if (/[\\/]assets[\\/][^/\\]+\.(png|jpe?g|webp|avif)$/i.test(path)) continue;
    const rawName = getFileName(path);
    if (!rawName) continue;
    const cleanName = cleanProductName(rawName);
    const category = detectCategory(path, rawName);
    candidates.push({ path, url, rawName, cleanName, category });
  }
  const groupMap = new Map<string, ProductImageGroup>();
  for (const c of candidates) {
    const groupKey = `${c.category}__${toKebab(c.cleanName)}`;
    const existing = groupMap.get(groupKey);
    const pathHasVariant = VARIANT_SUFFIX_REGEX.test(c.rawName);
    if (!existing) {
      groupMap.set(groupKey, {
        key: groupKey,
        cleanName: c.cleanName,
        category: c.category,
        image: c.url,
        gallery: [c.url],
        filePaths: [c.path],
      });
    } else {
      if (existing.filePaths.includes(c.path)) continue;
      if (!pathHasVariant) {
        existing.image = c.url;
      }
      if (!existing.gallery.includes(c.url)) existing.gallery.push(c.url);
      existing.filePaths.push(c.path);
    }
  }
  function extractVariantScore(rawName: string): number {
    const m = rawName.match(/\((\d+)\)\s*$/);
    if (m) return parseInt(m[1], 10) + 1;
    return 0;
  }
  const result: ProductImageGroup[] = [];
  for (const g of groupMap.values()) {
    const galleryEntries: { url: string; score: number }[] = [];
    for (const fp of g.filePaths) {
      const urlFromFp = (Object.entries(allAssetModules).find(([p]) => p === fp) || [])[1];
      const url = urlFromFp || '';
      if (url && !galleryEntries.find((e) => e.url === url)) {
        galleryEntries.push({ url, score: extractVariantScore(getFileName(fp)) });
      }
    }
    galleryEntries.sort((a, b) => a.score - b.score);
    g.gallery = galleryEntries.map((e) => e.url);
    if (g.gallery.length === 0) g.gallery = [g.image];
    const nonVariantImg = galleryEntries.find((e) => e.score === 0)?.url;
    if (nonVariantImg) g.image = nonVariantImg;
    if (!g.gallery.includes(g.image)) g.gallery.unshift(g.image);
    result.push(g);
  }
  result.sort((a, b) => a.cleanName.localeCompare(b.cleanName));
  return result;
}

export const PRODUCT_IMAGE_GROUPS: ProductImageGroup[] = buildProductImageGroups();

export const ALL_PRODUCT_IMAGES: string[] = (() => {
  const set = new Set<string>();
  const arr: string[] = [];
  for (const g of PRODUCT_IMAGE_GROUPS) {
    for (const img of g.gallery) {
      if (!set.has(img)) {
        set.add(img);
        arr.push(img);
      }
    }
  }
  return arr;
})();

function getBannerOrDefault(preferredNames: string[], fallback: string): string {
  for (const [path, url] of Object.entries(bannerAssetModules)) {
    const fn = getFileName(path).toLowerCase();
    for (const pn of preferredNames) {
      if (fn === pn.toLowerCase() || fn.includes(pn.toLowerCase())) return url;
    }
  }
  return fallback;
}

const firstImg = PRODUCT_IMAGE_GROUPS[0]?.image || Object.values(bannerAssetModules)[0] || '';

const OfficeFurnitureImg      = getBannerOrDefault(['Office Furniture'], firstImg);
const EducationalFurnitureImg = getBannerOrDefault(['Educational Furniture'], firstImg);
const SchoolFurnitureImg      = getBannerOrDefault(['School Furniture'], firstImg);
const HospitalFurnitureImg    = getBannerOrDefault(['Hospital Furniture'], firstImg);
const HostelFurnitureImg      = getBannerOrDefault(['Hostel Furniture'], firstImg);
const IndustrialStorageImg    = getBannerOrDefault(['Industrial Storage','Warehouse Racks','SS Wire Racks'], firstImg);
const BathroomStorageImg     = getBannerOrDefault(['Bathroom Storage'], firstImg);
const LetterBoxesImg          = getBannerOrDefault(['Letter Boxes'], firstImg);
const AuditoriumChairsImg     = getBannerOrDefault(['Auditorium Chairs'], firstImg);
const HotelFurnitureImg       = getBannerOrDefault(['Hotel Furniture'], OfficeFurnitureImg);
void AuditoriumChairsImg;

function imagesByCategory(category: CanonicalCategoryName): { image: string; gallery: string[] }[] {
  return PRODUCT_IMAGE_GROUPS.filter((g) => g.category === category).map((g) => ({
    image: g.image,
    gallery: g.gallery,
  }));
}

const OFFICE_POOL = imagesByCategory('Office Furniture');
const EDUCATIONAL_POOL = imagesByCategory('Educational Furniture');
const SCHOOL_POOL = imagesByCategory('School Furniture');
const HOSPITAL_POOL = imagesByCategory('Hospital Furniture');
const HOSTEL_POOL = imagesByCategory('Hostel Furniture');
const INDUSTRIAL_POOL = imagesByCategory('Industrial Storage');
const BATHROOM_POOL = imagesByCategory('Bathroom Collection');
const LETTERBOX_POOL = imagesByCategory('Letter Box');

class UniqueImagePool {
  private used = new Set<string>();
  take(pool: { image: string; gallery: string[] }[]): string {
    for (const p of pool) {
      if (!this.used.has(p.image)) {
        this.used.add(p.image);
        return p.image;
      }
      for (const g of p.gallery) {
        if (!this.used.has(g)) {
          this.used.add(g);
          return g;
        }
      }
    }
    return '';
  }
  takeN(pool: { image: string; gallery: string[] }[], n: number): string[] {
    const out: string[] = [];
    for (const p of pool) {
      if (out.length >= n) break;
      if (!this.used.has(p.image)) {
        this.used.add(p.image);
        out.push(p.image);
      }
      if (out.length >= n) break;
      for (const g of p.gallery) {
        if (out.length >= n) break;
        if (!this.used.has(g)) {
          this.used.add(g);
          out.push(g);
        }
      }
    }
    return out;
  }
}

const UNIQUE = new UniqueImagePool();

const REAL_OFFICE_COUNT = OFFICE_POOL.length;
const REAL_EDUCATIONAL_COUNT = EDUCATIONAL_POOL.length;
const REAL_SCHOOL_COUNT = SCHOOL_POOL.length;
const REAL_HOSPITAL_COUNT = HOSPITAL_POOL.length;
const REAL_HOSTEL_COUNT = HOSTEL_POOL.length;
const REAL_INDUSTRIAL_COUNT = INDUSTRIAL_POOL.length;
const REAL_BATHROOM_COUNT = BATHROOM_POOL.length;
const REAL_LETTERBOX_COUNT = LETTERBOX_POOL.length;

export const PRODUCT_ASSETS: Record<CanonicalCategoryName, { img: string; count: number }> = {
  'Office Furniture':      { img: OFFICE_POOL[0]?.image || OfficeFurnitureImg,      count: REAL_OFFICE_COUNT },
  'Educational Furniture': { img: EDUCATIONAL_POOL[0]?.image || EducationalFurnitureImg, count: REAL_EDUCATIONAL_COUNT },
  'School Furniture':      { img: SCHOOL_POOL[0]?.image || SchoolFurnitureImg,      count: REAL_SCHOOL_COUNT },
  'Hospital Furniture':    { img: HOSTEL_POOL[0]?.image || HospitalFurnitureImg,    count: REAL_HOSPITAL_COUNT },
  'Hostel Furniture':      { img: HOSTEL_POOL[0]?.image || HostelFurnitureImg,      count: REAL_HOSTEL_COUNT },
  'Industrial Storage':    { img: INDUSTRIAL_POOL[0]?.image || IndustrialStorageImg, count: REAL_INDUSTRIAL_COUNT },
  'Bathroom Collection':   { img: BATHROOM_POOL[0]?.image || BathroomStorageImg,   count: REAL_BATHROOM_COUNT },
  'Letter Box':            { img: LETTERBOX_POOL[0]?.image || LetterBoxesImg,       count: REAL_LETTERBOX_COUNT },
};

const INDUSTRIAL_POOL_COPY = [...INDUSTRIAL_POOL];
const OFFICE_POOL_COPY = [...OFFICE_POOL];
const SCHOOL_POOL_COPY = [...SCHOOL_POOL];
const EDUCATIONAL_POOL_COPY = [...EDUCATIONAL_POOL];
const HOSTEL_POOL_COPY = [...HOSTEL_POOL];
const HOSPITAL_POOL_COPY = [...HOSPITAL_POOL];

export const SCHOOL_FURNITURE_IMAGES: Record<string, { image: string; gallery: string[] }> = {
  'library-table':        { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || SchoolFurnitureImg,      gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'classroom-furniture':  { image: UNIQUE.take(SCHOOL_POOL_COPY) || SchoolFurnitureImg,           gallery: UNIQUE.takeN(SCHOOL_POOL_COPY, 3) },
  'student-desk':         { image: UNIQUE.take(SCHOOL_POOL_COPY) || SchoolFurnitureImg,           gallery: UNIQUE.takeN(SCHOOL_POOL_COPY, 3) },
  'student-chair':        { image: UNIQUE.take(SCHOOL_POOL_COPY) || SchoolFurnitureImg,           gallery: UNIQUE.takeN(SCHOOL_POOL_COPY, 3) },
  'teacher-table':        { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'teacher-chair':        { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'laboratory-furniture': { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'library-furniture':    { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'book-rack':            { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
  'storage-cabinet':      { image: UNIQUE.take(HOSTEL_POOL_COPY) || HostelFurnitureImg,           gallery: UNIQUE.takeN(HOSTEL_POOL_COPY, 3) },
  'display-rack':         { image: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, gallery: UNIQUE.takeN(EDUCATIONAL_POOL_COPY, 3) },
};

export const PRODUCT_SHOWCASE_ITEMS = CANONICAL_CATEGORIES.map((c) => ({
  name: c.name,
  img: PRODUCT_ASSETS[c.name].img,
  slug: c.slug,
}));

const heroBg        = UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg;
const heroProduct   = UNIQUE.take(OFFICE_POOL_COPY)     || OfficeFurnitureImg;
const aboutFactory  = UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg;
const manufacturingBg = UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg;

const feat1 = { name: 'Executive Office Workstation', spec: 'Engineered wood • Powder-coated steel • Cable management', img: UNIQUE.take(OFFICE_POOL_COPY)     || OfficeFurnitureImg,      tag: 'Best Seller'   };
const feat2 = { name: 'Institutional Student Desk',   spec: 'Tubular steel frame • Anti-scratch laminate • Stackable',        img: UNIQUE.take(SCHOOL_POOL_COPY)     || SchoolFurnitureImg,       tag: 'Tender Ready'  };
const feat3 = { name: 'Heavy-Duty Warehouse Rack',    spec: 'Load capacity 2000kg/level • Boltless assembly • Galvanized',    img: UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg,    tag: 'Export Grade'  };

const imgEducation    = UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg;
const imgGovernment   = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgCorporate    = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgHealthcare   = HOSPITAL_POOL_COPY.length
                          ? UNIQUE.take(HOSPITAL_POOL_COPY)
                          : (UNIQUE.take(HOSTEL_POOL_COPY)   || HospitalFurnitureImg);
const imgHospitality  = UNIQUE.take(OFFICE_POOL_COPY)      || HotelFurnitureImg;
const imgRetail       = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgWarehouses   = UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg;
const imgFactories    = UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg;
const imgInfrastructure = UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg;
const imgDefence      = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgAirports     = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgMetroRail    = UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg;
const imgSmartCities  = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const imgExports      = UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg;

const gal1 = { src: UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg,    cat: 'Factory',     h: 'tall'   };
const gal2 = { src: UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg,      cat: 'Office',      h: 'medium' };
const gal3 = { src: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, cat: 'Educational', h: 'short'  };
const gal4 = { src: UNIQUE.take(SCHOOL_POOL_COPY)      || SchoolFurnitureImg,      cat: 'Educational', h: 'tall'   };
const gal5 = { src: HOSPITAL_POOL_COPY.length
                 ? UNIQUE.take(HOSPITAL_POOL_COPY)
                 : UNIQUE.take(HOSTEL_POOL_COPY)         || HospitalFurnitureImg,    cat: 'Hospital',    h: 'medium' };
const gal6 = { src: UNIQUE.take(OFFICE_POOL_COPY)      || HotelFurnitureImg,       cat: 'Hotel',       h: 'short'  };
const gal7 = { src: UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg,    cat: 'Warehouse',   h: 'medium' };
const gal8 = { src: UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg,    cat: 'Industrial',  h: 'tall'   };
const gal9 = { src: UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg, cat: 'Library',     h: 'short'  };
const gal10 = { src: UNIQUE.take(OFFICE_POOL_COPY)     || OfficeFurnitureImg,      cat: 'Auditorium',  h: 'medium' };

const exportContainer = UNIQUE.take(INDUSTRIAL_POOL_COPY) || IndustrialStorageImg;
const exportGlobe     = UNIQUE.take(OFFICE_POOL_COPY)     || OfficeFurnitureImg;

const testim1 = UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg;
const testim2 = UNIQUE.take(OFFICE_POOL_COPY)      || OfficeFurnitureImg;
const testim3 = UNIQUE.take(EDUCATIONAL_POOL_COPY) || EducationalFurnitureImg;
const testim4 = UNIQUE.take(INDUSTRIAL_POOL_COPY)  || IndustrialStorageImg;

export const IMG = {
  heroBg,
  heroProduct,
  aboutFactory,
  manufacturingBg,
  products: Object.fromEntries(
    Object.entries(PRODUCT_ASSETS).map(([name, asset]) => [
      name,
      { img: asset.img, count: asset.count || 0 },
    ])
  ),
  featured: [feat1, feat2, feat3],
  industries: {
    Education: imgEducation,
    Government: imgGovernment,
    Corporate: imgCorporate,
    Healthcare: imgHealthcare,
    Hospitality: imgHospitality,
    Retail: imgRetail,
    Warehouses: imgWarehouses,
    Factories: imgFactories,
    Infrastructure: imgInfrastructure,
    Defence: imgDefence,
    Airports: imgAirports,
    'Metro Rail': imgMetroRail,
    'Smart Cities': imgSmartCities,
    Exports: imgExports,
  },
  gallery: [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10],
  exportContainer,
  exportGlobe,
  testimonials: [testim1, testim2, testim3, testim4],
};

export const CATEGORY_BANNERS: Record<CanonicalCategoryName, string> = {
  'Office Furniture':      OfficeFurnitureImg,
  'Educational Furniture': EducationalFurnitureImg,
  'School Furniture':      SchoolFurnitureImg,
  'Hospital Furniture':    HospitalFurnitureImg,
  'Hostel Furniture':      HostelFurnitureImg,
  'Industrial Storage':    IndustrialStorageImg,
  'Bathroom Collection':   BathroomStorageImg,
  'Letter Box':            LetterBoxesImg,
};

export const _debugProductCount = PRODUCT_IMAGE_GROUPS.length;
export const _debugImageCount = ALL_PRODUCT_IMAGES.length;
export const _debugCategoryCounts: Record<string, number> = (() => {
  const counts: Record<string, number> = {};
  for (const g of PRODUCT_IMAGE_GROUPS) {
    counts[g.category] = (counts[g.category] || 0) + 1;
  }
  return counts;
})();
