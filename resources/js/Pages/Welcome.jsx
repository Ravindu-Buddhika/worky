import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, gigs }) {
    return (
        <>
            <Head title="Worky - Freelancer Marketplace" />
            
            {/* මුළු පිටුවේම Background එක (Stitch UI එක වගේ Dark / Clean ලුක් එකක්) */}
            <div className="min-h-screen bg-[#121214] text-white font-sans selection:bg-blue-500 selection:text-white">
                
                {/* 🌐 NAVBAR (ඔයාගේ ස්ක්‍රීන්ෂොට් එකේ තිබුණු එකමයි) */}
                <nav className="border-b border-[#202024] bg-[#121214] sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-blue-500 tracking-tight">
                            Worky<span className="text-white">.</span>
                        </Link>
                        
                        {/* Search Bar */}
                        <div className="relative hidden md:block">
                            <input 
                                type="text" 
                                placeholder="Find high-quality services..." 
                                className="w-80 bg-[#202024] border border-[#323238] rounded-lg px-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                            />
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
                        <Link href="/" className="hover:text-white transition text-blue-500">Find Work</Link>
                        <Link href="#" className="hover:text-white transition">My Jobs</Link>
                        <Link href="#" className="hover:text-white transition">Messages</Link>
                        <Link href="#" className="hover:text-white transition">Finance</Link>
                        
                        {/* Auth චෙක් එක - ලොග් වෙලා නම් Dashboard එක, නැත්නම් Login/Register */}
                        {auth.user ? (
                            <Link 
                                href={route('dashboard')} 
                                className="bg-[#202024] hover:bg-[#28282e] text-white px-4 py-2 rounded-lg text-xs font-semibold transition border border-[#323238]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link href={route('login')} className="hover:text-white transition">Log in</Link>
                                <Link 
                                    href={route('register')} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* 🗂️ CATEGORIES BAR */}
                <div className="border-b border-[#202024] px-6 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-6 text-xs font-medium text-gray-400 bg-[#16161a]">
                    <span className="text-blue-500 cursor-pointer">All Categories</span>
                    <span className="hover:text-white cursor-pointer transition">Video & Animation</span>
                    <span className="hover:text-white cursor-pointer transition">Photography</span>
                    <span className="hover:text-white cursor-pointer transition">Audio Production</span>
                    <span className="hover:text-white cursor-pointer transition">Business Strategy</span>
                    <span className="hover:text-white cursor-pointer transition">AI Services</span>
                    <span className="hover:text-white cursor-pointer transition">Development</span>
                </div>

                {/* 🎯 MAIN CONTENT (FEED) */}
                <main className="max-w-7xl mx-auto px-6 py-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Gigs you might like</h1>
                        <p className="text-sm text-gray-400 mt-1">Hand-picked services from top-rated professionals based on your profile.</p>
                    </div>

                    {/* 🃏 GIGS GRID (ඩේටාබේස් එකෙන් එන දත්ත මෙතනින් ලිස්ට් වෙනවා) */}
                    {gigs && gigs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {gigs.map((gig) => (
                                <Link 
                                    key={gig.id} 
                                    href={route('gigs.show', gig.id)} 
                                    className="group bg-[#1c1c1f] border border-[#202024] rounded-xl overflow-hidden hover:border-[#323238] transition duration-200 flex flex-col"
                                >
                                    {/* Gig Cover Image */}
                                    <div className="aspect-video w-full bg-[#28282e] overflow-hidden relative">
                                        {gig.cover_image ? (
                                            <img src={gig.cover_image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Cover Image</div>
                                        )}
                                        <span className="absolute top-3 right-3 bg-[#121214]/80 text-xs px-2 py-0.5 rounded text-gray-300 backdrop-blur-sm">favorite</span>
                                    </div>

                                    {/* Card Details */}
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div>
                                            {/* Freelancer Info */}
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                                                    {gig.freelancer?.name?.charAt(0)}
                                                </div>
                                                <span className="text-xs font-medium text-gray-300">{gig.freelancer?.name}</span>
                                                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">Top Rated</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-blue-400 transition duration-150">
                                                {gig.title}
                                            </h3>
                                        </div>

                                        {/* Pricing & Rating */}
                                        <div className="border-t border-[#202024] mt-4 pt-3 flex items-center justify-between text-xs">
                                            <div className="flex items-center space-x-1 text-amber-400">
                                                <span>★</span>
                                                <span className="text-gray-300 font-semibold">5.0</span>
                                                <span className="text-gray-500">(1.2k)</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Starting At</span>
                                                <span className="text-sm font-bold text-white">
                                                    ${gig.packages?.[0]?.price || '0'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // 📭 දැනට ඩේටාබේස් එක හිස් නම් පෙන්වන පණිවිඩය
                        <div className="border border-dashed border-[#323238] rounded-2xl p-12 text-center text-gray-500">
                            <p className="text-sm">No gigs available at the moment.</p>
                            <p className="text-xs mt-1 text-gray-600">Once you create a gig inside your dashboard, it will appear here!</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}