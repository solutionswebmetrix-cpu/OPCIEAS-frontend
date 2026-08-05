export interface Category {
  id: string;
  parent_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  tagline?: string | null;
  image?: string | null;
  banner_image?: string | null;
  icon?: string | null;
  sort_order?: number;
  is_featured?: boolean;
  status?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  overview: string | null;
  hero_image: string | null;
  solutions: { title: string; desc: string }[];
  certifications: string[];
}

export interface IndustryProject {
  id: string;
  industry_id: string;
  title: string;
  client: string | null;
  location: string | null;
  year: string | null;
  description: string | null;
  image: string | null;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  industry: string | null;
  website: string | null;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string | null;
  image: string | null;
  description: string | null;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  type: string | null;
  experience: string | null;
  description: string | null;
  requirements: string[];
  posted_date: string;
  status: string;
}

export interface ProductImage {
  id?: string;
  product_id?: string;
  image_path: string;
  alt_text?: string | null;
  sort_order?: number;
  is_primary?: boolean;
  created_at?: string;
}

export interface Product {
  id: string;
  seller_id?: string;
  category_id: string | null;
  name: string;
  slug: string;
  sku?: string | null;
  short_desc?: string | null;
  short_description?: string | null;
  long_desc?: string | null;
  description?: string | null;
  features: string[];
  specs: Record<string, string>;
  specifications?: Record<string, any> | string | null;
  dimensions?: Record<string, any> | string | null;
  material?: string | null;
  color?: string | null;
  warranty_months?: number | null;
  min_order_quantity?: number;
  max_order_quantity?: number | null;
  unit?: string;
  price?: number | null;
  discount_price?: number | null;
  discount_percentage?: number | null;
  tax_percentage?: number;
  stock_quantity?: number;
  availability_status?: string;
  is_approved?: boolean;
  approved_at?: string | null;
  approved_by?: string | null;
  featured?: boolean;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_best_seller?: boolean;
  rating?: number;
  total_reviews?: number;
  total_views?: number;
  total_orders?: number;
  status?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  image?: string | null;
  gallery?: string[];
  images?: ProductImage[];
  price_range?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Seller {
  id: string;
  user_id: string;
  company_name: string;
  company_logo?: string | null;
  gst_number?: string | null;
  pan_number?: string | null;
  registration_number?: string | null;
  business_type?: string;
  description?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  pincode?: string | null;
  phone?: string | null;
  alternate_phone?: string | null;
  website?: string | null;
  established_year?: number | null;
  total_employees?: string | null;
  annual_turnover?: string | null;
  certifications?: any;
  bank_details?: any;
  verification_status?: string;
  verification_remarks?: string | null;
  verified_at?: string | null;
  rating?: number;
  total_reviews?: number;
  total_products?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Buyer {
  id: string;
  user_id: string;
  company_name?: string | null;
  company_logo?: string | null;
  gst_number?: string | null;
  business_type?: string;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  pincode?: string | null;
  phone?: string | null;
  alternate_phone?: string | null;
  website?: string | null;
  total_orders?: number;
  total_spent?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PurchaseRequirement {
  id: string;
  buyer_id: string;
  category_id?: string | null;
  title: string;
  slug: string;
  description: string;
  product_name?: string | null;
  required_quantity: number;
  unit?: string;
  budget_min?: number | null;
  budget_max?: number | null;
  preferred_location?: string | null;
  required_by_date?: string | null;
  specifications?: any;
  attachments?: any;
  total_quotes_received?: number;
  status?: string;
  visibility?: string;
  expires_at?: string | null;
  awarded_to?: string | null;
  awarded_at?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  delivery_location?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface RFQPayload {
  company_name?: string;
  contact_name: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  gst?: string;
  category?: string;
  category_id?: string | null;
  product?: string;
  product_name?: string;
  quantity?: string | number;
  budget?: string;
  budget_range_min?: number | null;
  budget_range_max?: number | null;
  expected_delivery?: string;
  required_date?: string | null;
  message?: string;
  description?: string;
  unit?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  delivery_location?: string;
  specifications?: any;
  material?: string;
  color?: string;
  dimensions?: any;
  attachments?: any;
  preferred_supplier_location?: string;
  certification_required?: any;
  payment_terms?: string;
  delivery_terms?: string;
  visibility?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  type?: string;
  source?: string;
  attachments?: any;
  preferred_contact_method?: string;
  preferred_time?: string;
  priority?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  avatar?: string | null;
  status?: string;
  email_verified_at?: string | null;
  last_login_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthStatus {
  authenticated: boolean;
  user?: User | null;
  role?: string | null;
  profile?: Seller | Buyer | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  status_code?: number;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from?: number | null;
  to?: number | null;
  has_more?: boolean;
  next_page_url?: string | null;
  prev_page_url?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: PaginationMeta;
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
}
