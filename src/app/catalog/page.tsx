"use client";

import Link from 'next/link';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { useState, useEffect } from 'react';
import { ProductItem } from '@/types/admin';

// Product Card Component
const ProductCard = ({ product, featured = false }: { product: ProductItem; featured?: boolean }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 ${featured ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30' : 'bg-black/20 border border-white/10'
      } backdrop-blur-md`}>
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            ویژه
          </span>
        </div>
      )}

      {product.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-white/60 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-yellow-400">
            ${product.price}
          </span>
          {product.stock !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
              {product.stock > 0 ? `موجود (${product.stock})` : 'ناموجود'}
            </span>
          )}
        </div>

        {product.category && (
          <div className="mb-4">
            <span className="inline-block bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/products/${product.id || product._id}`}
          className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
        >
          جزئیات محصول
        </Link>
      </div>
    </div>
  );
};

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((p: ProductItem) => p.category).filter(Boolean))) as string[];
        setCategories(['all', ...uniqueCategories]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products.filter(p => p.published)
    : products.filter(p => p.published && p.category === selectedCategory);

  const featuredProducts = products.filter(p => p.published && p.featured);
  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg mb-6">
              کاتالوگ محصولات
            </h1>
            <p className="text-xl sm:text-2xl text-white/60 text-shadow mb-8">
              محصولات انرژی نورونکس
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="flex justify-center mb-12">
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        {category === 'all' ? 'همه محصولات' : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-white/60 mb-4">محصولی یافت نشد</h3>
                  <p className="text-white/40">در حال حاضر محصولی در این دسته‌بندی موجود نیست</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
