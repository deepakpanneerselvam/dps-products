'use client';

import { Product } from '@/lib/shared-types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useComparison } from '@/context/comparison-context';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  categorySlug: string;
}

export default function ProductDetailPage({
  product,
  relatedProducts,
  categorySlug,
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { products, addProduct, removeProduct, canAddMore } = useComparison();
  const isInComparison = products.some((p) => p.productId === product.productId);

  const handleComparisonToggle = () => {
    if (isInComparison) {
      removeProduct(product.productId);
    } else {
      if (canAddMore()) {
        addProduct(product);
      } else {
        alert('You can compare up to 3 products at a time');
      }
    }
  };

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
            <Link
              href={`/category/${categorySlug}`}
              className="text-primary hover:text-primary-dark transition"
            >
              {categorySlug.replace(/-/g, ' ')}
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-foreground font-semibold line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="bg-neutral-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center h-96">
              {selectedImage ? (
                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-6xl">📦</div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating) ? 'text-2xl text-yellow-400' : 'text-2xl text-neutral-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-neutral-600">
                  {product.rating} out of 5 ({product.ratingCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-700">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition text-center"
              >
                Buy on Amazon
              </a>
              <button
                onClick={handleComparisonToggle}
                className={`w-full border-2 font-bold py-3 rounded transition ${
                  isInComparison
                    ? 'border-primary bg-primary text-white hover:bg-primary-dark'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {isInComparison ? '✓ In Comparison' : 'Add to Compare'}
              </button>
              {products.length > 0 && (
                <Link
                  href="/compare"
                  className="w-full border-2 border-neutral-300 text-foreground hover:bg-neutral-100 font-bold py-3 rounded transition text-center"
                >
                  View Comparison ({products.length}/3)
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        {product.specs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-12 bg-neutral-50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold text-foreground">{spec.name}</span>
                  <span className="text-neutral-600">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {product.pros.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-lg p-8"
            >
              <h3 className="text-xl font-bold text-green-900 mb-4">Pros ✓</h3>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-green-900">
                    <span className="text-green-600">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {product.cons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-lg p-8"
            >
              <h3 className="text-xl font-bold text-red-900 mb-4">Cons ✗</h3>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-900">
                    <span className="text-red-600">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.productId}
                  href={`/category/${categorySlug}/${related.productId}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="h-32 bg-neutral-200 flex items-center justify-center">
                    {related.image ? (
                      <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-3xl">📦</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground line-clamp-2 mb-2">{related.name}</h4>
                    <p className="text-primary font-bold">₹{related.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
