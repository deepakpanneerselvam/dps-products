import Header from '@/components/header';
import Footer from '@/components/footer';
import HomePage from '@/components/home-page';
import { getAllCategories } from '@/lib/data-loader';

export default function Home() {
  const categories = getAllCategories();

  return (
    <>
      <Header categories={categories} />
      <HomePage categories={categories} />
      <Footer />
    </>
  );
}
