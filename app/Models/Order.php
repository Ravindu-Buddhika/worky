<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'client_id', 
        'gig_id',
        'gig_package_id',
        'amount', 
        'status',
        'requirements', 
        'contact_info'
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id'); 
    }

    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }

    public function package()
    {
        return $this->belongsTo(GigPackage::class, 'gig_package_id');
    }
}