<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Users that have this position (global/primary position)
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Members in prokers with this position
     */
    public function prokerAnggota(): HasMany
    {
        return $this->hasMany(ProkerAnggota::class, 'position_id');
    }
}
