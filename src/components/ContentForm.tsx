import React, { useState, useEffect } from 'react';
import { NewsItem, EducationItem, AdminFormData } from '@/types/admin';
import Button from '@/components/ui/Button';
import { X, Save, Plus, Trash2 } from 'lucide-react';

interface ContentFormProps {
    type: 'news' | 'education';
    item?: NewsItem | EducationItem | null;
    onSave: (data: AdminFormData) => void;
    onCancel: () => void;
}

export default function ContentForm({ type, item, onSave, onCancel }: ContentFormProps) {
    const [formData, setFormData] = useState<AdminFormData>({
        title: '',
        titleEn: '',
        content: '',
        contentEn: '',
        excerpt: '',
        excerptEn: '',
        description: '',
        descriptionEn: '',
        imageUrl: '',
        videoUrl: '',
        duration: '',
        level: 'beginner',
        category: '',
        instructor: '',
        author: '',
        published: false,
        featured: false,
        tags: []
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title || '',
                titleEn: item.titleEn || '',
                content: item.content || '',
                contentEn: item.contentEn || '',
                excerpt: 'excerpt' in item ? item.excerpt || '' : '',
                excerptEn: 'excerptEn' in item ? item.excerptEn || '' : '',
                description: 'description' in item ? item.description || '' : '',
                descriptionEn: 'descriptionEn' in item ? item.descriptionEn || '' : '',
                imageUrl: item.imageUrl || '',
                videoUrl: 'videoUrl' in item ? item.videoUrl || '' : '',
                duration: 'duration' in item ? item.duration || '' : '',
                level: 'level' in item ? item.level || 'beginner' : 'beginner',
                category: 'category' in item ? item.category || '' : '',
                instructor: 'instructor' in item ? item.instructor || '' : '',
                author: 'author' in item ? item.author || '' : '',
                published: item.published || false,
                featured: item.featured || false,
                tags: item.tags || []
            });
        }
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-strong rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-white/20">
                <div className="p-6 flex items-center justify-between flex-shrink-0 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white/90">
                        {item ? `ویرایش ${type === 'news' ? 'خبر' : 'آموزش'}` : `افزودن ${type === 'news' ? 'خبر' : 'آموزش'} جدید`}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onCancel} className="text-white/70 hover:text-white hover:bg-white/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        {/* Title Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    عنوان (فارسی) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="عنوان مطلب"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Title (English) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.titleEn}
                                    onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="Content title"
                                />
                            </div>
                        </div>

                        {/* Content Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    محتوا (فارسی) *
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="متن کامل مطلب"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Content (English) *
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.contentEn}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="Full content text"
                                />
                            </div>
                        </div>

                        {/* Type-specific fields */}
                        {type === 'news' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        خلاصه (فارسی)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                        placeholder="خلاصه خبر"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Excerpt (English)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.excerptEn}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerptEn: e.target.value }))}
                                        className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                        placeholder="News excerpt"
                                    />
                                </div>
                            </div>
                        )}

                        {type === 'education' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            توضیحات (فارسی)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            placeholder="توضیحات دوره"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            Description (English)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.descriptionEn}
                                            onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                                            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            placeholder="Course description"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            مدت دوره
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.duration}
                                            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            placeholder="مثال: ۸ ساعت"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            سطح
                                        </label>
                                        <select
                                            value={formData.level}
                                            onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as 'beginner' | 'intermediate' | 'advanced' }))}
                                            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="beginner">مقدماتی</option>
                                            <option value="intermediate">متوسط</option>
                                            <option value="advanced">پیشرفته</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            دسته‌بندی
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            placeholder="مثال: مبانی"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        مدرس
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.instructor}
                                        onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                                        className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                        placeholder="نام مدرس"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        لینک ویدیو
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                                        className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                        placeholder="https://example.com/video.mp4"
                                    />
                                </div>
                            </>
                        )}

                        {/* Author field for news */}
                        {type === 'news' && (
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    نویسنده
                                </label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                    className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                    placeholder="نام نویسنده"
                                />
                            </div>
                        )}

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                لینک تصویر
                            </label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                برچسب‌ها
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="برچسب جدید"
                                />
                                <Button type="button" variant="secondary" onClick={addTag}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="text-yellow-400 hover:text-yellow-300"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex gap-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                                    className="mr-2 h-4 w-4 text-yellow-400 bg-black/20 rounded border-white/20 focus:ring-yellow-400"
                                />
                                <span className="text-sm text-white/80">منتشر شده</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                    className="mr-2 h-4 w-4 text-yellow-400 bg-black/20 rounded border-white/20 focus:ring-yellow-400"
                                />
                                <span className="text-sm text-white/80">ویژه</span>
                            </label>
                        </div>
                    </div>

                    {/* Form Actions - Fixed at bottom */}
                    <div className="border-t border-white/10 p-6 flex gap-4 flex-shrink-0">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover-lift flex items-center gap-2 shadow-lg"
                        >
                            <Save className="w-4 h-4" />
                            ذخیره
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="glass border border-white/20 text-white/80 px-6 py-3 rounded-lg font-medium hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                        >
                            لغو
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
