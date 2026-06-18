<?php

namespace App\Http\Controllers;

use App\Models\Gig;
use App\Models\GigPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Stripe;

class GigController extends Controller
{
    public function index()
{
    $gigs = Gig::with(['freelancer', 'packages'])->latest()->get();

    return Inertia::render('Welcome', [
        'gigs' => $gigs, 
    ]);
}

    public function myGigs()
    {
        $myGigs = Gig::where('user_id', Auth::id())->with('packages')->latest()->get();

        return Inertia::render('MyGigs', [
            'gigs' => $myGigs
        ]);
    }


    public function create()
    {
        return Inertia::render('CreateGig');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'packages' => 'required|array|min:3|max:3', 
            'packages.*.package_type' => 'required|string',
            'packages.*.package_name' => 'required|string',
            'packages.*.features' => 'required|string',
            'packages.*.price' => 'required|numeric',
            'packages.*.delivery_time' => 'required|integer',
        ]);

        $gig = Gig::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'cover_image' => $request->cover_image ?? null,
        ]);

        foreach ($request->packages as $pkg) {
            GigPackage::create([
                'gig_id' => $gig->id,
                'package_type' => $pkg['package_type'],
                'package_name' => $pkg['package_name'],
                'features' => $pkg['features'],
                'price' => $pkg['price'],
                'delivery_time' => $pkg['delivery_time'],
            ]);
        }

        return redirect()->route('gigs.my');
    }

     public function gigDashboard($id)
    {
        $gig = Gig::with(['packages', 'orders.client', 'orders.package'])->findOrFail($id);

        if ($gig->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('GigDashboard', [
            'gig' => $gig
        ]);
    }

    public function acceptOrder($id)
    {
        $order = \App\Models\Order::findOrFail($id);
        
        if ($order->gig->user_id !== Auth::id()) {
            abort(403);
        }

        $order->update(['status' => 'active']);
        return back()->with('success', 'Order accepted! Time to build.');
    }

    public function rejectOrder($id)
    {
        $order = \App\Models\Order::findOrFail($id);
        
        if ($order->gig->user_id !== Auth::id()) {
            abort(403);
        }

        $order->update(['status' => 'cancelled']);
        return back()->with('success', 'Order declined successfully.');
    }

    public function completeOrder($id)
    {
        $order = \App\Models\Order::findOrFail($id);
        
        if ($order->gig->user_id !== Auth::id()) {
            abort(403);
        }

        $order->update(['status' => 'completed']);
        return back()->with('success', 'Awesome job! Order marked as completed.');
    }

    public function show($id)
    {
        $gig = Gig::with(['freelancer', 'packages'])->findOrFail($id);

        return Inertia::render('GigDetail', [
            'gig' => $gig
        ]);
    }

    public function purchasePackage(Request $request, Gig $gig)
    {
        $package = $gig->packages()->findOrFail($request->package_id);

        $order = \App\Models\Order::create([
            'client_id' => Auth::id(),
            'gig_id' => $gig->id,
            'gig_package_id' => $package->id,
            'amount' => $package->price,
            'status' => 'pending',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => ['name' => $gig->title . ' (' . $package->package_name . ')'],
                    'unit_amount' => $package->price * 100,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('payment.success') . '?order_id=' . $order->id,
            'cancel_url' => route('payment.cancel'),
        ]);

        return Inertia::location($session->url);
    }

    public function paymentSuccess(Request $request)
    {
        return Inertia::render('PaymentSuccess', [
            'order_id' => $request->order_id
        ]);
    }

    public function paymentCancel()
    {
        return Inertia::render('PaymentCancel', [
            'message' => 'Payment was cancelled.'
        ]);
    }

    public function saveRequirements(Request $request)
    {
        $request->validate(['requirements' => 'required', 'contact_info' => 'required']);
        
        $order = \App\Models\Order::findOrFail($request->order_id);
        $order->update([
            'requirements' => $request->requirements,
            'contact_info' => $request->contact_info,
            'status' => 'active'
        ]);

        return redirect()->route('dashboard')->with('success', 'Order is now active!');
    }
}