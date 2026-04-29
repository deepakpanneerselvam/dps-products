'use client';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  name: string;
  productId: string;
  price: number;
  rating: number;
  ratingCount: number;
  features: string[];
  pros: string[];
  cons: string[];
  specs: ProductSpec[];
  image: string;
  url: string;
  category?: string;
}

export interface Category {
  slug: string;
  name: string;
  productCount: number;
}

export function getCategoryName(slug: string): string {
  const nameMap: Record<string, string> = {
    'air-conditioner': 'Air Conditioners',
    'fitness-gym': 'Fitness & Gym',
    'kitchen-home-appliances': 'Kitchen & Home Appliances',
    'laptop': 'Laptops',
    'menswear-accessories': 'Menswear & Accessories',
    'mobiles': 'Mobiles',
    'smartwatches-earphones': 'Smartwatches & Earphones',
    'television': 'Television',
  };
  return nameMap[slug] || slug.replace(/-/g, ' ');
}
