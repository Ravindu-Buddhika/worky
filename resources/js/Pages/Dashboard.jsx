import { Link, Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="User Dashboard - Worky" />

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

                {/* 🗄️ MAIN CONTENT WRAPPER (SIDEBAR + CONTENT) */}
                <div className="flex flex-1">
                    
                    {/* 🔲 SIDEBAR (ඔයාගේ ස්ක්‍රීන්ෂොට් එකේ තිබුණු විදිහටම) */}
                    <aside className="w-64 border-r border-[#202024] bg-[#141416] p-6 hidden md:flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
                            <nav className="space-y-1.5">
                                <Link href={route('dashboard')} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm transition">
                                    <span>📊</span>
                                    <span>Dashboard</span>
                                </Link>
                                <Link href={route('gigs.my')} className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#1c1c1f] hover:text-white text-sm transition">
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

                        {/* Logout Button */}
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button" 
                            className="w-full text-left flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 text-sm font-medium transition"
                        >
                            <span>🚪</span>
                            <span>Logout</span>
                        </Link>
                    </aside>

                    {/* 🎯 RIGHT SIDE MAIN DASHBOARD CONTENT */}
                    <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
                        
                        {/* Welcome Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#202024] pb-6 mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Welcome back, {auth.user.name}!</h1>
                                <p className="text-sm text-gray-400 mt-0.5">Manage your service offerings, tracking metrics, and custom buyer orders.</p>
                            </div>
                            
                            {/* ➕ CREATE NEW GIG BUTTON */}
                            <div>
                                <Link 
                                    href={route('gigs.create')} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-600/10 inline-flex items-center space-x-2"
                                >
                                    <span>➕</span>
                                    <span>Create New Gig</span>
                                </Link>
                            </div>
                        </div>

                        {/* 📈 ANALYTICS STATS CARDS (Stitch UI එකේ තිබුණු Widgets) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl">
                                <span className="text-xs text-gray-500 block uppercase tracking-wider font-medium">Total Wallet Balance</span>
                                <span className="text-2xl font-bold mt-2 block">${auth.user.wallet_balance || '0.00'}</span>
                                <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">✓ Fully Verified</span>
                            </div>

                            <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl">
                                <span className="text-xs text-gray-500 block uppercase tracking-wider font-medium">Active Buying Orders</span>
                                <span className="text-2xl font-bold mt-2 block">0</span>
                                <span className="text-[11px] text-gray-500 font-medium mt-1 inline-block">As a Service Client</span>
                            </div>

                            <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl">
                                <span className="text-xs text-gray-500 block uppercase tracking-wider font-medium">My Active Gigs</span>
                                <span className="text-2xl font-bold mt-2 block">0</span>
                                <span className="text-[11px] text-blue-400 font-medium mt-1 inline-block">Live on Marketplace</span>
                            </div>
                        </div>

                        {/* 🔔 QUICK GUIDE SECTION */}
                        <div className="bg-[#16161a] border border-[#202024] rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-gray-200">Getting Started with Worky</h3>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                Ready to offer your freelance services? Click on the <strong className="text-blue-400">"Create New Gig"</strong> button above to configure your service details along with the 3 distinct packages (Basic, Standard, Premium). Once created, they will automatically sync and go live on our global public marketplace feed.
                            </p>
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}