import Header from '@/components/header';
import Footer from '@/components/footer';
import SEOLandingPage from '@/components/seo-landing-page';
import { getAllCategories, getProductsByCategory, getCategoryName } from '@/lib/data-loader';
import { PRICE_RANGES } from '@/lib/seo-utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface SEORouteProps {
  params: Promise<{ slug: string; priceRange: string }>;
}

export async function generateMetadata({ params }: SEORouteProps): Promise<Metadata> {
  const { slug, priceRange } = await params;
  const priceRangeData = PRICE_RANGES.find((r) => r.slug === priceRange);

  if (!priceRangeData) {
    return { title: 'Price Range Not Found' };
  }

  const categoryName = getCategoryName(slug);
  const title = `Best ${categoryName} ${priceRangeData.label} in India | SmartIndianBazaar`;
  const description = `Compare best ${categoryName.toLowerCase()} ${priceRangeData.label.toLowerCase()}. Read reviews, check prices and buy from verified sellers at SmartIndianBazaar.`;

  return {
    title,
    description,
    keywords: `${categoryName} ${priceRangeData.label}, best deals, price comparison`,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: any[] = [];

  categories.forEach((cat) => {
    PRICE_RANGES.forEach((range) => {
      params.push({
        slug: cat.slug,
        priceRange: range.slug,
      });
    });
  });

  return params;
}

export default async function SEORoute({ params }: SEORouteProps) {
  const { slug, priceRange } = await params;

  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  const priceRangeData = PRICE_RANGES.find((r) => r.slug === priceRange);

  if (!category || !priceRangeData) {
    notFound();
  }

  // Get all products in the category
  const allProducts: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { products, total, pages } = getProductsByCategory(slug, page, 100);
    if (products.length === 0) {
      hasMore = false;
    } else {
      allProducts.push(...products);
      page++;
      hasMore = page <= pages;
    }
  }

  // Filter by price range
  const filteredProducts = allProducts.filter(
    (p) => p.price >= priceRangeData.min && p.price <= priceRangeData.max
  );

  return (
    <>
      <Header categories={categories} />
      <SEOLandingPage
        categoryName={category.name}
        categorySlug={slug}
        priceLabel={priceRangeData.label}
        products={filteredProducts}
      />
      <Footer />
    </>
  );
}
