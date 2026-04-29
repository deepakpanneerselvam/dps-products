'use client';

import ProductCard from '@/components/product-card';
import { Product } from '@/lib/shared-types';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SEOLandingPageProps {
  categoryName: string;
  categorySlug: string;
  priceLabel: string;
  products: Product[];
}

export default function SEOLandingPage({
  categoryName,
  categorySlug,
  priceLabel,
  products,
}: SEOLandingPageProps) {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Best {categoryName} {priceLabel}
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Compare and find the best deals on {categoryName.toLowerCase()} in {priceLabel.toLowerCase()}. 
              Read verified reviews and make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-primary hover:text-primary-dark transition">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <Link
              href={`/category/${categorySlug}`}
              className="text-primary hover:text-primary-dark transition"
            >
              {categoryName}
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-foreground font-semibold">{priceLabel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Section */}
        <motion.div
          className="bg-neutral-50 rounded-lg p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {categoryName} {priceLabel} - Complete Buying Guide
          </h2>
          <p className="text-neutral-600 mb-4">
            Looking for the best {categoryName.toLowerCase()} within {priceLabel.toLowerCase()}? 
            You&apos;ve come to the right place! We&apos;ve carefully curated a selection of {products.length} top-rated products that offer the best value for money.
          </p>
          <p className="text-neutral-600">
            Compare specifications, prices, and reviews to find the perfect match for your needs.
          </p>
        </motion.div>

        {/* Filter Info */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              {products.length} Products Found
            </h3>
            <p className="text-neutral-600">
              Showing {categoryName} in {priceLabel}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="px-3 py-1 bg-primary text-white rounded text-sm font-semibold">
              Price: {priceLabel}
            </span>
            <span className="px-3 py-1 bg-neutral-200 text-foreground rounded text-sm font-semibold">
              Category: {categoryName}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCard key={product.productId} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600 mb-4">
              No products found in this price range.
            </p>
            <Link
              href={`/category/${categorySlug}`}
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Browse all {categoryName} →
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-neutral-200 p-8 mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: `Why buy ${categoryName.toLowerCase()} from SmartIndianBazaar?`,
                a: 'We provide verified reviews, price comparisons, and curated selections from top retailers to help you make the best choice.',
              },
              {
                q: `Are these ${categoryName.toLowerCase()} prices accurate?`,
                a: 'Yes, prices are regularly updated. However, we recommend checking the seller website for the latest prices before purchasing.',
              },
              {
                q: `Can I compare products?`,
                a: 'Absolutely! You can add up to 3 products to our comparison tool to see detailed side-by-side comparisons.',
              },
              {
                q: `How are products ranked?`,
                a: 'Products are ranked based on customer ratings, reviews, specifications, and value for money.',
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-neutral-200 pb-6 last:border-b-0">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
