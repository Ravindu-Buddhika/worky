import React, { useState } from 'react';

// We dynamically resolve Inertia components to prevent compile-time failures in the preview box
// while maintaining full single-page application functionality in your Laravel app!
let Link = ({ href, children, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
};

let Head = ({ title, children }) => {
    if (typeof document !== 'undefined' && title) {
        document.title = title;
    }
    return <>{children}</>;
};

try {
    // Attempt runtime resolution of Inertia components
    const InertiaReact = require('@inertiajs/react');
    Link = InertiaReact.Link;
    Head = InertiaReact.Head;
} catch (e) {
    // Fallback to beautiful HTML elements in sandbox preview environments
}

export default function GigDetail({ auth, gig }) {
    const [activeTab, setActiveTab] = useState(0); 

    // Extract active package (Basic, Standard, Premium)
    const currentPackage = gig?.packages && gig.packages[activeTab] ? gig.packages[activeTab] : null;

    return (
        <div className="min-h-screen bg-[#121214] text-white font-sans selection:bg-blue-500 selection:text-white antialiased">
            <Head title={gig?.title ? `${gig.title} - Worky` : 'Gig Details'} />

            {}
            <nav className="border-b border-[#202024] bg-[#121214]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-2xl font-bold text-[#3b82f6] tracking-tight hover:opacity-90 transition">
                        Worky<span className="text-white">.</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition">Find Work</Link>
                    {auth?.user && (
                        <Link href="/dashboard" className="bg-[#1c1c1f] hover:bg-[#252529] text-white px-4 py-2 rounded-lg text-xs font-semibold transition border border-[#2d2d30]">
                            Dashboard
                        </Link>
                    )}
                </div>
            </nav>

            {}
            <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Left Side: Detail Portfolio, Title, and Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Breadcrumbs */}
                    <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                        <span>&gt;</span>
                        <span className="text-blue-400 uppercase tracking-wider font-semibold">{gig?.category || 'Development'}</span>
                    </div>

                    {/* Gig Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-100 leading-tight">
                        {gig?.title || 'Gig Title Placeholder'}
                    </h1>

                    {/* Freelancer Profile Short Info */}
                    <div className="flex items-center space-x-4 pb-6 border-b border-[#202024]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white uppercase shadow-lg shadow-blue-500/10">
                            {gig?.freelancer?.name ? gig.freelancer.name.charAt(0) : 'U'}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-200">{gig?.freelancer?.name || 'Professional Creator'}</p>
                            <p className="text-xs text-gray-500">Top Rated Seller</p>
                        </div>
                        <span className="text-[#2d2d30] h-6 w-[1px] bg-[#2d2d30]" />
                        <div className="flex items-center text-xs text-amber-500 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full">
                            ⭐ 4.9 <span className="text-gray-400 ml-1">(124 reviews)</span>
                        </div>
                    </div>

                    {}
                    {/* Top Main Cover with 3 stylish empty grid slots below */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Main Cover Image (User upload loaded here) */}
                        <div className="col-span-2 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#1c1c1f] border border-[#202024] relative group shadow-2xl">
                            {gig?.cover_image ? (
                                <img src={gig.cover_image} alt={gig?.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gradient-to-br from-[#1c1c1f] to-[#121214]">
                                    <span className="text-6xl mb-3">💻</span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#3b82f6]">No Portfolio Image Uploaded</span>
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-[#121214]/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-[#202024]">
                                Primary Artwork
                            </div>
                        </div>

                        {/* Secondary Placeholder 1 */}
                        <div className="aspect-[16/10] bg-[#16161a] border border-[#202024] border-dashed rounded-xl flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 hover:border-blue-500/30 transition cursor-pointer group">
                            <span className="text-xl mb-1 group-hover:scale-110 transition">📸</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider">Empty Slot</span>
                        </div>

                        {/* Secondary Placeholder 2 */}
                        <div className="aspect-[16/10] bg-[#16161a] border border-[#202024] border-dashed rounded-xl flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 hover:border-blue-500/30 transition cursor-pointer group">
                            <span className="text-xl mb-1 group-hover:scale-110 transition">🎨</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider">Empty Slot</span>
                        </div>
                    </div>

                    {/* About This Gig Description */}
                    <div className="pt-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-100 flex items-center space-x-2">
                            <span>About This Gig</span>
                        </h2>
                        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-[#1c1c1f] border border-[#202024] p-8 rounded-2xl shadow-sm">
                            {gig?.description || 'No description provided for this service.'}
                        </div>
                    </div>
                </div>

                {}
                {/* Right Side: Packages & Pricing (Sticky Sidebar matching standard specs) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-[#1c1c1f] border border-[#202024] rounded-2xl overflow-hidden shadow-2xl">
                        
                        {/* Tab Headers */}
                        <div className="flex border-b border-[#202024] bg-[#16161a]">
                            {['Basic', 'Standard', 'Premium'].map((tabName, index) => (
                                <button
                                    key={tabName}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                                        activeTab === index 
                                            ? 'text-[#3b82f6] border-b-2 border-[#3b82f6] bg-[#1c1c1f]' 
                                            : 'text-gray-500 hover:text-gray-300 bg-[#16161a]'
                                    }`}
                                >
                                    {tabName}
                                </button>
                            ))}
                        </div>

                        {/* Package Details Area */}
                        {currentPackage ? (
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-md text-gray-100 tracking-tight">{currentPackage.package_name}</h3>
                                    <span className="text-3xl font-black text-[#3b82f6]">${currentPackage.price}</span>
                                </div>

                                {/* Package Features List */}
                                <div className="space-y-3 text-xs text-gray-300">
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-4">Included Features</p>
                                    {currentPackage.features ? (
                                        currentPackage.features.split(',').map((feature, idx) => (
                                            <div key={idx} className="flex items-start space-x-2.5">
                                                <span className="text-[#3b82f6] text-sm mt-0.5">✓</span>
                                                <span className="leading-normal">{feature.trim()}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center space-x-2.5">
                                            <span className="text-[#3b82f6] text-sm">✓</span>
                                            <span>Full Service Implementation</span>
                                        </div>
                                    )}
                                </div>

                                {/* Delivery & Revisions info */}
                                <div className="flex items-center space-x-6 text-xs text-gray-400 border-t border-[#202024] pt-5">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">⏱</span>
                                        <span>{currentPackage.delivery_time} Days Delivery</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">🔄</span>
                                        <span>3 Revisions</span>
                                    </div>
                                </div>

                                {/* Action Actions */}
                                <div className="space-y-3 pt-2">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center space-x-2">
                                        <span>Order Now</span>
                                        <span>&rarr;</span>
                                    </button>
                                    <button className="w-full bg-[#16161a]/80 hover:bg-[#202024] text-gray-400 hover:text-white border border-[#2d2d30] font-semibold py-3 rounded-xl text-xs transition-all">
                                        Contact {gig?.freelancer?.name || 'Seller'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500 text-sm">
                                <p className="mb-2">⚠️</p>
                                No package parameters defined for this tier.
                            </div>
                        )}
                    </div>

                    {/* Guarantees Box */}
                    <div className="mt-6 grid grid-cols-3 gap-2 text-center text-gray-500 text-[10px] tracking-wider uppercase font-bold">
                        <div className="bg-[#1c1c1f]/40 p-3 rounded-xl border border-[#202024]/50 flex flex-col items-center">
                            <span className="text-lg mb-1">🛡️</span>
                            <span>Secure Payment</span>
                        </div>
                        <div className="bg-[#1c1c1f]/40 p-3 rounded-xl border border-[#202024]/50 flex flex-col items-center">
                            <span className="text-lg mb-1">⭐</span>
                            <span>Quality Guarantee</span>
                        </div>
                        <div className="bg-[#1c1c1f]/40 p-3 rounded-xl border border-[#202024]/50 flex flex-col items-center">
                            <span className="text-lg mb-1">💬</span>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}