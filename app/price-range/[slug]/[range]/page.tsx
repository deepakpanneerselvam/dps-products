'use client';

import { useMemo } from 'react';
import { getAllProducts, getAllCategories, getCategoryName } from '@/lib/data-loader';
import SEOLandingPage from '@/components/seo-landing-page';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface PriceRangePageProps {
  params: Promise<{
    slug: string;
    range: string;
  }>;
}

export default async function PriceRangePage({
  params,
}: PriceRangePageProps) {
  const { slug, range } = await params;
  
  // Decode price range (e.g., "under-50000" -> { min: 0, max: 50000 })
  const priceRange = decodeURIComponent(range);
  const categoryName = getCategoryName(slug);
  
  // Map price range strings to actual ranges
  const rangeMap: { [key: string]: { min: number; max: number; label: string } } = {
    'under-20000': { min: 0, max: 20000, label: 'Under ₹20,000' },
    'under-50000': { min: 0, max: 50000, label: 'Under ₹50,000' },
    'under-100000': { min: 0, max: 100000, label: 'Under ₹1,00,000' },
    '20000-50000': { min: 20000, max: 50000, label: '₹20,000 - ₹50,000' },
    '50000-100000': { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
    '100000-plus': { min: 100000, max: Infinity, label: 'Above ₹1,00,000' },
  };

  const selectedRange = rangeMap[priceRange];
  if (!selectedRange) {
    return <div>Price range not found</div>;
  }

  const allProducts = await getAllProducts();
  const filteredProducts = allProducts.filter(
    (p) =>
      p.category === slug &&
      p.price >= selectedRange.min &&
      p.price <= selectedRange.max
  );

  const categories = getAllCategories();

  return (
    <>
      <Header categories={categories} />
      <SEOLandingPage
        categoryName={categoryName}
        categorySlug={slug}
        priceLabel={selectedRange.label}
        products={filteredProducts}
      />
      <Footer />
    </>
  );
}
