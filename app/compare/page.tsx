import Header from '@/components/header';
import Footer from '@/components/footer';
import ComparisonPage from '@/components/comparison-page';
import { getAllCategories } from '@/lib/data-loader';

export const metadata = {
  title: 'Compare Products - SmartIndianBazaar',
  description: 'Compare up to 3 products side-by-side. Check prices, specifications, pros & cons.',
};

export default function ComparisonRoute() {
  const categories = getAllCategories();

  return (
    <>
      <Header categories={categories} />
      <ComparisonPage />
      <Footer />
    </>
  );
}
