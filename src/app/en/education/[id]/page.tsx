"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { EducationItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, ArrowRight, Play, FileText, Eye } from 'lucide-react';

export default function EducationDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [educationItem, setEducationItem] = useState<EducationItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/education/${id}`, { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to load education');
                const data = await res.json();
                setEducationItem(data);

                // Track view
                try {
                    const viewRes = await fetch(`/api/education/${id}/views`, {
                        method: 'PATCH',
                        cache: 'no-store'
                    });
                    if (viewRes.ok) {
                        const viewData = await viewRes.json();
                        setEducationItem(prev => prev ? { ...prev, views: viewData.views } : null);
                    }
                } catch (viewError) {
                    console.warn('Failed to track view:', viewError);
                }
            } catch (e) {
                console.warn('API failed, using sample data:', e);
                const sampleEducation = dataStore.getEducation().find(item =>
                    item.id === id || (item as any)._id === id
                );
                setEducationItem(sampleEducation || null);
            } finally {
                setLoading(false);
            }
        };
        if (id) load();
    }, [id]);

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    if (error || !educationItem) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <ResponsiveBackground />
                <div className="text-white text-center">
                    <p className="mb-4">Education content not found</p>
                    <Link href="/en/education" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
                        Back to Education
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
                        href="/en/education"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
                    >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Education
                    </Link>
                </div>

                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="glass-strong rounded-2xl p-8 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed">
                            {educationItem.titleEn || educationItem.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(educationItem.createdAt)}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {educationItem.instructor || 'NOORONX Team'}
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Views: {educationItem.views || 0}
                            </div>
                            {educationItem.category && (
                                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
                                    {educationItem.category}
                                </div>
                            )}
                            {educationItem.featured && (
                                <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                                    Featured
                                </div>
                            )}
                        </div>

                        {(educationItem.descriptionEn || educationItem.description) && (
                            <p className="text-xl text-white/80 leading-relaxed border-l-4 border-green-500 pl-4">
                                {educationItem.descriptionEn || educationItem.description}
                            </p>
                        )}
                    </div>

                    {/* Video */}
                    {educationItem.videoUrl && (
                        <div className="mb-8">
                            <div className="glass rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Play className="w-5 h-5 text-green-400" />
                                    <h3 className="text-white font-medium">Educational Video</h3>
                                </div>
                                <div className="aspect-video bg-black/30 rounded-xl overflow-hidden">
                                    {(() => {
                                        const videoUrl = educationItem.videoUrl;

                                        // Handle Aparat videos
                                        if (videoUrl.includes('aparat.com')) {
                                            // Extract video ID from Aparat URL
                                            let videoId = '';
                                            if (videoUrl.includes('/v/')) {
                                                videoId = videoUrl.split('/v/')[1].split('/')[0].split('?')[0];
                                            } else if (videoUrl.includes('/video/video/embed/videohash/')) {
                                                videoId = videoUrl.split('/video/video/embed/videohash/')[1].split('/')[0].split('?')[0];
                                            } else {
                                                const match = videoUrl.match(/\/([a-zA-Z0-9]+)$/);
                                                if (match) {
                                                    videoId = match[1];
                                                }
                                            }

                                            if (videoId) {
                                                return (
                                                    <iframe
                                                        src={`https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`}
                                                        className="w-full h-full"
                                                        allowFullScreen
                                                        title={educationItem.titleEn || educationItem.title}
                                                        frameBorder="0"
                                                    />
                                                );
                                            }
                                        }

                                        // Handle YouTube videos
                                        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                                            let embedUrl = videoUrl;
                                            if (videoUrl.includes('watch?v=')) {
                                                embedUrl = videoUrl.replace('watch?v=', 'embed/');
                                            } else if (videoUrl.includes('youtu.be/')) {
                                                embedUrl = videoUrl.replace('youtu.be/', 'youtube.com/embed/');
                                            }
                                            return (
                                                <iframe
                                                    src={embedUrl}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                    title={educationItem.titleEn || educationItem.title}
                                                    frameBorder="0"
                                                />
                                            );
                                        }

                                        // Handle direct video files
                                        return (
                                            <video
                                                controls
                                                className="w-full h-full object-cover"
                                                src={videoUrl}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Image */}
                    {educationItem.imageUrl && (
                        <div className="mb-8">
                            <div className="glass rounded-2xl overflow-hidden">
                                <img
                                    src={educationItem.imageUrl}
                                    alt={educationItem.titleEn || educationItem.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="glass rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <h3 className="text-white font-medium text-xl">Course Content</h3>
                        </div>
                        <div
                            className="prose prose-invert max-w-none text-white/90 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: educationItem.contentEn || educationItem.content || '<p>No content available.</p>'
                            }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}