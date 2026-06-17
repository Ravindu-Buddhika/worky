<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GigPackage extends Model
{
    protected $fillable = ['gig_id', 'package_type', 'package_name', 'features', 'price', 'delivery_time'];


    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
