'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, getCategoryName } from '@/lib/shared-types';
import ProductCard from '@/components/product-card';
import AdSense from '@/components/adsense';
import { motion } from 'framer-motion';

interface CategoryPageProps {
  categorySlug: string;
  products: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function CategoryPage({
  categorySlug,
  products,
  total,
  currentPage,
  totalPages,
}: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<'relevant' | 'price-low' | 'price-high' | 'rating'>('relevant');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:text-primary-dark transition">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-foreground font-semibold">{getCategoryName(categorySlug)}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {getCategoryName(categorySlug)}
          </h1>
          <p className="text-neutral-600">
            Showing {(currentPage - 1) * 5 + 1} to {Math.min(currentPage * 5, total)} of {total} products
          </p>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-primary"
              >
                <option value="relevant">Most Relevant</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-12">
          <AdSense slot="1234567890" format="horizontal" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.productId} product={product} index={index} />
          ))}
        </div>

        {/* Middle Ad */}
        <div className="my-12">
          <AdSense slot="0987654321" format="horizontal" />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link
                href={`/category/${categorySlug}?page=${currentPage - 1}`}
                className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition"
              >
                ← Previous
              </Link>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              if (totalPages > 7 && page > 1 && page < totalPages && Math.abs(page - currentPage) > 2) {
                return null;
              }
              return (
                <Link
                  key={page}
                  href={`/category/${categorySlug}?page=${page}`}
                  className={`px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={`/category/${categorySlug}?page=${currentPage + 1}`}
                className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
