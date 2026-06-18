<?php

namespace App\Http\Controllers;

use App\Models\Gig;
use App\Models\GigPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $gig = Gig::with(['packages', 'orders.client'])->findOrFail($id);

        if ($gig->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('GigDashboard', [
            'gig' => $gig
        ]);
    }

    public function show($id)
    {
        $gig = Gig::with(['freelancer', 'packages'])->findOrFail($id);

        return Inertia::render('GigDetail', [
            'gig' => $gig
        ]);
    }
}