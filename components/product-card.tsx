'use client';

import Link from 'next/link';
import { Product } from '@/lib/shared-types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="w-full h-48 bg-neutral-200 relative overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-4xl">📦</div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-neutral-600">
              {product.rating} ({product.ratingCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Features */}
        {product.features.length > 0 && (
          <ul className="text-xs text-neutral-600 mb-4 space-y-1">
            {product.features.slice(0, 2).map((feature, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-primary">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <Link
          href={`/category/${product.category}/${product.productId}`}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded transition text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
