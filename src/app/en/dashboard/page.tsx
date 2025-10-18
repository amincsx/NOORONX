"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductItem } from '@/types/admin';
import { getSession, logout } from '@/lib/clientAuth';

const DashboardPage = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        published: true,
    });

    useEffect(() => {
        const checkSession = async () => {
            const sessionData = await getSession();
            if (!sessionData) {
                router.push('/en/login');
            } else {
                setSession(sessionData);
                fetchProducts();
            }
        };
        checkSession();
    }, [router]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/products/${isEditing}` : '/api/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to save product');
            }

            await fetchProducts();
            setShowForm(false);
            setIsEditing(null);
            resetFormData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleEdit = (product: ProductItem) => {
        setIsEditing(product._id!);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            imageUrl: product.imageUrl || '',
            published: product.published,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete product');
                await fetchProducts();
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    const resetFormData = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            imageUrl: '',
            published: true,
        });
    };

    const handleLogout = async () => {
        await logout();
        router.push('/en/login');
    };

    if (!session) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Product Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>

                {error && <div className="bg-red-500/20 text-red-300 p-4 rounded mb-4">{error}</div>}

                <div className="mb-8">
                    <button
                        onClick={() => { setShowForm(!showForm); setIsEditing(null); resetFormData(); }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {showForm && !isEditing ? 'Cancel' : 'Add New Product'}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-gray-800 p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="bg-gray-700 p-2 rounded" required />
                            <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="bg-gray-700 p-2 rounded" required />
                            <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" type="number" step="0.01" className="bg-gray-700 p-2 rounded" required />
                            <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Image URL" className="bg-gray-700 p-2 rounded" />
                        </div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="bg-gray-700 p-2 rounded w-full mt-4" required />
                        <div className="flex items-center mt-4">
                            <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleInputChange} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                            <label htmlFor="published" className="ml-2 block text-sm text-gray-300">Published</label>
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                            {isEditing ? 'Update Product' : 'Save Product'}
                        </button>
                    </form>
                )}

                {isLoading ? (
                    <div>Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
                                <div>
                                    <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-gray-400">{product.category}</p>
                                    <p className="text-lg font-semibold my-2">${product.price}</p>
                                    <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                                    <p className={`text-sm font-bold ${product.published ? 'text-green-400' : 'text-red-400'}`}>
                                        {product.published ? 'Published' : 'Unpublished'}
                                    </p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">Edit</button>
                                    <button onClick={() => handleDelete(product._id!)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
