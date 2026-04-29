'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  categories: Array<{ slug: string; name: string }>;
}

export default function Header({ categories }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold">SIB</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">SmartIndianBazaar</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-100 rounded border border-neutral-300 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative hidden sm:block mr-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition"
            >
              Categories ▼
            </button>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg border border-neutral-200"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-neutral-100 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-neutral-200"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-100 rounded border border-neutral-300 focus:outline-none focus:border-primary mb-4"
            />
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-3 py-2 text-sm hover:bg-neutral-100 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
