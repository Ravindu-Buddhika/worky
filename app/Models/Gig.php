<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gig extends Model
{
    protected $fillable = ['user_id', 'title', 'description', 'category', 'cover_image'];


    public function freelancer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function packages()
    {
        return $this->hasMany(GigPackage::class);
    }
}
