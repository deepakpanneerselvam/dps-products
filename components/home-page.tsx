'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomePageProps {
  categories: Array<{ slug: string; name: string; productCount: number }>;
}

export default function HomePage({ categories }: HomePageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              SmartIndianBazaar
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Find the Best Deals on Electronics & Home Appliances
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-primary font-bold py-3 px-8 rounded hover:bg-neutral-100 transition">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white font-bold py-3 px-8 rounded hover:bg-white hover:text-primary transition">
                  Learn More
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-neutral-600 text-lg">
              Explore our wide range of products across all categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link href={`/category/${category.slug}`}>
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer h-full flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 text-2xl text-white">
                      📦
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      {category.productCount} products
                    </p>
                    <span className="text-primary font-semibold hover:text-primary-dark transition">
                      Browse →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✓', title: 'Best Prices', desc: 'Compare prices across multiple sellers' },
              { icon: '⭐', title: 'Verified Reviews', desc: 'Read genuine customer reviews' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Quick shipping to your doorstep' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
