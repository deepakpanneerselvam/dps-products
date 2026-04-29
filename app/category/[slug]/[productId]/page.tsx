import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductDetailPage from '@/components/product-detail-page';
import { getAllCategories, getProduct, getRelatedProducts } from '@/lib/data-loader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductRouteProps {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { slug, productId } = await params;
  const product = getProduct(slug, productId);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} - Price & Reviews | SmartIndianBazaar`,
    description: `${product.name} - ₹${product.price.toLocaleString()}. Read reviews, compare with similar products, and find the best deal at SmartIndianBazaar.`,
    keywords: `${product.name}, price, reviews, ${product.category}`,
    openGraph: {
      title: `${product.name} - SmartIndianBazaar`,
      description: `${product.name} - ₹${product.price.toLocaleString()}. Best deals and reviews.`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  // This would generate all product pages - for now we'll use dynamic rendering
  return [];
}

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { slug, productId } = await params;

  const categories = getAllCategories();
  const product = getProduct(slug, productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, productId, 3);

  return (
    <>
      <Header categories={categories} />
      <ProductDetailPage
        product={product}
        relatedProducts={relatedProducts}
        categorySlug={slug}
      />
      <Footer />
    </>
  );
}
