import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function GigDetail({ auth, gig }) {
    const [activeTab, setActiveTab] = useState(0); 
    const currentPackage = gig?.packages && gig.packages[activeTab] ? gig.packages[activeTab] : null;

    const featuresList = currentPackage?.features 
        ? currentPackage.features.split(',').map(f => f.trim()) 
        : [];

    const handleOrder = () => {
    if (!auth?.user) {
        router.get('/login');
        return;
    }
    if (currentPackage) {

        router.post(route('gigs.purchase', gig.id), {
            package_id: currentPackage.id,
        });
    }
};

    return (
        <div className="min-h-screen bg-[#121214] text-white font-sans antialiased">
            <Head title={gig?.title || 'Gig Details'} />

            <nav className="border-b border-[#202024] bg-[#121214]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-[#3b82f6]">Worky<span className="text-white">.</span></Link>
                {auth?.user && (
                    <Link href="/dashboard" className="bg-[#1c1c1f] px-4 py-2 rounded-lg text-xs font-semibold border border-[#2d2d30]">
                        Dashboard
                    </Link>
                )}
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <h1 className="text-4xl font-extrabold text-gray-100">{gig?.title}</h1>
                    <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#1c1c1f] border border-[#202024]">
                        {gig?.cover_image ? (
                            <img src={gig.cover_image} className="w-full h-full object-cover" alt="Gig Cover" />
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">No Image</div>
                        )}
                    </div>
                    <div className="text-sm text-gray-300 bg-[#1c1c1f] p-8 rounded-2xl">
                        <h2 className="text-lg font-bold mb-4 text-white">About this gig</h2>
                        {gig?.description}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-[#1c1c1f] border border-[#202024] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex border-b border-[#202024] bg-[#16161a]">
                            {['Basic', 'Standard', 'Premium'].map((tabName, index) => (
                                <button
                                    key={tabName}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex-1 py-4 text-xs font-bold uppercase ${activeTab === index ? 'text-[#3b82f6] border-b-2 border-[#3b82f6]' : 'text-gray-500'}`}
                                >
                                    {tabName}
                                </button>
                            ))}
                        </div>

                        {currentPackage ? (
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-100">{currentPackage.package_name || 'Package'}</h3>
                                    <span className="text-3xl font-black text-[#3b82f6]">${currentPackage.price}</span>
                                </div>
                                
                                <ul className="text-sm text-gray-300 space-y-2">
                                    {featuresList.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="text-blue-500 mr-2">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-sm text-gray-400 border-t border-[#202024] pt-4">
                                    Delivery Time: <strong>{currentPackage.delivery_time} days</strong>
                                </div>

                                <button 
                                    onClick={handleOrder}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all"
                                >
                                    Order Now
                                </button>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">Select a package</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}