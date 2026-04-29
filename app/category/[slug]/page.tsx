import Header from '@/components/header';
import Footer from '@/components/footer';
import CategoryPage from '@/components/category-page';
import { getAllCategories, getProductsByCategory } from '@/lib/data-loader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} - Best Deals | SmartIndianBazaar`,
    description: `Browse ${category.name} products. Compare prices, read reviews and find the best deals at SmartIndianBazaar.`,
    keywords: `${category.name}, deals, best prices, India`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(cat => ({
    slug: cat.slug,
  }));
}

export default async function CategoryRoute({ params, searchParams }: CategoryRouteProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const currentPage = parseInt(page as string, 10);

  const categories = getAllCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const { products, total, pages } = getProductsByCategory(slug, currentPage, 5);

  if (currentPage > pages && pages > 0) {
    notFound();
  }

  return (
    <>
      <Header categories={categories} />
      <CategoryPage
        categorySlug={slug}
        products={products}
        total={total}
        currentPage={currentPage}
        totalPages={pages}
      />
      <Footer />
    </>
  );
}
