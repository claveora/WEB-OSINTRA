<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Division extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Get the users for the division.
     */
    public function users(): BelongsToMany
    {
        // Users are associated to divisions through proker_anggota.division_id
        return $this->belongsToMany(User::class, 'proker_anggota', 'division_id', 'user_id')->withTimestamps();
    }

    /**
     * Get the prokers for the division.
     */
    public function prokers(): BelongsToMany
    {
        return $this->belongsToMany(Proker::class, 'proker_division');
    }
}
