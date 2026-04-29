'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/data-loader';

interface ComparisonContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearAll: () => void;
  canAddMore: () => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => {
      if (prev.some((p) => p.productId === product.productId)) {
        return prev;
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  const clearAll = () => {
    setProducts([]);
  };

  const canAddMore = () => products.length < 3;

  return (
    <ComparisonContext.Provider
      value={{ products, addProduct, removeProduct, clearAll, canAddMore }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
