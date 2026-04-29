export interface PriceRange {
  min: number;
  max: number;
  label: string;
  slug: string;
}

export const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 10000, label: 'Under ₹10,000', slug: 'under-10000' },
  { min: 10000, max: 25000, label: '₹10,000 - ₹25,000', slug: '10000-to-25000' },
  { min: 25000, max: 50000, label: '₹25,000 - ₹50,000', slug: '25000-to-50000' },
  { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000', slug: '50000-to-100000' },
  { min: 100000, max: Infinity, label: 'Above ₹1,00,000', slug: 'above-100000' },
];

export function getProductsByPriceRange(
  products: any[],
  min: number,
  max: number
) {
  return products.filter((p) => p.price >= min && p.price <= max);
}

export function generatePriceRangeSlugs() {
  return PRICE_RANGES.map((range) => ({
    category: 'laptops', // You would iterate through all categories
    range: range.slug,
  }));
}
