"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { toEnglishDigits } from '@/lib/utils';
import { NewsItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';

export default function EnglishNewsDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id) {
                    setError('News ID is required');
                    setLoading(false);
                    return;
                }

                // Try to fetch from API first
                try {
                    const res = await fetch(`/api/news/${id}`, { cache: 'no-store' });
                    if (res.ok) {
                        const data = await res.json();
                        setNewsItem(data);
                    } else {
                        throw new Error('Failed to fetch from API');
                    }
                } catch (apiError) {
                    console.warn('API failed, using sample data:', apiError);
                    // Fallback to sample data if API fails
                    const sampleNews = dataStore.getNews().find(item =>
                        item.id === id || (item as any)._id === id
                    );
                    setNewsItem(sampleNews || null);
                }
            } catch (e) {
                console.warn('API failed, using sample data:', e);
                // Fallback to sample data if API fails
                const sampleNews = dataStore.getNews().find(item =>
                    item.id === id || (item as any)._id === id
                );
                setNewsItem(sampleNews || null);
            } finally {
                setLoading(false);
            }
        };
        if (id) load();

        // Aggressive number conversion function
        const convertNumbersToEnglish = () => {
            const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

            // Convert all text nodes
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null
            );

            let node;
            while (node = walker.nextNode()) {
                if (node.textContent && node.parentElement) {
                    let text = node.textContent;
                    let changed = false;

                    for (let i = 0; i < persian.length; i++) {
                        if (text.includes(persian[i])) {
                            text = text.replace(new RegExp(persian[i], 'g'), i.toString());
                            changed = true;
                        }
                    }

                    for (let i = 0; i < arabic.length; i++) {
                        if (text.includes(arabic[i])) {
                            text = text.replace(new RegExp(arabic[i], 'g'), i.toString());
                            changed = true;
                        }
                    }

                    if (changed) {
                        node.textContent = text;
                    }
                }
            }

            // Also convert innerHTML of all elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.innerHTML) {
                    let html = element.innerHTML;
                    let changed = false;

                    for (let i = 0; i < persian.length; i++) {
                        if (html.includes(persian[i])) {
                            html = html.replace(new RegExp(persian[i], 'g'), i.toString());
                            changed = true;
                        }
                    }

                    for (let i = 0; i < arabic.length; i++) {
                        if (html.includes(arabic[i])) {
                            html = html.replace(new RegExp(arabic[i], 'g'), i.toString());
                            changed = true;
                        }
                    }

                    if (changed) {
                        element.innerHTML = html;
                    }
                }
            });
        };

        // Run conversion multiple times with different delays
        setTimeout(convertNumbersToEnglish, 100);
        setTimeout(convertNumbersToEnglish, 500);
        setTimeout(convertNumbersToEnglish, 1000);
        setTimeout(convertNumbersToEnglish, 2000);

        // Set up MutationObserver to catch dynamic content
        const observer = new MutationObserver(() => {
            setTimeout(convertNumbersToEnglish, 100);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        // Run conversion every 2 seconds to catch any missed numbers
        const interval = setInterval(convertNumbersToEnglish, 2000);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [id]);

    const formatDate = (date: Date | string) => {
        const d = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return toEnglishDigits(d);
    };

    if (loading) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <ResponsiveBackground />
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error || !newsItem) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <ResponsiveBackground />
                <div className="text-white text-center">
                    <p className="mb-4">News article not found</p>
                    <Link href="/en/news" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <ResponsiveBackground />

            {/* Navigation */}
            <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-start sm:left-12 lg:left-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
                <Link href="/en" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
                    <span className="relative z-10">Home</span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                <Link href="/en/news" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
                    <span className="relative z-10">News</span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                <Link href="/en/education" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
                    <span className="relative z-10">Education</span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                <Link href="/en/services/consultation" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
                    <span className="relative z-10">Services</span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
                <Link href="/en/contact" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
                    <span className="relative z-10">Contact</span>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>
            </nav>

            {/* Content */}
            <div className="container mx-auto px-4 pt-32 pb-20">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/en/news"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to News
                    </Link>
                </div>

                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="glass-strong rounded-2xl p-8 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}>
                            {newsItem.titleEn || newsItem.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-6" style={{ direction: 'ltr', fontFeatureSettings: '"lnum"' }}>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(newsItem.createdAt)}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {newsItem.author || 'Site Administrator'}
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Total views: {toEnglishDigits(newsItem.views || 0)}
                            </div>
                            {newsItem.featured && (
                                <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                                    Featured
                                </div>
                            )}
                        </div>

                        {(newsItem.excerptEn || newsItem.excerpt) && (
                            <p className="text-xl text-white/80 leading-relaxed border-l-4 border-yellow-500 pl-4" style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}>
                                {newsItem.excerptEn || newsItem.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    {newsItem.imageUrl && (
                        <div className="mb-8">
                            <img
                                src={newsItem.imageUrl}
                                alt={newsItem.titleEn || newsItem.title}
                                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="glass-strong rounded-2xl p-8 mb-8">
                        <div className="prose prose-invert prose-yellow max-w-none">
                            <div
                                className="text-white/90 leading-relaxed whitespace-pre-line"
                                style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}
                                dangerouslySetInnerHTML={{ __html: (newsItem.contentEn || newsItem.content).replace(/\n/g, '<br>') }}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    {newsItem.tags && newsItem.tags.length > 0 && (
                        <div className="glass rounded-xl p-6 mb-8">
                            <h3 className="text-white font-medium mb-4">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {newsItem.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-center">
                        <Link
                            href="/en/news"
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            View Other News
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
