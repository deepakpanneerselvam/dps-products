import fs from 'fs';
import path from 'path';
import { Product, Category, getCategoryName } from './shared-types';

const CATEGORY_DIR = path.join(process.cwd(), 'category');

// Cache for loaded data
let categoriesCache: Category[] | null = null;
let productsCache: Map<string, Product[]> = new Map();

export function getAllCategories(): Category[] {
  if (categoriesCache) return categoriesCache;

  try {
    const categories = fs.readdirSync(CATEGORY_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => {
        const categoryPath = path.join(CATEGORY_DIR, dirent.name);
        const productDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
          .filter(d => d.isDirectory());

        return {
          slug: dirent.name,
          name: getCategoryName(dirent.name),
          productCount: productDirs.length,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    categoriesCache = categories;
    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

export function getProductsByCategory(categorySlug: string, page: number = 1, limit: number = 5): {
  products: Product[];
  total: number;
  pages: number;
} {
  if (productsCache.has(categorySlug)) {
    const allProducts = productsCache.get(categorySlug) || [];
    const total = allProducts.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const products = allProducts.slice(start, start + limit);
    return { products, total, pages };
  }

  try {
    const categoryPath = path.join(CATEGORY_DIR, categorySlug);
    const productDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    const products: Product[] = productDirs
      .map(dirent => {
        try {
          const dataPath = path.join(categoryPath, dirent.name, 'data.json');
          const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
          
          return {
            name: data.name || '',
            productId: dirent.name,
            price: data.price || 0,
            rating: data.rating || 0,
            ratingCount: data.ratingCount || 0,
            features: data.features || [],
            pros: data.pros || [],
            cons: data.cons || [],
            specs: data.specs || [],
            image: data.image || '',
            url: data.url || '',
            category: categorySlug,
          };
        } catch {
          return null;
        }
      })
      .filter((p): p is Product => p !== null);

    productsCache.set(categorySlug, products);

    const total = products.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);

    return { products: paginatedProducts, total, pages };
  } catch (error) {
    console.error(`Error loading products for category ${categorySlug}:`, error);
    return { products: [], total: 0, pages: 0 };
  }
}

export function getProduct(categorySlug: string, productId: string): Product | null {
  try {
    const dataPath = path.join(CATEGORY_DIR, categorySlug, productId, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    return {
      name: data.name || '',
      productId: productId,
      price: data.price || 0,
      rating: data.rating || 0,
      ratingCount: data.ratingCount || 0,
      features: data.features || [],
      pros: data.pros || [],
      cons: data.cons || [],
      specs: data.specs || [],
      image: data.image || '',
      url: data.url || '',
      category: categorySlug,
    };
  } catch (error) {
    console.error(`Error loading product ${categorySlug}/${productId}:`, error);
    return null;
  }
}

export function getRelatedProducts(categorySlug: string, currentProductId: string, limit: number = 3): Product[] {
  const { products } = getProductsByCategory(categorySlug, 1, 100);
  return products
    .filter(p => p.productId !== currentProductId)
    .slice(0, limit);
}

export function getAllProducts(): Product[] {
  try {
    const categories = getAllCategories();
    const allProducts: Product[] = [];

    for (const category of categories) {
      const { products } = getProductsByCategory(category.slug, 1, 1000);
      allProducts.push(...products);
    }

    return allProducts;
  } catch (error) {
    console.error('Error loading all products:', error);
    return [];
  }
}
