'use client';

import { useComparison } from '@/context/comparison-context';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ComparisonPage() {
  const { products, removeProduct, clearAll } = useComparison();

  if (products.length === 0) {
    return (
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Product Comparison</h1>
            <p className="text-neutral-600 mb-8">No products selected for comparison</p>
            <Link
              href="/"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded transition inline-block"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Product Comparison ({products.length}/3)
          </h1>
          {products.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-semibold transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg shadow border border-neutral-200">
          <table className="w-full">
            <tbody>
              {/* Product Names */}
              <tr className="border-b border-neutral-200">
                <td className="bg-neutral-50 p-4 font-bold text-foreground w-40 sticky left-0 z-10">
                  Product
                </td>
                {products.map((product) => (
                  <td key={product.productId} className="p-4 border-l border-neutral-200">
                    <div className="flex flex-col gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded"
                      />
                      <p className="font-semibold text-foreground text-sm">{product.name}</p>
                      <button
                        onClick={() => removeProduct(product.productId)}
                        className="text-red-600 hover:text-red-700 text-sm font-semibold transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                  Price
                </td>
                {products.map((product) => (
                  <td key={`price-${product.productId}`} className="p-4 border-l border-neutral-200">
                    <span className="text-2xl font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                  Rating
                </td>
                {products.map((product) => (
                  <td key={`rating-${product.productId}`} className="p-4 border-l border-neutral-200">
                    <div className="flex items-center gap-2">
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
                      <span className="text-sm text-neutral-600">
                        {product.rating} ({product.ratingCount})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Features */}
              {Math.max(...products.map((p) => p.features.length)) > 0 && (
                <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                    Key Features
                  </td>
                  {products.map((product) => (
                    <td key={`features-${product.productId}`} className="p-4 border-l border-neutral-200">
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="text-primary">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              )}

              {/* Specifications */}
              {Math.max(...products.map((p) => p.specs.length)) > 0 && (
                <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                    Specs
                  </td>
                  {products.map((product) => (
                    <td key={`specs-${product.productId}`} className="p-4 border-l border-neutral-200">
                      <ul className="space-y-2 text-sm">
                        {product.specs.slice(0, 3).map((spec, i) => (
                          <li key={i} className="text-neutral-700">
                            <span className="font-semibold">{spec.name}:</span> {spec.value}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              )}

              {/* Pros */}
              {Math.max(...products.map((p) => p.pros.length)) > 0 && (
                <tr className="border-b border-neutral-200 hover:bg-neutral-50">
                  <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                    Pros
                  </td>
                  {products.map((product) => (
                    <td key={`pros-${product.productId}`} className="p-4 border-l border-neutral-200">
                      <ul className="space-y-2">
                        {product.pros.slice(0, 2).map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                            <span>✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              )}

              {/* Cons */}
              {Math.max(...products.map((p) => p.cons.length)) > 0 && (
                <tr className="hover:bg-neutral-50">
                  <td className="bg-neutral-50 p-4 font-bold text-foreground sticky left-0 z-10">
                    Cons
                  </td>
                  {products.map((product) => (
                    <td key={`cons-${product.productId}`} className="p-4 border-l border-neutral-200">
                      <ul className="space-y-2">
                        {product.cons.slice(0, 2).map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                            <span>✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {products.map((product) => (
            <a
              key={product.productId}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded transition text-center"
            >
              Buy {product.name}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
