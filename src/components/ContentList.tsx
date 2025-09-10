import React from 'react';
import { NewsItem, EducationItem } from '@/types/admin';
import Button from '@/components/ui/Button';
import { Edit, Trash2, Eye, EyeOff, Star, Calendar } from 'lucide-react';

interface ContentListProps {
    type: 'news' | 'education';
    items: (NewsItem | EducationItem)[];
    onEdit: (item: NewsItem | EducationItem) => void;
    onDelete: (id: string) => void;
    onTogglePublished: (id: string, published: boolean) => void;
    onToggleFeatured: (id: string, featured: boolean) => void;
}

export default function ContentList({
    type,
    items,
    onEdit,
    onDelete,
    onTogglePublished,
    onToggleFeatured
}: ContentListProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength: number = 100) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white/90">
                    {type === 'news' ? 'لیست اخبار' : 'لیست آموزش‌ها'} ({items.length})
                </h3>
            </div>

            <div className="divide-y divide-white/10">
                {items.length === 0 ? (
                    <div className="p-8 text-center text-white/60">
                        <div className="text-4xl mb-4">📝</div>
                        <p>هنوز {type === 'news' ? 'خبری' : 'آموزشی'} اضافه نشده است</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="p-6 hover:bg-white/5 transition-colors">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-4 h-full">
                                {/* Content */}
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-lg font-semibold text-white/90 truncate">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1">
                                            {item.published ? (
                                                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                                                    <Eye className="w-3 h-3" />
                                                    منتشر شده
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs border border-gray-500/30">
                                                    <EyeOff className="w-3 h-3" />
                                                    پیش‌نویس
                                                </div>
                                            )}
                                            {item.featured && (
                                                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30">
                                                    <Star className="w-3 h-3" />
                                                    ویژه
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-white/70 mb-3">
                                        {truncateText(
                                            type === 'news' && 'excerpt' in item ?
                                                (item as NewsItem).excerpt || (item as NewsItem).content :
                                                type === 'education' && 'description' in item ?
                                                    (item as EducationItem).description || (item as EducationItem).content :
                                                    item.content
                                        )}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(item.createdAt)}
                                        </div>

                                        {type === 'news' && 'author' in item && item.author && (
                                            <span>نویسنده: {item.author}</span>
                                        )}

                                        {type === 'education' && 'instructor' in item && item.instructor && (
                                            <span>مدرس: {item.instructor}</span>
                                        )}

                                        {type === 'education' && 'duration' in item && item.duration && (
                                            <span>مدت: {item.duration}</span>
                                        )}

                                        {type === 'education' && 'level' in item && item.level && (
                                            <span>
                                                سطح: {
                                                    item.level === 'beginner' ? 'مقدماتی' :
                                                        item.level === 'intermediate' ? 'متوسط' :
                                                            'پیشرفته'
                                                }
                                            </span>
                                        )}
                                    </div>

                                    {item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {item.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions - Fixed at bottom */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onTogglePublished(item.id, !item.published)}
                                                className={item.published ? 'text-green-400 hover:text-green-300 hover:bg-green-500/10' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-500/10'}
                                            >
                                                {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onToggleFeatured(item.id, !item.featured)}
                                                className={item.featured ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-500/10'}
                                            >
                                                <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                                ویرایش
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    if (window.confirm(`آیا از حذف "${item.title}" اطمینان دارید؟`)) {
                                                        onDelete(item.id);
                                                    }
                                                }}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                حذف
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                {item.imageUrl && (
                                    <div className="w-full lg:w-32 h-24 bg-black/30 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
