import React, { useState } from 'react';

// Handle Inertia import safely for preview rendering and real App compilation
let Link = ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>;
let Head = ({ title }) => { if (typeof document !== 'undefined') document.title = title; return null; };
let router = { post: (url) => console.log('Simulating status update to', url) };

try {
    const InertiaReact = require('@inertiajs/react');
    Link = InertiaReact.Link;
    Head = InertiaReact.Head;
    router = InertiaReact.router;
} catch (e) {}

export default function GigDashboard({ gig }) {
    const [activeTab, setActiveTab] = useState('all');

    const orders = gig.orders || [];

    // Calculate interactive real-time order statistics
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const activeOrders = orders.filter(o => o.status === 'active');
    const completedOrders = orders.filter(o => o.status === 'completed');
    const cancelledOrders = orders.filter(o => o.status === 'cancelled');

    // Total earnings from successfully completed orders using 'amount' attribute
    const totalEarnings = completedOrders.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return true;
        return order.status === activeTab;
    });

    const handleAccept = (orderId) => {
        router.post(route('orders.accept', orderId), {}, { preserveScroll: true });
    };

    const handleReject = (orderId) => {
        router.post(route('orders.reject', orderId), {}, { preserveScroll: true });
    };

    const handleComplete = (orderId) => {
        router.post(route('orders.complete', orderId), {}, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-[#121214] text-white font-sans selection:bg-blue-500 selection:text-white">
            <Head title={`Workspace - ${gig.title}`} />

            {/* Top Workspace Header */}
            <nav className="border-b border-[#202024] bg-[#121214]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href={route('gigs.my')} className="text-xs text-gray-400 hover:text-white transition">&larr; Back to My Gigs</Link>
                    <span className="text-gray-700">/</span>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{gig.category}</span>
                </div>
                <div className="text-xs font-black tracking-wider uppercase">
                    Order Manager<span className="text-blue-500">.</span>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                
                {/* Gig Title Mini Display */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202024] pb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-extrabold text-gray-100 tracking-tight">{gig.title}</h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Service Workspace Dashboard</p>
                    </div>
                    <Link href={route('gigs.show', gig.id)} className="bg-[#1c1c1f] hover:bg-[#252529] text-[11px] font-bold text-gray-300 border border-[#2d2d30] px-4 py-2 rounded-lg transition text-center">
                        👁 View Public Page
                    </Link>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* Stat Card 1 */}
                    <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Total Revenue</p>
                            <h3 className="text-xl font-black text-[#3b82f6] mt-1">${totalEarnings.toFixed(2)}</h3>
                        </div>
                        <div className="text-xl p-2 rounded-lg bg-blue-500/10">💰</div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Pending Requests</p>
                            <h3 className="text-xl font-black text-amber-500 mt-1">{pendingOrders.length}</h3>
                        </div>
                        <div className="text-xl p-2 rounded-lg bg-amber-500/10">🔔</div>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Ongoing Tasks</p>
                            <h3 className="text-xl font-black text-indigo-400 mt-1">{activeOrders.length}</h3>
                        </div>
                        <div className="text-xl p-2 rounded-lg bg-indigo-500/10">⚡</div>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-[#1c1c1f] border border-[#202024] p-5 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Delivered Gigs</p>
                            <h3 className="text-xl font-black text-emerald-500 mt-1">{completedOrders.length}</h3>
                        </div>
                        <div className="text-xl p-2 rounded-lg bg-emerald-500/10">🏆</div>
                    </div>

                </div>

                {}
                <div className="space-y-6">
                    <div className="flex border-b border-[#202024] space-x-6 text-[10px] uppercase tracking-wider font-bold pb-px overflow-x-auto scrollbar-none">
                        {[
                            { id: 'all', name: 'All Orders', count: orders.length },
                            { id: 'pending', name: 'Awaiting Actions', count: pendingOrders.length },
                            { id: 'active', name: 'In Progress (Ongoing)', count: activeOrders.length },
                            { id: 'completed', name: 'Completed', count: completedOrders.length },
                            { id: 'cancelled', name: 'Declined', count: cancelledOrders.length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 border-b-2 transition shrink-0 ${
                                    activeTab === tab.id 
                                        ? 'border-blue-500 text-blue-400' 
                                        : 'border-transparent text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                <span>{tab.name}</span>
                                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#1c1c1f] text-[8px] font-bold text-gray-400 border border-[#2d2d30]">{tab.count}</span>
                            </button>
                        ))}
                    </div>

                    {}
                    {filteredOrders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="bg-[#1c1c1f] border border-[#202024] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#323238] transition">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs">
                                            {order.client?.name ? order.client.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-bold text-gray-200 text-sm">{order.client?.name || 'Customer'}</h4>
                                                <span className="text-[10px] text-gray-600">•</span>
                                                <span className="text-xs text-blue-400 font-semibold">{order.package?.package_name || 'Service Package'}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-1">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                                            
                                            {/* Order Status Badge */}
                                            <div className="mt-3">
                                                {order.status === 'pending' && <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Awaiting Approval</span>}
                                                {order.status === 'active' && <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Ongoing Work</span>}
                                                {order.status === 'completed' && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Delivered</span>}
                                                {order.status === 'cancelled' && <span className="text-[9px] bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Declined</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons & Package Budget */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#202024] pt-4 md:pt-0">
                                        <div className="text-right">
                                            <p className="text-[8px] text-gray-500 uppercase tracking-widest font-black">Budget</p>
                                            <span className="text-base font-black text-[#3b82f6]">${parseFloat(order.amount || 0).toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {order.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleAccept(order.id)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(order.id)}
                                                        className="bg-[#121214] border border-red-500/30 hover:border-red-500/50 text-red-400 text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}

                                            {order.status === 'active' && (
                                                <button 
                                                    onClick={() => handleComplete(order.id)}
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition flex items-center space-x-1"
                                                >
                                                    <span>Deliver Work</span>
                                                    <span>&rarr;</span>
                                                </button>
                                            )}

                                            {(order.status === 'completed' || order.status === 'cancelled') && (
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Archived</span>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-[#202024] bg-[#16161a]/30 p-12 rounded-xl text-center text-gray-500 text-xs">
                            No orders found under this workspace category.
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}