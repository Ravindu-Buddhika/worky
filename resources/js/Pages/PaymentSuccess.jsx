import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function PaymentSuccess({ order_id }) {
    const { data, setData, post, processing } = useForm({
        order_id: order_id,
        requirements: '',
        contact_info: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/orders/save-requirements');
    };

    return (
        <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center p-6">
            <Head title="Submit Requirements" />
            <form onSubmit={submit} className="bg-[#1c1c1f] p-8 rounded-2xl border border-[#202024] w-full max-w-lg shadow-2xl">
                <h1 className="text-2xl font-bold mb-6 text-white">Payment Successful!</h1>
                <p className="text-gray-400 mb-6">Please provide your requirements to start the order.</p>
                
                <div className="space-y-4">
                    <textarea 
                        className="w-full bg-[#121214] border border-[#2d2d30] p-4 rounded-xl text-sm"
                        placeholder="Project Requirements..."
                        onChange={e => setData('requirements', e.target.value)}
                    />
                    <input 
                        type="text" 
                        className="w-full bg-[#121214] border border-[#2d2d30] p-4 rounded-xl text-sm"
                        placeholder="Your Contact Info (Email/WhatsApp)"
                        onChange={e => setData('contact_info', e.target.value)}
                    />
                    <button 
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all"
                    >
                        Submit Requirements
                    </button>
                </div>
            </form>
        </div>
    );
}