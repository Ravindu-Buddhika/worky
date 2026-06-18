<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GigController;

Route::get('/', [GigController::class, 'index'])->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/gigs/{gig}', [GigController::class, 'show'])->name('gigs.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
    Route::get('/my-gigs', [GigController::class, 'myGigs'])->name('gigs.my');
    Route::get('/gigs/create', [GigController::class, 'create'])->name('gigs.create');
    Route::post('/gigs', [GigController::class, 'store'])->name('gigs.store');
    Route::get('/gigs/{gig}/dashboard', [GigController::class, 'gigDashboard'])->name('gigs.dashboard');
    
    Route::post('/orders/{order}/accept', [GigController::class, 'acceptOrder'])->name('orders.accept');
    Route::post('/orders/{order}/reject', [GigController::class, 'rejectOrder'])->name('orders.reject');
    Route::post('/orders/{order}/complete', [GigController::class, 'completeOrder'])->name('orders.complete');

    Route::post('/gigs/{gig}/purchase', [GigController::class, 'purchasePackage'])->name('gigs.purchase');

    Route::get('/payment/success', [GigController::class, 'paymentSuccess'])->name('payment.success');

    Route::get('/payment/cancel', [GigController::class, 'paymentCancel'])->name('payment.cancel');
    Route::post('/orders/save-requirements', [GigController::class, 'saveRequirements'])->name('orders.save-requirements');
});

require __DIR__.'/auth.php';