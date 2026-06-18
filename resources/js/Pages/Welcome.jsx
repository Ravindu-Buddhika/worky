import React, { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';

// Local GigCard component declaration to ensure clean standalone compilation
function GigCard({ gig }) {
    const startPrice = gig.packages && gig.packages[0] ? gig.packages[0].price : '0';
    return (
        <Link 
            href={`/gigs/${gig.id}`}
            className="group bg-[#1c1c1f] border border-[#202024] rounded-xl overflow-hidden hover:border-[#323238] transition duration-200 flex flex-col h-full"
        >
            <div className="aspect-video w-full overflow-hidden relative bg-[#121214]">
                {gig.cover_image ? (
                    <img src={gig.cover_image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center">
                        <span className="text-2xl">💻</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                            {gig.freelancer?.name ? gig.freelancer.name.charAt(0) : 'F'}
                        </div>
                        <span className="text-xs text-gray-400 truncate">{gig.freelancer?.name || 'Freelancer'}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-200 line-clamp-2 leading-snug group-hover:text-blue-400 transition">{gig.title}</h3>
                </div>
                <div className="mt-4 pt-3 border-t border-[#202024] flex justify-between items-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Starting at</span>
                    <span className="text-sm font-bold text-white">${startPrice}</span>
                </div>
            </div>
        </Link>
    );
}

export default function Welcome({ auth, gigs }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <>
            <Head title="Worky - Freelancer Marketplace" />
            
            <div className="min-h-screen bg-[#121214] text-white font-sans selection:bg-blue-500 selection:text-white">
                
                {/* Navigational Bar */}
                <nav className="border-b border-[#202024] bg-[#121214] sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-2xl font-bold text-[#3b82f6] tracking-tight">
                            Worky<span className="text-white">.</span>
                        </Link>
                        
                        <div className="relative hidden md:block">
                            <input 
                                type="text" 
                                placeholder="Find high-quality services..." 
                                className="w-80 bg-[#1c1c1f] border border-[#2d2d30] rounded-lg px-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
                        <Link href="/" className="hover:text-white transition text-[#3b82f6]">Find Work</Link>
                        <Link href="#" className="hover:text-white transition">My Jobs</Link>
                        <Link href="#" className="hover:text-white transition">Messages</Link>
                        <Link href="#" className="hover:text-white transition">Finance</Link>
                        
                        {auth?.user ? (
                            /* Profile Avatar Dropdown Section (Hover over this) */
                            <div 
                                className="relative py-2"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <button className="flex items-center space-x-2 focus:outline-none">
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase border border-[#2d2d30] hover:bg-blue-700 transition duration-200">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="text-xs text-gray-300 font-medium hover:text-white transition duration-200">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-[10px] text-gray-500 transition duration-200">
                                        {isDropdownOpen ? '▲' : '▼'}
                                    </span>
                                </button>

                                {/* Dropdown Menu Content */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-44 bg-[#1c1c1f] border border-[#2d2d30] rounded-lg shadow-2xl py-1.5 z-50">
                                        <div className="px-4 py-2 border-b border-[#2d2d30] text-[10px] text-gray-500 font-semibold uppercase tracking-wider truncate">
                                            Account Actions
                                        </div>
                                        
                                        <Link 
                                            href="/dashboard" 
                                            className="block px-4 py-2 text-xs text-gray-200 hover:bg-[#252529] hover:text-[#3b82f6] transition duration-150 border-b border-[#2d2d30]/30"
                                        >
                                            💻 Dashboard
                                        </Link>
                                        
                                        <Link 
                                            href="/my-gigs" 
                                            className="block px-4 py-2 text-xs text-gray-200 hover:bg-[#252529] hover:text-[#3b82f6] transition duration-150 border-b border-[#2d2d30]/30"
                                        >
                                            💼 My Gigs
                                        </Link>
                                        
                                        {/* Imperative onClick handler එක සහිත ආරක්ෂිත Logout බටන් එක */}
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-xs text-red-400 hover:bg-[#252529] hover:text-red-300 transition duration-150"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-x-4 flex items-center">
                                <Link href="/login" className="hover:text-white text-gray-400 transition">Log in</Link>
                                <Link 
                                    href="/register" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Categories Bar */}
                <div className="border-b border-[#202024] px-6 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-6 text-xs font-medium text-gray-400 bg-[#16161a]">
                    <span className="text-[#3b82f6] cursor-pointer">All Categories</span>
                    <span className="hover:text-white cursor-pointer transition">Video & Animation</span>
                    <span className="hover:text-white cursor-pointer transition">Photography</span>
                    <span className="hover:text-white cursor-pointer transition">Audio Production</span>
                    <span className="hover:text-white cursor-pointer transition">Business Strategy</span>
                    <span className="hover:text-white cursor-pointer transition">AI Services</span>
                    <span className="hover:text-white cursor-pointer transition">Development</span>
                </div>

                {/* Main Content Area */}
                <main className="max-w-7xl mx-auto px-6 py-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Gigs you might like</h1>
                        <p className="text-sm text-gray-400 mt-1">Hand-picked services from top-rated professionals based on your profile.</p>
                    </div>

                    {gigs && gigs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {gigs.map((gig) => (
                                <GigCard key={gig.id} gig={gig} />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-[#202024] bg-[#16161a]/50 rounded-2xl p-16 text-center text-gray-500">
                            <p className="text-sm font-medium text-gray-300">No gigs available at the moment.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}