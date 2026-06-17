import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateGig() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Development',
        description: '',
        cover_image: '',
        packages: [
            { package_type: 'basic', package_name: '', features: '', price: '', delivery_time: '' },
            { package_type: 'standard', package_name: '', features: '', price: '', delivery_time: '' },
            { package_type: 'premium', package_name: '', features: '', price: '', delivery_time: '' }
        ]
    });

    const [activeTab, setActiveTab] = useState(0);

    const handlePackageChange = (index, field, value) => {
        const updatedPackages = [...data.packages];
        updatedPackages[index][field] = value;
        setData('packages', updatedPackages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('gigs.store'));
    };

    return (
        <>
            <Head title="Create New Gig - Worky" />

            <div className="min-h-screen bg-[#121214] text-white font-sans py-10 px-6">
                <div className="max-w-3xl mx-auto">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#202024] pb-6 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Create a New Service Gig</h1>
                            <p className="text-xs text-gray-400 mt-1">Setup your core service specifications and the three pricing tiers.</p>
                        </div>
                        <Link href={route('dashboard')} className="text-xs text-gray-400 hover:text-white transition">
                            Cancel & Return
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* 1. GIG GENERAL INFO */}
                        <div className="bg-[#1c1c1f] border border-[#202024] rounded-xl p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider">1. General Information</h3>
                            
                            {/* Gig Title */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">Gig Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., I will build a conversion-optimized SaaS landing page" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                />
                                {errors.title && <span className="text-xs text-red-500 mt-1 block">{errors.title}</span>}
                            </div>

                            {/* Category & Cover Image */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                                    <select 
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                    >
                                        <option value="Development">Development</option>
                                        <option value="Video & Animation">Video & Animation</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Audio Production">Audio Production</option>
                                        <option value="AI Services">AI Services</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Mock Cover Image URL (Temporary)</label>
                                    <input 
                                        type="text" 
                                        placeholder="https://images.unsplash.com/photo-..." 
                                        value={data.cover_image}
                                        onChange={e => setData('cover_image', e.target.value)}
                                        className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                    />
                                    {errors.cover_image && <span className="text-xs text-red-500 mt-1 block">{errors.cover_image}</span>}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                                <textarea 
                                    rows="5"
                                    placeholder="Describe your service in detail so clients know exactly what they are paying for..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition resize-none"
                                ></textarea>
                                {errors.description && <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>}
                            </div>
                        </div>

                        {/* 2. THREE SERVICE PACKAGES TIERS */}
                        <div className="bg-[#1c1c1f] border border-[#202024] rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">2. Pricing Packages (Tiers)</h3>

                            {/* Tab Switcher */}
                            <div className="flex border-b border-[#202024] mb-6">
                                {['Basic', 'Standard', 'Premium'].map((tabName, idx) => (
                                    <button
                                        type="button"
                                        key={tabName}
                                        onClick={() => setActiveTab(idx)}
                                        className={`flex-1 text-center py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${activeTab === idx ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {tabName}
                                    </button>
                                ))}
                            </div>

                            {/* Active Tab Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Package Name</label>
                                    <input 
                                        type="text" 
                                        placeholder={`e.g., Simple Tier - 1 Page Landing`} 
                                        value={data.packages[activeTab].package_name}
                                        onChange={e => handlePackageChange(activeTab, 'package_name', e.target.value)}
                                        className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Price ($)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g., 50" 
                                            value={data.packages[activeTab].price}
                                            onChange={e => handlePackageChange(activeTab, 'price', e.target.value)}
                                            className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Delivery Time (Days)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g., 3" 
                                            value={data.packages[activeTab].delivery_time}
                                            onChange={e => handlePackageChange(activeTab, 'delivery_time', e.target.value)}
                                            className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Features Included (Comma separated)</label>
                                    <textarea 
                                        rows="3"
                                        placeholder="e.g., 3 Design Concepts, Source Files, Responsive Layout, Custom Icons"
                                        value={data.packages[activeTab].features}
                                        onChange={e => handlePackageChange(activeTab, 'features', e.target.value)}
                                        className="w-full bg-[#121214] border border-[#323238] rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* ⚠️ GLOBAL VALIDATION ERRORS BANNER */}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-sm text-red-400 space-y-2">
                                <p className="font-semibold text-red-500 flex items-center space-x-2">
                                    <span>⚠️</span>
                                    <span>Correct the errors in the data below:</span>
                                </p>
                                <ul className="list-disc list-inside space-y-1 opacity-90 pl-2">
                                    {Object.keys(errors).map((key) => {
                                        let fieldName = key;
                                        if (key.startsWith('packages.')) {
                                            const parts = key.split('.');
                                            const packageIndex = parseInt(parts[1]) + 1; // Basic = 1, Standard = 2, Premium = 3
                                            const packageNameMap = { 1: 'Basic', 2: 'Standard', 3: 'Premium' };
                                            const packageType = packageNameMap[packageIndex] || 'Unknown';
                                            const field = parts[2].replace('_', ' ');
                                            fieldName = `${packageType} Package - ${field.charAt(0).toUpperCase() + field.slice(1)}`;
                                        }
                                        return (
                                            <li key={key}>
                                                <strong className="text-red-300">{fieldName}</strong>: {errors[key]}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition inline-flex items-center space-x-2"
                            >
                                {processing ? 'Publishing Gig...' : '🚀 Publish & Go Live'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}