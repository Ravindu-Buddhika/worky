import { Link, Head } from '@inertiajs/react';

export default function MyGigs({ auth, gigs }) {
    return (
        <>
            <Head title="My Gigs - Worky" />

            <div className="min-h-screen bg-[#121214] text-white font-sans flex flex-col">
                
                {/* 🌐 TOP NAVBAR */}
                <nav className="border-b border-[#202024] bg-[#121214] px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold text-blue-500 tracking-tight">
                            Worky<span className="text-white">.</span>
                        </Link>
                        <span className="text-xs bg-[#202024] text-gray-400 px-2.5 py-1 rounded-md border border-[#323238]">
                            User Portal
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                        <Link href="/" className="text-gray-400 hover:text-white transition">Back to Marketplace</Link>
                        <div className="flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                                {auth.user.name.charAt(0)}
                            </div>
                            <span className="text-gray-300 font-medium">{auth.user.name}</span>
                        </div>
                    </div>
                </nav>

                {/* 🗄️ MAIN WRAPPER */}
                <div className="flex flex-1">
                    
                    {/* 🔲 SIDEBAR */}
                    <aside className="w-64 border-r border-[#202024] bg-[#141416] p-6 hidden md:flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
                            <nav className="space-y-1.5">
                                <Link href={route('dashboard')} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#1c1c1f] hover:text-white text-sm transition">
                                    <span>📊</span>
                                    <span>Dashboard</span>
                                </Link>
                                <Link href={route('gigs.my')} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm transition">
                                    <span>💼</span>
                                    <span>My Gigs</span>
                                </Link>
                                <Link href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#1c1c1f] hover:text-white text-sm transition">
                                    <span>💳</span>
                                    <span>Earnings & Wallet</span>
                                </Link>
                                <Link href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#1c1c1f] hover:text-white text-sm transition">
                                    <span>⚙️</span>
                                    <span>Settings</span>
                                </Link>
                            </nav>
                        </div>

                        <Link href={route('logout')} method="post" as="button" className="w-full text-left flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 text-sm font-medium transition">
                            <span>🚪</span>
                            <span>Logout</span>
                        </Link>
                    </aside>

                    {/* 🎯 MY GIGS CONTENT */}
                    <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
                        
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#202024] pb-6 mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Active Gigs & Services</h1>
                                <p className="text-sm text-gray-400 mt-0.5">Click on any service row to view its specific analytical dashboard, orders, and logs.</p>
                            </div>
                            <div>
                                <Link href={route('gigs.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition inline-flex items-center space-x-2">
                                    <span>➕</span>
                                    <span>Create New Gig</span>
                                </Link>
                            </div>
                        </div>

                        {/* 📊 GIGS TABLE / LIST */}
                        <div className="bg-[#1c1c1f] border border-[#202024] rounded-xl overflow-hidden">
                            {gigs && gigs.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="border-b border-[#202024] bg-[#16161a] text-gray-400 text-xs uppercase tracking-wider font-semibold">
                                                <th className="p-4">Gig Details</th>
                                                <th className="p-4">Category</th>
                                                <th className="p-4">Starting Price</th>
                                                <th className="p-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#202024]">
                                            {gigs.map((gig) => (
                                                <tr key={gig.id} className="hover:bg-[#202024]/40 transition group">
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-16 h-10 bg-[#28282e] rounded-md overflow-hidden flex-shrink-0">
                                                                {gig.cover_image ? (
                                                                    <img src={gig.cover_image} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">No Image</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Link href={route('gigs.dashboard', gig.id)} className="font-medium text-gray-200 group-hover:text-blue-400 transition block max-w-md truncate">
                                                                    {gig.title}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-400">{gig.category}</td>
                                                    <td className="p-4 font-semibold text-gray-200">
                                                        ${gig.packages?.[0]?.price || '0'}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <Link href={route('gigs.dashboard', gig.id)} className="text-xs bg-[#202024] hover:bg-[#2a2a30] text-gray-300 border border-[#323238] px-3 py-1.5 rounded-md font-medium transition">
                                                            View Dashboard →
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <p className="text-sm">You haven't published any gigs yet.</p>
                                    <p className="text-xs mt-1 text-gray-600">Create your first gig to start receiving orders from worldwide clients.</p>
                                </div>
                            )}
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}