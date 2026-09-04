export interface ProductValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export function validateProductEssentials(product: Record<string, any> | null | undefined): ProductValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!product) {
    return {
      valid: false,
      missing: ['Product details are missing.'],
      warnings: ['Create a product record before publishing.'],
    };
  }

  const requiredFields = [
    ['name', 'Product name'],
    ['image', 'Product image'],
    ['short_desc', 'Caption or short description'],
    ['description', 'Description'],
  ];

  for (const [field, label] of requiredFields) {
    const value = product[field];
    const hasValue = typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
    if (!hasValue) missing.push(label);
  }

  if (!product.specs && !product.specifications) {
    warnings.push('Add specification details before publishing.');
  }

  if (!product.price_range && product.price == null && product.discount_price == null) {
    warnings.push('Add a price or mark as “price on request” where applicable.');
  }

  if (!product.supply_type) {
    warnings.push('Add supply type for manufacturing visibility.');
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}
