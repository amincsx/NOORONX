"use client";

import Link from 'next/link';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { useState, useEffect } from 'react';
import { ProductItem } from '@/types/admin';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const [product, setProduct] = useState<ProductItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const products = await response.json();
                const foundProduct = products.find((p: ProductItem) => p.id === productId || p._id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('محصول یافت نشد');
                }
            } else {
                setError('خطا در بارگیری محصول');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('خطا در بارگیری محصول');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen relative">
                <ResponsiveBackground />
                <div className="flex justify-center items-center min-h-screen">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen relative">
                <ResponsiveBackground />
                <div className="flex flex-col justify-center items-center min-h-screen px-4">
                    <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                        <h1 className="text-2xl font-bold text-white mb-4">{error || 'محصول یافت نشد'}</h1>
                        <Link href="/catalog" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
                            بازگشت به کاتالوگ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <ResponsiveBackground />

            {/* Navigation */}
            <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
                <Link href="/catalog" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
                    <span className="relative">کاتالوگ</span>
                </Link>
                <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
                    <span className="relative">صفحه اصلی</span>
                </Link>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Product Image */}
                        <div className="space-y-4">
                            {product.imageUrl ? (
                                <div className="aspect-square overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-square flex items-center justify-center rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
                                    <span className="text-white/40 text-lg">بدون تصویر</span>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">

                                {/* Title and Price */}
                                <div className="mb-6">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{product.name}</h1>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl font-bold text-yellow-400">${product.price}</span>
                                        {product.stock !== undefined && (
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${product.stock > 0
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}>
                                                {product.stock > 0 ? `موجود (${product.stock} عدد)` : 'ناموجود'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Category */}
                                {product.category && (
                                    <div className="mb-6">
                                        <h3 className="text-white/70 text-sm font-medium mb-2">دسته‌بندی:</h3>
                                        <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-lg">
                                            {product.category}
                                        </span>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-white/70 text-sm font-medium mb-3">توضیحات محصول:</h3>
                                    <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-white/70 text-sm font-medium mb-3">برچسب‌ها:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Featured Badge */}
                                {product.featured && (
                                    <div className="mb-6">
                                        <span className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                            محصول ویژه
                                        </span>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${product.stock && product.stock > 0
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!product.stock || product.stock <= 0}
                                    >
                                        {product.stock && product.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                                    </button>

                                    <Link
                                        href="/catalog"
                                        className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                                    >
                                        بازگشت به کاتالوگ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}